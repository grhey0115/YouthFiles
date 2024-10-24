<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <style>
        /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
        html { line-height: 1.15; -webkit-text-size-adjust: 100%; }
        body { margin: 0; }
        a { background-color: transparent; }
        code { font-family: monospace, monospace; font-size: 1em; }
        [hidden] { display: none; }
        html { font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; line-height: 1.5; }
        *, :after, :before { box-sizing: border-box; border: 0 solid #e2e8f0; }
        a { color: inherit; text-decoration: inherit; }
        code { font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace; }
        svg, video { display: block; vertical-align: middle; }
        video { max-width: 100%; height: auto; }
        .bg-white { --bg-opacity: 1; background-color: #fff; background-color: rgba(255, 255, 255, var(--bg-opacity)); }
        .bg-gray-100 { --bg-opacity: 1; background-color: #f7fafc; background-color: rgba(247, 250, 252, var(--bg-opacity)); }
        .border-gray-200 { --border-opacity: 1; border-color: #edf2f7; border-color: rgba(237, 242, 247, var(--border-opacity)); }
        .border-gray-400 { --border-opacity: 1; border-color: #cbd5e0; border-color: rgba(203, 213, 224, var(--border-opacity)); }
        .border-t { border-top-width: 1px; }
        .flex { display: flex; }
        .hidden { display: none; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .font-semibold { font-weight: 600; }
        .text-lg { font-size: 1.125rem; }
        .text-gray-500 { --text-opacity: 1; color: #a0aec0; color: rgba(160, 174, 192, var(--text-opacity)); }
        .text-gray-400 { --text-opacity: 1; color: #cbd5e0; color: rgba(203, 213, 224, var(--text-opacity)); }
        .tracking-wider { letter-spacing: .05em; }
        .max-w-xl { max-width: 36rem; }
        .min-h-screen { min-height: 100vh; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .relative { position: relative; }
        .bg-gray-900 { background-color: #1a202c; }
    </style>

    <style>
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
    </style>
</head>
<body class="antialiased">
    <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div class="flex items-center pt-8 sm:justify-start sm:pt-0">
                <div class="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                    @yield('code')
                </div>

                <div class="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                    @yield('message')
                </div>
            </div>
        </div>
    </div>
</body>
</html>