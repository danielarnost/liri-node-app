var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');
var tweetKeys = require('./keys.js')
var operator = process.argv[2];
var fs = require('fs');

 	var client = new twitter(tweetKeys.twitterKeys );
switch (operator) {
    case 'my-tweets':

        var twitterFeed = process.argv[3]
      
        var params = { screen_name: 'daniel_arnost' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
            	 // var textTweets = JSON.parse(body);
                // console.log(texttweets);
                console.log(tweets) + JSON.parse.body(text)
            } else {
            	console.log(error);
            }
        });

        break;
    case 'spotify-this-song':
        var song = process.argv[3]
        var defaultTrack = "Ace of Base - The Sign"

        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Track: " + data.tracks.items[0].name);
                console.log("Preview link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
            }

        });
        break;



    case 'movie-this':

        var movieName = process.argv[3]

        if (typeof movieName === "undefined") {
            movieName = "Mr. Nobody"

        }

        var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';
        request(queryUrl, function(error, response, body) {


            if (!error && response.statusCode == 200) {
                var movie = JSON.parse(body);

                console.log("Movie Title: " + movie["Title"] + "\nRelease Year: " + movie["Year"] + "\nImdb Rating: " + movie["imdbRating"] + "\nCountry: " + movie["Country"] + "\nLanguage: " + movie["Language"] + "\nPlot: " + movie["Plot"] + "\nActors: " + movie["Actors"] + "\ntomatoRating: " + movie["tomatoRating"] + "\ntomatoURL: " + movie["tomatoURL"]);
            }
        })

        break;
}
