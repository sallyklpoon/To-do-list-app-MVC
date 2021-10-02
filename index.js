let http = require('http');

let loginController = require('./controllers/loginController');
let itemsController = require('./controllers/itemsController');
let errorController = require('./controllers/errorController');
let signUpController = require('./controllers/signUpController');


let NodeSession = require('node-session');
let session = new NodeSession({
    secret: 'hello'
});


let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');

let db = mongoose.connection;
db.once('open', function () {
    console.log('Connection was successful');
});


http.createServer(function (req, res) {


    let method = req.method;
    let url = req.url;

    
    session.startSession(req, res, function (){

        if (method == 'GET' && url == "/") {

            loginController.getLoginPage(req, res);

        } else if (method == 'POST' && url == "/") {

            loginController.postLoginPage(req, res);

        } else if (method == 'GET' && url == '/signup') {

            signUpController.getSignUpPage(req, res);

        } else if (method == 'POST' && url == '/signup') {

            signUpController.postSignUpPage(req, res);

        } else if (method == 'GET' && url == '/list/all'){

            itemsController.getListPage(req, res);

        } else if (method == 'POST' && url == '/list/all') {

            itemsController.postListPage(req, res);

        } else if (method == 'GET' && url == '/list/mine') {

            itemsController.getListMinePage(req, res);

        } else {

            errorController.pageNotFound(req, res);

        };

    });

}).listen(8000);