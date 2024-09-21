import transporter from './config.email.js';

export async function Send_signup_email_verification(){
    try{
    const sendEmail = await transporter.sendMail({
        to:'cjakesupnet@gmail.com',
        subject:'TRY NODEMAINLER',
        html: "<h1> SUCCESS </h1>"
    })

    console.log(sendEmail);
    }catch(err){
        console.log(err);
    }
}

(async function() {
    await Send_signup_email_verification();
  })();