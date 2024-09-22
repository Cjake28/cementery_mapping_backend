import transporter from './config.email.js';
import {VERIFICATION_EMAIL_TEMPLATE} from './templates.email.js'

export async function Send_signup_email_verification(email, verificatinCode){
    try{
    const sendEmail = await transporter.sendMail({
        from: `"Your Name" <${process.env.nodemailerEmail}>`,
        to: email,
        subject:'Email Verification',
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificatinCode),
    })

    return sendEmail;
    }catch(err){
        console.log(err);
    }
}
