<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DigitalPaymentTransferResource\Pages;
use App\Models\DigitalPaymentTransfer;
use App\Models\Users;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Number;

class DigitalPaymentTransferResource extends Resource
{
    protected static ?string $model = DigitalPaymentTransfer::class;
    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Financial Services';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Transaction Details')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('user_id')
                        ->label('Beneficiary')
                        ->options(function () {
                            return Users::all()->mapWithKeys(function ($user) {
                                return [$user->id => $user->full_name];
                            });
                        })
                        ->searchable()
                        ->getSearchResultsUsing(function (string $search) {
                            return Users::query()
                                ->where(function ($query) use ($search) {
                                    $query->where('first_name', 'like', "%{$search}%")
                                          ->orWhere('last_name', 'like', "%{$search}%")
                                          ->orWhere('email', 'like', "%{$search}%")
                                          ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"]);
                                })
                                ->limit(50)
                                ->get()
                                ->mapWithKeys(function ($user) {
                                    return [$user->id => $user->full_name . ' (' . $user->email . ')'];
                                });
                        })
                        ->required(),

                        Forms\Components\Select::make('payment_type')
                            ->options([
                                'scholarship' => 'Scholarship Fund',
                                'livelihood' => 'Livelihood Grant',
                                'emergency_aid' => 'Emergency Financial Aid',
                                'project_funding' => 'Youth Project Funding',
                                'training_support' => 'Skills Training Support'
                            ])
                            ->required(),

                        Forms\Components\TextInput::make('amount')
                            ->numeric()
                            ->prefix('₱')
                            ->required()
                            ->rules(['min:0', 'max:100000']),

                        Forms\Components\Select::make('payment_method')
                            ->options([
                                'gcash' => 'GCash',
                                'bank_transfer' => 'Bank Transfer',
                                'palawan_express' => 'Palawan Express',
                                'cebuana' => 'Cebuana Lhuiller',
                                'direct_deposit' => 'Direct Bank Deposit'
                            ])
                            ->required(),

                        Forms\Components\TextInput::make('reference_number')
                            ->unique(ignorable: fn ($record) => $record)
                            ->required(),

                        Forms\Components\TextInput::make('recipient_account')
                            ->label('Recipient Account/Number')
                            ->required(),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'processing' => 'Processing',
                                'completed' => 'Completed',
                                'failed' => 'Failed',
                                'reversed' => 'Reversed'
                            ])
                            ->default('pending')
                            ->required(),

                        Forms\Components\DateTimePicker::make('transaction_date')
                            ->default(now())
                            ->required(),
                    ]),

                Forms\Components\Section::make('Additional Information')
                    ->schema([
                        Forms\Components\Textarea::make('purpose')
                            ->label('Transaction Purpose')
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('admin_notes')
                            ->label('Internal Notes')
                            ->columnSpanFull(),

                        Forms\Components\FileUpload::make('supporting_documents')
                            ->multiple()
                            ->acceptedFileTypes(['pdf', 'jpg', 'png'])
                            ->directory('payment_transfers')
                            ->columnSpanFull(),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Beneficiary')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('amount')
                    ->money('PHP')
                    ->color(fn ($state) => $state > 0 ? 'success' : 'danger')
                    ->sortable(),

                Tables\Columns\TextColumn::make('payment_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'scholarship' => 'info',
                        'livelihood' => 'success',
                        'emergency_aid' => 'warning',
                        'project_funding' => 'primary',
                        'training_support' => 'secondary'
                    }),

                Tables\Columns\TextColumn::make('payment_method')
                    ->icon(fn (string $state): string => match ($state) {
                        'gcash' => 'heroicon-s-device-phone-mobile',
                        'bank_transfer' => 'heroicon-s-building-library',
                        default => 'heroicon-s-currency-dollar'
                    })
                    ->color('primary'),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'processing',
                        'success' => 'completed',
                        'danger' => ['failed', 'reversed']
                    ]),

                Tables\Columns\TextColumn::make('transaction_date')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('payment_type')
                    ->options([
                        'scholarship' => 'Scholarship Fund',
                        'livelihood' => 'Livelihood Grant',
                        'emergency_aid' => 'Emergency Financial Aid',
                        'project_funding' => 'Youth Project Funding',
                        'training_support' => 'Skills Training Support'
                    ]),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                        'reversed' => 'Reversed'
                    ]),
                Tables\Filters\SelectFilter::make('payment_method')
                    ->options([
                        'gcash' => 'GCash',
                        'bank_transfer' => 'Bank Transfer',
                        'palawan_express' => 'Palawan Express',
                        'cebuana' => 'Cebuana Lhuiller',
                        'direct_deposit' => 'Direct Bank Deposit'
                    ])
            ])
            ->actions([
                // View Supporting Documents
                Tables\Actions\Action::make('viewDocs')
                    ->label('View Docs')
                    ->icon('heroicon-s-document-magnifying-glass')
                    ->modalHeading('Supporting Documents')
                    ->modalContent(function (DigitalPaymentTransfer $record) {
                        $files = $record->supporting_documents 
                            ? collect(json_decode($record->supporting_documents, true))
                            : collect();
                        
                        return view('filament.modals.payment-documents', compact('files'));
                    }),

                // Approve Transaction
                Tables\Actions\Action::make('approve')
                    ->action(function (DigitalPaymentTransfer $record) {
                        $record->update([
                            'status' => 'completed',
                            'admin_notes' => 'Transaction approved and processed.'
                        ]);

                        Notification::make()
                            ->success()
                            ->title('Transaction Approved')
                            ->body('Payment transfer has been completed.')
                            ->send();
                    })
                    ->visible(fn ($record) => $record->status === 'pending'),

                // Reject Transaction
                Tables\Actions\Action::make('reject')
                    ->color('danger')
                    ->action(function (DigitalPaymentTransfer $record, array $data) {
                        $record->update([
                            'status' => 'failed',
                            'admin_notes' => $data['reason'] ?? 'Transaction rejected'
                        ]);

                        Notification::make()
                            ->danger()
                            ->title('Transaction Rejected')
                            ->body('Payment transfer has been failed.')
                            ->send();
                    })
                    ->form([
                        Forms\Components\Textarea::make('reason')
                            ->label('Rejection Reason')
                            ->required()
                    ])
                    ->visible(fn ($record) => $record->status === 'pending'),

                // Generate Receipt
                Tables\Actions\Action::make('generate_receipt')
                    ->label('Generate Receipt')
                    ->icon('heroicon-o-receipt-refund')
                    ->action(function (DigitalPaymentTransfer $record) {
                        // Implement receipt generation logic
                        // Could be a PDF download or print view
                        return response()->download(
                            $this->generateReceiptPdf($record)
                        );
                    })
                    ->visible(fn ($record) => $record->status === 'completed'),

                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    // Bulk Status Update
                    Tables\Actions\BulkAction::make('bulk_status_update')
                        ->label('Update Status')
                        ->action(function ($records, $data) {
                            $records->each(function ($record) use ($data) {
                                $record->update([
                                    'status' => $data['status'],
                                    'admin_notes' => $data['notes'] ?? null
                                ]);
                            });

                            Notification::make()
                                ->success()
                                ->title('Bulk Status Update')
                                ->body('Selected transactions updated.')
                                ->send();
                        })
                        ->form([
                            Forms\Components\Select::make('status')
                                ->options([
                                    'pending' => 'Pending',
                                    'processing' => 'Processing',
                                    'completed' => 'Completed',
                                    'failed' => 'Failed',
                                    'reversed' => 'Reversed'
                                ])
                                ->required(),
                            Forms\Components\Textarea::make('notes')
                                ->label('Bulk Update Notes')
                        ])
                ]),
            ]);
    }

    // Additional helper method for receipt generation
    private function generateReceiptPdf(DigitalPaymentTransfer $record)
    {
        // Implement PDF generation logic
        // Use a library like TCPDF or FPDF
        // Return path to generated PDF
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDigitalPaymentTransfers::route('/'),
            'create' => Pages\CreateDigitalPaymentTransfer::route('/create'),
            'edit' => Pages\EditDigitalPaymentTransfer::route('/{record}/edit'),
        ];
    }
}