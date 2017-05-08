// console.log("786");

// var allKeys = require("./keys.js");
// console.log(allKeys.twitterKeys.consumer_key);
var request = require("request");
var twitter = require('twitter');
var spotify = require('spotify');



var api = process.argv[2];
var param = process.argv[3];
// console.log(api);
// console.log(param);

// validating if arguments are ok.
// if (api !== "my-tweets" &&  api !== "spotify-this-song" &&  api !== "movie-this" &&  api !== "do-what-it-says" &&  api !== "giphy-this"){
// 	console.log("Second parameter API is invalid.");
// 	return
// }

if(param == null){
	console.log("Please specify 3rd parameter")
	return
}

if (api == "my-tweets"){
	showMytweets(param);
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

// Functions
// Giphy
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

// -------------------------------------------------------------------------------------------------

// Functions
//SPOTIFY
function showSpotifySongs(param){
	spotify.search({ type: 'track', query: param }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 
	   // console.log(JSON.stringify(data,null,4));
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

// // Functions
// //twitter
// function twitter(param){
// 	twitter.search({ type: 'track', query: param }, function(err, data) {
// 	    if ( err ) {
// 	        console.log('Error occurred: ' + err);
// 	        return;
// 	    }
	 
// 	   // console.log(JSON.stringify(data,null,4));
//   	for( var i = 0; i < data.tracks.items.length; i++){
// 	  		var artist = data.tracks.items[i].album.artists[0].name;
// 	  		var song = data.tracks.items[i].name;
// 	  		var previewLink = data.tracks.items[i].preview_url;
// 	  		var album = data.tracks.items[i].album.name;
// 	  		console.log("Artist: " + artist);
// 	  		console.log("Song: " + song);
// 	  		console.log("Preview link : " + previewLink);
// 	  		console.log("Album: " + album);
// 	  		console.log("-------------------------------------------------------");
// 	   	};
// 	});
// }


// --------------------------------------------------------------------------------------------------

// Functions
//SPOTIFY
function showSpotifySongs(param){
	spotify.search({ type: 'track', query: param }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 
	   // console.log(JSON.stringify(data,null,4));
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