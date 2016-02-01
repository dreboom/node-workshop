Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

var request = require('request');

console.log("What city are you in?");

var prompt = require('prompt');
prompt.start();
prompt.get('city', function(err, result) {
    console.log(' city: ' + result.city);

    request("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.city, function(err, res, body) {
        if (!err) {
            var yourInfo = JSON.parse(body);
            console.log("Your location is: " + yourInfo.results[0].formatted_address);
            console.log(yourInfo.results[0].geometry.location);
        }
        else {
            console.log("there was an error: " + err);
        }


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


            //you final match 



            /**
             * Creates a LatLon point on the earth's surface at the specified latitude / longitude.
             *
             * @classdesc Tools for geodetic calculations
             * @requires Dms from 'dms.js'
             *
             * @constructor
             * @param {number} lat - Latitude in degrees.
             * @param {number} lon - Longitude in degrees.
             *
             * @example
             *     var p1 = new LatLon(52.205, 0.119);
             */
            function LatLon(lat, lon) {
                // allow instantiation without 'new'
                if (!(this instanceof LatLon)) return new LatLon(lat, lon);

                this.lat = Number(lat);
                this.lon = Number(lon);
            }


            /**
             * Returns the distance from 'this' point to destination point (using haversine formula).
             *
             * @param   {LatLon} point - Latitude/longitude of destination point.
             * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
             * @returns {number} Distance between this point and destination point, in same units as radius.
             *
             * @example
             *     var p1 = new LatLon(52.205, 0.119), p2 = new LatLon(48.857, 2.351);
             *     var d = p1.distanceTo(p2); // Number(d.toPrecision(4)): 404300
             */
            LatLon.prototype.distanceTo = function(point, radius) {
                if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
                radius = (radius === undefined) ? 6371e3 : Number(radius);

                var R = radius;
                var φ1 = this.lat.toRadians(),
                    λ1 = this.lon.toRadians();
                var φ2 = point.lat.toRadians(),
                    λ2 = point.lon.toRadians();
                var Δφ = φ2 - φ1;
                var Δλ = λ2 - λ1;

                var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;

                return d;
            };


            var p1 = new LatLon(yourInfo.results[0].geometry.location.lat, yourInfo.results[0].geometry.location.lng);
            var p2 = new LatLon(issInfo.iss_position.latitude, issInfo.iss_position.longitude);
            var d = p1.distanceTo(p2);
            console.log("You are " + Number(d.toPrecision(4))/1000 + " kilometers away from the I.S.S.");
        });
    });
});
