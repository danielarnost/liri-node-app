var inquirer = require('inquirer');

inquirer.prompt([
{
		type: "input",
		message: "What is your favorite Movie?",
		name: "movie"
	}
]).then(function (answers) {
var request = require('request');
var movieName= answers.movie;

var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';
request(queryUrl, function (error, response, body) {

	
	if (!error && response.statusCode == 200) {

		
		console.log("Movie Title: " + JSON.parse(body)["Title"] + "\nRelease Year: " + JSON.parse(body)["Year"] + "\nImdb Rating: " + JSON.parse(body)["imdbRating"] + "\nCountry: " + JSON.parse(body)["Country"] + "\nLanguage: " + JSON.parse(body)["Language"] +"\nPlot: " + JSON.parse(body)["Plot"] +"\nActors: " + JSON.parse(body)["Actors"] +"\ntomatoRating: " + JSON.parse(body)["tomatoRating"] + "\ntomatoURL: " + JSON.parse(body)["tomatoURL"]);
		
		
		
	}
});
});