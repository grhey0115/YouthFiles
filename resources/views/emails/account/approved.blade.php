@component('mail::message')
# Account Approved

Dear {{ $user->first_name }},

Your account has been approved! You can now log in to our system and access all features.

@component('mail::button', ['url' => route('login')])
Login Now
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent 