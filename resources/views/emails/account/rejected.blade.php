@component('mail::message')
# Account Status Update

Dear {{ $user->first_name }},

We regret to inform you that your account application has not been approved at this time.

If you believe this is an error or would like more information, please contact our support team.

Thanks,<br>
{{ config('app.name') }}
@endcomponent 