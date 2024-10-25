# ▶️ Filament Media Action

[![Latest Version on Packagist](https://img.shields.io/packagist/v/hugomyb/filament-media-action.svg?style=flat-square)](https://packagist.org/packages/hugomyb/filament-media-action)
[![Total Downloads](https://img.shields.io/packagist/dt/hugomyb/filament-media-action.svg?style=flat-square)](https://packagist.org/packages/hugomyb/filament-media-action)



Automatically display your media (video, audio, pdf, image, ...) with an action in Filament.
The package automatically detects the media extension to display the correct player.

## Examples

![example1](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example1.png)
![example2](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example2.png)
![example3](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example3.png)
![example4](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example4.png)
![example5](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example5.png)
![example6](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example6.png)
![example7](https://raw.githubusercontent.com/hugomyb/filament-media-action/main/docs/example7.png)

## Installation

You can install the package via composer:

```bash
composer require hugomyb/filament-media-action
```

Optionally, you can publish the view using

```bash
php artisan vendor:publish --tag="filament-media-action-views"
```

Optionally, you can publish the translations using

```bash
php artisan vendor:publish --tag="filament-media-action-translations"
```

## Usage

### Basic Usage

Like a classic Filament Action, you can use MediaAction anywhere (Forms, Tables, Infolists, Suffix and prefix, ...).

Simply provide the url of your media in the `->media()` method. The package will then automatically detect your media extension for display.
```php
MediaAction::make('tutorial')
    ->iconButton()
    ->icon('heroicon-o-video-camera')
    ->media('https://www.youtube.com/watch?v=rN9XI9KCz0c&list=PL6tf8fRbavl3jfL67gVOE9rF0jG5bNTMi')
```

### Available options

#### Autoplay

You can enable autoplay for video and audio by using the `->autoplay()` method.

```php
MediaAction::make('media-url')
    ->media(fn($record) => $record->url)
    ->autoplay()
```

You can also pass a closure in the method and access `$record` and `$mediaType` :

```php
MediaAction::make('media-url')
    ->media(fn($record) => $record->url)
    ->autoplay(fn($record, $mediaType) => $mediaType === 'video')
```

`$mediatype` can return "youtube", "audio", "video", "image" or "pdf".

#### Other options

You can customize the modal as you wish in the same way as a classic action (see https://filamentphp.com/docs/3.x/actions/modals).

If there is an existing record, you can access it by passing a closure to `->media()` method.

Example :
```php
MediaAction::make('media-url')
    ->modalHeading(fn($record) => $record->name)
    ->modalFooterActionsAlignment(Alignment::Center)
    ->media(fn($record) => $record->url)
    ->extraModalFooterActions([
        MediaAction::make('media-video2')
            ->media('https://www.youtube.com/watch?v=9GBXqWKzfIM&list=PL6tf8fRbavl3jfL67gVOE9rF0jG5bNTMi&index=3')
            ->extraModalFooterActions([
                MediaAction::make('media-video3')
                    ->media('https://www.youtube.com/watch?v=Bvb_vqzhRQs&list=PL6tf8fRbavl3jfL67gVOE9rF0jG5bNTMi&index=5')
            ]),

        Tables\Actions\Action::make('open-url')
            ->label('Open in browser')
            ->url(fn($record) => $record->url)
            ->openUrlInNewTab()
            ->icon('heroicon-o-globe-alt')
    ])
```

As shown in the example above, you can chain MediaActions together with `->extraModalFooterActions()` method.

## Customizing the modal view

You can customize the modal view by publishing the view using :

```bash
php artisan vendor:publish --tag="filament-media-action-views"
```

Then, in the view, you can access : 
- `$mediaType`: To retrieve the type of your media, which can be “youtube”, “audio”, “video”, “image” or “pdf”.
- `$media` : To retrieve the url of your media


## Supported media extensions

| Type      | Extensions           |
|-----------|----------------------|
| Video     | mp4, avi, mov, webm  |
| Audio     | mp3, wav, ogg, aac   |
| Documents | pdf                  |
| Image     | jpg, jpeg, png, gif, bmp, svg, webp |


## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Mayonobe Hugo](https://github.com/hugomyb)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
