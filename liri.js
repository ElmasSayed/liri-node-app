
var fs = require("fs");
var allKeys = require('./keys.js');
var request = require("request");
var twitter = require('twitter');
var spotify = require('spotify');

//arg0 and arg1 us already taken by node
var api = process.argv[2];
var param = process.argv[3];
var param2 = process.argv[4];

if (api == "my-tweets"){
	showMyTweets(param);
}else if(api == "spotify-this-song"){
 	showSpotifySongs(param)
}else if(api == "movie-this"){
 	showMovies(param);
}else if(api == "do-what-it-says"){
 	showDoAsItSays(param);
}else if(api == "giphy"){
	showGiphys(param);
}else {
	console.log("Second parameter API is invalid.");
	return
}
// ------------------------------------------------------------------------------------------------------------------
// 													Functions
// ------------------------------------------------------------------------------------------------------------------
// GIPHY
function showGiphys(param){
		var endpoint = "https://api.giphy.com/v1/gifs/search"; 
		var querystring = "?q=" + param + "&limit=10&api_key=dc6zaTOxFJmzC"; 
		var queryURL = endpoint + querystring;
		console.log(queryURL)
		request(queryURL, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log(JSON.parse(body));
			}
		});
}
// ------------------------------------------------------------------------------------------------------------------
//OMDB
function showMovies(param){
	
	if (param == null){
		param = "Mr. Nobody";
	}
  	
	var endpoint = "http://www.omdbapi.com/";
	var querystring = "?t=" + param + "&y=&plot=short&r=json"; 
	var queryURL = endpoint + querystring;
	// console.log(queryURL);
	request(queryURL, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			//console.log(JSON.parse(body));
			var Title = body.Title;
			var Year = body.Year;
			var Rating = body.imdbRating;
			var Country = body.Country;
			var Language = body.Language;
			var Plot = body.Plot;
			var Actors = body.Actors;
			var Rotten = body.Ratings[1].Value;

	  		console.log("-------------------------------------------------------");
			console.log("Title of the movie: " + Title.toUpperCase());
			console.log("* Year the movie came out: " + Year);
			console.log("* IMDB Rating of the movie: " + Rating);
			console.log("* Country where the movie was produced: " + Country);
			console.log("* Language of the movie: " + Language);
			console.log("* Plot of the movie: " + Plot);
			console.log("* Actors in the movie: " + Actors);
			console.log("* Rotten Tomatoes: " + Rotten);
	  		console.log("-------------------------------------------------------");
	  		if(param === "Mr. Nobody"){
	  			console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>  It's on Netflix!")
   	  		}
		}
	});
}
// -------------------------------------------------------------------------------------------------
//SPOTIFY
function showSpotifySongs(param){

    if (param == null){
		param = "The Sign";
	}

	spotify.search({ type: 'track', query: param }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	   	for( var i = 0; i < data.tracks.items.length; i++){
	  		var artist = data.tracks.items[i].album.artists[0].name;
	  		var song = data.tracks.items[i].name;
	  		var previewLink = data.tracks.items[i].preview_url;
	  		var album = data.tracks.items[i].album.name;
	  		console.log("Artist: " + artist);
	  		console.log("Song: " + song);
	  		console.log("Preview link : " + previewLink);
	  		console.log("Album: " + album);
	  		console.log("-------------------------------------------------------");
	   	};
	});
}
// --------------------------------------------------------------------------------------------------------

//twitter
function showMyTweets(param){

	var client = new twitter(allKeys.twitterKeys);
	 
	var params = {screen_name: 'bubble23979368'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error && response.statusCode === 200) {
			for(var i=0; i < tweets.length; i++){
				console.log("text: " + tweets[i].text);
				console.log("-------------------------------------------------------");
				console.log("created at: " + tweets[i].created_at);
			}
		}
	});
}	
// ----------------------------------------------------------------------------------------------------------

// do-what-it-says

function showDoAsItSays(param){

	fs.writeFile("random.txt", param, function(err){
		if(err){
			return console.log(err);
		}else{
			fs.readFile("./random.txt", function(err,data){
				if(err){
					return console.log(err);
				}else{
					showSpotifySongs(data);
				}				
			});
		}
	});
}

// --------------------------------------------------------------------------------------