const nodemailer = require("nodemailer");
const SendEmailUtility = async(emailTo,emailSubject,emailText)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"shohanarahman907@gmail.com",
            pass:"kmjr pvty sayd znpw"
        }    
    })
    let mailoptios = {
        from:'"InFlow"<shohanarahman907@gmail.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText
    }
    return await transporter.sendMail(mailoptios)
}
module.exports = SendEmailUtility