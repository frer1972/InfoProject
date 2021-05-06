const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();

//view engine set up
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//Body parse Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req, res) =>{
    res.send('Hello');
    res.render('')
});

app.post('/send',(req, res) => {
    console.log(req.body);
    const output = `<p> prueba </p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'personal56company@gmail.com', // generated ethereal user
            pass: 'Personal_01' // generated ethereal password
        },
        tls:{
            rejectUnuthorizer:false;
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nood Mailer contact 👻" <personal56company@gmail.com>', // sender address
        to: 'frerespinoza@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

});

app.listen(3000, () => console.log('server started...'));

