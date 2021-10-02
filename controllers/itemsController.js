let Item = require('../models/itemsModel');
let User = require('../models/usersModel');

let top = require('../views/partials/pageListTop');
let bottom = require('../views/partials/pageBottom');


exports.getListPage = function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // Find all items in items collection and display as list
    Item.find(function (err, records) {
        if (err) {
            console.log(err)
        } else {

            let ul = '<ul>';

            for (let i = 0; i < records.length; i++) {
                let item = records[i].item;
                let li = `<li>${item}</li>`
                ul += li;
            }

            ul += '</ul>';

            res.write(top + ul + bottom);
            res.end();
        }
    });

};

exports.postListPage = function (req, res) {

    let username = req.session.get('username');
    let password = req.session.get('pword');

    let data = []
    req.on('data', function (data_chunk) {
        data.push(data_chunk);
    });

    req.on('end', function () {
        
        let str = Buffer.concat(data).toString();
        let info = str.split('=')[1];


        // Add the new item to current session user's itemsArray
        User.findOneAndUpdate({
            username: username,
            password: password
        }, {
            "$push": {
                itemsArray: info
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Saving item to session user successful!');
            }
        });

        // Add the new item to items collection & save
        let _item = new Item({
            item: info,
        });

        _item.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                res.writeHead(301, {
                    'Location': '/list/all'
                });
                res.end();
            }
        });


    });

};

exports.getListMinePage = function (req, res) {

    let username = req.session.get('username');

    User.find({
        username: username
    }, function (err, records) {
        if (err) {
            console.log(err);
        } else {

            if (records.length == 1) {


                let div = `<div id='my-list'>`;

                
                let img_number = records[0].image;
                let image = `<img src= 'https://randomuser.me/api/portraits/men/${img_number}.jpg' />`;


                let my_items = records[0].itemsArray;
                let ul = '<ul>';

                for (let i = 0; i < my_items.length; i++) {
                    let item = my_items[i];
                    let li = `<li>${item}</li>`;
                    ul += li;
                }

                ul += '</ul>';

                div += image + ul + '</div>';

                res.write(top + div + bottom);
                res.end();

            }
        }
    });
};