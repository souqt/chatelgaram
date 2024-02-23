var redis = require('redis');
var express = require('express');
var app = express();

// Add your redis setup here
var client = redis.createClient();

app.get('/query', function(req, res){
    // Query your redis dataset here
    client.get('data', function(err, reply) {
       // Handle errors if they occur
       if(err) res.status(500).end();
       // You could send a string
       res.send(reply.toString());
       // or json
       // res.json({ data: reply.toString() });
    });
});

app.listen(3000);
