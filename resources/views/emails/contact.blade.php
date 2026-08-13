<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
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
                <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-bottom: 16px;">New Contact Message</h1>

                <p style="font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
                    Someone sent a message through the <strong>Contact Us</strong> form on the {{ $appName }} website.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <tr>
                        <td style="background: #f8fafc; padding: 12px 16px; font-weight: 700; color: #0f172a; width: 160px; border-bottom: 1px solid #e2e8f0;">Name</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">{{ $name }}</td>
                    </tr>
                    @if($company)
                    <tr>
                        <td style="background: #f8fafc; padding: 12px 16px; font-weight: 700; color: #0f172a; width: 160px; border-bottom: 1px solid #e2e8f0;">Company</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">{{ $company }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="background: #f8fafc; padding: 12px 16px; font-weight: 700; color: #0f172a; width: 160px; border-bottom: 1px solid #e2e8f0;">Email</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                            <a href="mailto:{{ $email }}" style="color: #2563eb; text-decoration: none;">{{ $email }}</a>
                        </td>
                    </tr>
                    @if($phone)
                    <tr>
                        <td style="background: #f8fafc; padding: 12px 16px; font-weight: 700; color: #0f172a; width: 160px; border-bottom: 1px solid #e2e8f0;">Phone</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">{{ $phone }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="background: #f8fafc; padding: 12px 16px; font-weight: 700; color: #0f172a; width: 160px;">Message</td>
                        <td style="padding: 12px 16px; white-space: pre-wrap;">{{ $contactMessage }}</td>
                    </tr>
                </table>

                <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
                    Reply directly to {{ $email }} or use the Reply button in your mail client to respond to the sender.
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 24px 40px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
                    &copy; {{ date('Y') }} {{ $appName }}. All rights reserved.
                </p>
            </td>
        </tr>
    </table>

</body>
</html>
