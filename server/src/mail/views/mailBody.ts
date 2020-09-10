export const mailBody = (
  confirmUrl: string,
  name: string,
): string => `<div class="body" style="background-color: aliceblue;padding: 40px;">
            <table style="border-collapse: collapse;max-width: 700px;margin: auto;border: 10px;">
                <tbody style="background: #ffffff;">
                    <tr>
                        <td class="title" style="border-top-left-radius: 6px;border-top-right-radius: 6px;height: 80px;background: #ffffff;background-size: 300px;background-position: 100%;background-repeat: no-repeat;line-height: 55px;padding-top: 40px;text-align: center;color: #54616a;display: block !important;margin: 0 auto !important;clear: both !important;">
                            <img src="cid:mail-logo" alt="" width="100">
                        </td>
                    </tr>
                    <tr>
                        <td class="content" style="background: #fff;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;padding-bottom: 40px;margin: 0 auto !important;clear: both !important;">
                            <div class="center" style="background: #ffffff;color: #54616a;padding: 0px 60px 40px;text-align: center;padding-bottom: 0px;margin: 40px 0;">
                                <h1 style="font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;margin-bottom: 10px;color: #54616a;margin: 0px 0 10px;line-height: 40px;font-weight: 400;font-size: 28px;padding-left: 40px;padding-right: 40px;padding-top: 0px;text-transform: capitalize;">Welcome, ${name}!</h1>
                                <p style="font-weight: normal;padding: 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;line-height: 1.7;margin-bottom: 0;font-size: 15px;color: #54616a;opacity: 0.8;padding-left: 40px;padding-right: 40px;padding-bottom: 0;">Glad to have you on board.</p>
                            </div>
                            <p style="font-weight: normal;padding: 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;line-height: 1.7;margin-bottom: 0;font-size: 15px;color: #54616a;opacity: 0.8;padding-left: 40px;padding-right: 40px;padding-bottom: 0;">Please confirm your account by clicking the button below:</p>
                            <p class="button" style="font-weight: normal;padding: 8px 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;line-height: 1.7;margin-bottom: 0;font-size: 15px;color: white;opacity: 0.8;margin: 20px auto;border-radius: 5px;background-color: #2ea450;max-width: 130px;text-align: center;cursor: pointer;"><a href="${confirmUrl}" style="color: white;text-decoration: none;font-weight: bold;">Confirm Email</a> </p>
                            <p style="font-weight: normal;padding: 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;line-height: 1.7;margin-bottom: 0;font-size: 15px;color: #54616a;opacity: 0.8;padding-left: 40px;padding-right: 40px;padding-bottom: 0;">Once confirmed, you'll be able to log in to Hacker Challenge with your new account.</p>
                            <p style="font-weight: bold;padding: 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;line-height: 1.7;margin-bottom: 0;font-size: 15px;color: #54616a;opacity: 0.8;padding-left: 40px;padding-right: 40px;padding-bottom: 0;">If you not confirm email within 24 hours, your account will be deleted!.</p>
                            <p style="font-weight: normal;padding: 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;line-height: 1.7;margin-bottom: 0;font-size: 15px;color: #54616a;opacity: 0.8;padding-left: 40px;padding-right: 40px;padding-bottom: 0;">
                                Best wishes,<br>
                                Hacker Challenge
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
