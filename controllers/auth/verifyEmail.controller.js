import {qryVerCode_and_expiresAt} from '../../models/authModel/verifyEmail.model.js';

export const verifyEmail = async(req,res)=>{
    const {email, code} = req.body;
    const EmailLower = email.toLowerCase();
    try{
        if (!EmailLower || !code){
            return res.status(400).json({ message: "Complete the fields" });
        }

        const verCode_and_expiresAt = await qryVerCode_and_expiresAt(EmailLower);
        const verificationCOde = verCode_and_expiresAt.verificationCOde

        console.log(verificationCOde);

    }catch(err){

    }

}