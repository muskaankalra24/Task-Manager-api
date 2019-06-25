
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
    to: email,
    from:'muskankalra321@gmail.com',
    subject:'Thanks for joining in!',
    text:`Welcome to the app, ${name}. Let me know how you get along with the app`

    })
    

}

const sendDeletionEmail = (email,name)=>{
    sgMail.send({
    to: email,
    from:'muskankalra321@gmail.com',
    subject:`Good Bye ${name}!`,
    text:'Is their something we could have done to kept you on board?'

    })
    

}

module.exports ={
    sendWelcomeEmail,
    sendDeletionEmail
}
    

