//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/Itai-Naor-28-12-2019'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/Itai-Naor-28-12-2019/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
