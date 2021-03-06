const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

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
                status: 'pending',
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
        header: {
            Authorization: 'auth 7413cb906976921ec8b6dcd2ef3e0e1a-us20'
        },
        body: postData
    }

    fetch('http://us20.api.mailchimp.com/3.0/lists/73a30f4e8c', options)
        .then(
            res.statusCode === 200 ? res.redirect('/success.html') :
                res.redirect('/fail.html')
        ).catch(err => console.log(err))

    // request(options, (err, response, body) => {
    //     if (err) {
    //         res.redirect('/fail.html');
    //     } else {
    //         if (response.statusCode === 2000) {
    //             res.redirect('/success.html');
    //         } else {
    //             res.redirect('/fail.html')
    //         }
    //     }
    // });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on the port ${PORT}`));


