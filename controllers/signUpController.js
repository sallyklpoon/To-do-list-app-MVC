let top = require('../views/partials/pageSignUpTop');
let bottom = require('../views/partials/pageBottom');

let User = require('../models/usersModel');

exports.getSignUpPage = function (req, res) {

    res.writeHead(200, {
        'Content-type': 'text/html'
    });

    res.write(top + bottom);

    res.end();

};

exports.postSignUpPage = function (req, res) {

    let data = [];
    req.on('data', function (signup_info) {
        data.push(signup_info);
        console.log(signup_info);
    });

    req.on('end', function () {

        let info = Buffer.concat(data).toString();

        let elements = info.split('&');
        let username = elements[0].split('=')[1];
        let password = elements[1].split('=')[1];
        let img_number = elements[2].split('=')[1];

        User.find({
            username: username,
            password: password
        }, function (err, records) {
            if (err) {
                console.log(err);
            } else {

                if (records.length == 1) {

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    let message = `<p id='registered-msg'> User with specified username and password exists </p>`;

                    res.write(top + message + bottom);
                    res.end();

                } else {
                    let user = new User({
                        username: username,
                        password: password,
                        image: img_number
                    })
                    user.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('User was saved');

                            res.writeHead(301, {
                                'Location': '/'
                            });
        
                            res.end();
                        }
                    });



                }
            }
        });

    });
};