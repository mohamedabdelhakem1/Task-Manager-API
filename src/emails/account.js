const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:"mohamedabdelhakem476@gmail.com",
        subject:"Thanks for joining Task app",
        text :`welcome to the app,${name}. let me know how you get along with the app.`
    })
}
const sendCancellationEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:"mohamedabdelhakem476@gmail.com",
        subject:"Thanks for joining Task app",
        text :`We are feeling sorry as you are leaving our application,${name}. We hope to see you sometime soon.`
    })
}
module.exports = {
    sendWelcomeEmail ,
    sendCancellationEmail
}