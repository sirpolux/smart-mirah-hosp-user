<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eef2f7; color: #334155; padding: 40px 16px; }
    </style>
</head>
<body>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
        <tr>
            <td style="padding: 32px 40px 24px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <a href="{{ config('app.url') }}" target="_blank">
                    <img src="https://hospitality.smartmirah.com/img/logo-with-name.png" alt="{{ $appName }}" width="220" style="display: inline-block; max-width: 220px; height: auto;">
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 32px 40px;">
                <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hi {{ $userName }},</h1>

                <p style="font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
                    Thank you for creating an account with <strong>{{ $appName }}</strong>.
                    To start ordering premium hospitality supplies, please confirm your email address by clicking the button below.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                    <tr>
                        <td align="center">
                            <a href="{{ $verificationUrl }}" target="_blank" style="background-color: #2563eb; color: #ffffff; font-size: 16px; font-weight: 600; padding: 14px 34px; border-radius: 8px; text-decoration: none; display: inline-block;">
                                Verify Email Address
                            </a>
                        </td>
                    </tr>
                </table>

                <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 8px;">
                    This link will expire in <strong>60 minutes</strong>.
                </p>

                <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 24px;">
                    If the button above doesn't work, copy and paste this URL into your browser:
                </p>

                <p style="font-size: 13px; line-height: 1.6; word-break: break-all; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 14px; color: #2563eb; margin-bottom: 24px;">
                    <a href="{{ $verificationUrl }}" target="_blank" style="color: #2563eb; text-decoration: none;">{{ $verificationUrl }}</a>
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 24px 40px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
                    If you did not create this account, no further action is required.
                </p>
                <p style="font-size: 13px; color: #94a3b8; margin-top: 8px;">
                    &copy; {{ date('Y') }} {{ $appName }}. All rights reserved.
                </p>
            </td>
        </tr>
    </table>

</body>
</html>
