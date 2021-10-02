let fs = require('fs');

let User = require('../models/usersModel');

exports.getLoginPage = function (req, res) {

    res.writeHead(200, {
        'Content-type': 'text/html'
    });

    fs.readFile('./views/login.html', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data.toString());
        }
        res.end();
    });

};



exports.postLoginPage = function (req, res) {

    let data = [];
    req.on('data', function (form_info) {
        data.push(form_info);
        console.log(form_info);
    });

    req.on('end', function () {
        let info = Buffer.concat(data).toString();

        let elements = info.split('&');
        let username = elements[0].split('=')[1];
        let password = elements[1].split('=')[1];

        // Search for this user in database
        User.find({
            username: username,
            password: password
        }, function (err, records) {
            if (err) {
                console.log(err);
            } else {


                // a user was found in db (records is array with length 1), move to list page
                if (records.length == 1) { 
                    req.session.put('username', username);
                    req.session.put('pword', password);

                    res.writeHead(301, {
                        'Location': '/list/all'
                    });
                    res.end();
                } else {                        // no user found in db, stay on current page
                    res.writeHead(301, {
                        'Location': '/'
                    });
                    res.end();
                }
            }
        })
    });

};