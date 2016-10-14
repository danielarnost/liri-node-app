var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');
var tweetKeys = require('./keys.js');
var fs = require('fs');

var dansTweets = function(){
var client = new twitter(tweetKeys.twitterKeys);
var twitterFeed = process.argv[3]

        var params = { screen_name: 'daniel_arnost', count: 20 };

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
           
            if (!error) {
               
                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text);
                    console.log(tweets[i].created_at);

                }
            } else {
                console.log(error);
            }
        });
}


var spotifySong = function(songName){

	if (songName === undefined){
		songName = 'The Sign';
	}
var musicalArtist = function(artist){
	return artist.name;
}
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	   	 	
	    var songs = data.tracks.items;

	    if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("Artist: " + songs[0].artists[0].name);
                console.log("Track: " + songs[0].name);
                console.log("Preview link: " + songs[0].preview_url);
                console.log("Album: " + songs[0].album.name);
	    }
	});
}

var movieName = function(movieName){

        if (typeof movieName === "undefined") {
            movieName = "Mr. Nobody"
        }
        var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var movie = JSON.parse(body);
                console.log("Movie Title: " + movie["Title"] + "\nRelease Year: " + movie["Year"] + "\nImdb Rating: " + movie["imdbRating"] + "\nCountry: " + movie["Country"] + "\nLanguage: " + movie["Language"] + "\nPlot: " + movie["Plot"] + "\nActors: " + movie["Actors"] + "\ntomatoRating: " + movie["tomatoRating"] + "\ntomatoURL: " + movie["tomatoURL"]);
            }
        });
}

var doWhatItSays = function(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		
		var dataArr = data.split(',')

		if (dataArr.length == 2){
			pick(dataArr[0], dataArr[1]);
		}else if (dataArr.length == 1){
			pick(dataArr[0]);
		}
		
	});
}

var pick = function(caseData, functionData){
	switch(caseData) {
	    case 'my-tweets':
	        dansTweets();
	        break;
	    case 'spotify-this-song':
	        spotifySong(functionData);
	        break;
	    case 'movie-this':
	    	movieName(functionData);
	    	break;
	    case 'do-what-it-says':
	    	doWhatItSays();
	    	break;
	}
}

var callFunc = function(argOne, argTwo){
	pick(argOne, argTwo);
};
callFunc(process.argv[2], process.argv[3]);

