var http = require('http');

var options = {
    method: 'POST',
    host: '120.25.224.35',
    port: '8081',
    path: '/version',
    headers: { 'Content-Type': 'application/json' }
};

var req = http.request(options, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

const { PKG_NAME, VERSION_TAG } = process.env;
req.write(JSON.stringify({ name: PKG_NAME, version: VERSION_TAG }));
req.end();
