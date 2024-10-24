<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReleaseFundResource\Pages;
use App\Filament\Resources\ReleaseFundResource\RelationManagers;
use App\Models\ReleaseFund;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Actions\Action;

class ReleaseFundResource extends Resource
{
    protected static ?string $model = ReleaseFund::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Fund Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('budget_id')
                    ->relationship('budget', 'name')
                    ->required(),

                TextInput::make('requested_amount')
                    ->numeric()
                    ->prefix('₱')
                    ->required(),

                Textarea::make('reason')->nullable(),

                // Display associated disbursements
                Forms\Components\Repeater::make('disbursements')
                ->relationship('disbursements')
                ->schema([
                    TextInput::make('recipient_name')->disabled(),
                    TextInput::make('disbursed_amount')->numeric()->prefix('₱')->disabled(),
                    TextInput::make('status')->disabled()->label('Status')->default('pending'),
                ])
                ->disableItemCreation()
                ->columns(2),
                        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('budget.name')->label('Budget'),
                TextColumn::make('requested_amount')->money('PHP', true)->label('Requested Amount'),
                TextColumn::make('status')->label('Status')->sortable(),
                TextColumn::make('created_at')->label('Requested Date')->date(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),

                // Approve action
                Action::make('approve')
                    ->label('Approve')
                    ->action(function (ReleaseFund $record) {
                        $budget = $record->budget;

                        // Check if enough funds are available
                        if ($record->requested_amount + $budget->released_funds > $budget->total_amount) {
                            throw new \Exception('Not enough available funds to approve this request.');
                        }

                        // Approve all disbursements and update the budget
                        $disbursements = $record->disbursements()->where('status', 'pending')->get();  // Only update pending disbursements
                        foreach ($disbursements as $disbursement) {
                            $disbursement->status = 'approved';
                            $disbursement->save();
                        }

                        // Update the release fund status
                        $record->status = 'approved';
                        $record->save();

                        // Deduct the approved amount from the budget
                        $budget->released_funds += $record->requested_amount;
                        $budget->save();
                    }),

                // Disapprove action
                Action::make('disapprove')
                    ->label('Disapprove')
                    ->action(function (ReleaseFund $record, array $data) {
                        // Disapprove all pending disbursements
                        $disbursements = $record->disbursements()->where('status', 'pending')->get();
                        foreach ($disbursements as $disbursement) {
                            $disbursement->status = 'disapproved';
                            $disbursement->save();
                        }

                        // Update the release fund status
                        $record->status = 'disapproved';
                        $record->reason = $data['reason'];
                        $record->save();
                    })
                    ->form([
                        Textarea::make('reason')
                            ->required()
                            ->label('Reason for Disapproval'),
                    ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReleaseFunds::route('/'),
            'create' => Pages\CreateReleaseFund::route('/create'),
            'edit' => Pages\EditReleaseFund::route('/{record}/edit'),
        ];
    }
}