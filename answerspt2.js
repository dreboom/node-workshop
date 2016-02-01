var request = require('request');



request("http://api.open-notify.org/iss-now.json", function(err, res, body) {
    if (!err) {
        var issInfo = JSON.parse(body);
        issInfo.iss_position.latitude = issInfo.iss_position.latitude.toFixed(2);
        issInfo.iss_position.longitude = issInfo.iss_position.longitude.toFixed(2);
        console.log("The ISS is now at: " + issInfo.iss_position.latitude + " x " + issInfo.iss_position.longitude);
    }
    else {
        console.log("there was an error: " + err);
    }
});

