let fs = require('fs');

exports.pageNotFound = function(req, res) {

    res.writeHead(404, { 'Content-type': 'text/html'});

    fs.readFile('./views/404.html', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data.toString());
        }
        res.end();
    })

};