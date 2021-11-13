const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

var Mailchimp = require('mailchimp-api-v3')

var mailchimp = new Mailchimp('7413cb906976921ec8b6dcd2ef3e0e1a-us20');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {

    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const postData = JSON.stringify(data);

    const options = {
        method: 'POST',
        body: postData
    }


    mailchimp.request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail.html');
        } else {
            if (response.statusCode === 2000) {
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html')
            }
        }
    })

})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on the port ${PORT}`));


