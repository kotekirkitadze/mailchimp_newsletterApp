const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

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
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on the port ${PORT}`));