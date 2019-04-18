

require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotifyKeys);


// Declare the Concert constructor
//var Concert;

// Grab search command line argument
var search = process.argv[2];

// Joining the remaining arguments since a concert, song or movie may contain spaces
var term = process.argv.slice(3).join(" ");

//Switch statement takes argv2 and compares it against various options to determine which function to run
switch (search) {
  case "concert-this":
    // print if searching for a concert
    console.log("Searching for Concert");
    findConcert(term);
    break;
  case "spotify-this-song":
    // print if searching for a song
    console.log("Searching for a Song");
    findSong(term);
    break;
  case "movie-this":
    // print if searching for a movie
    console.log("Searching for a Movie \n");
    findMovie(term);
    break;
  case "do-what-it-says":
    // print if searching for do-what-it-says
    console.log("Searching for Do-What-It-Says");
    findDoWhat(term);
    break;
}

////var Concert = function() {
// divider will be used as a spacer between the concert data we print in log.txt
var divider = "\n-------------\n\n";

// findConcert takes in the name of an artist or band and searches the 'Bands in Town' API
function findConcert(term) {
  var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

  axios.get(URL).then(function (response) {
    // Info is printed out
    console.log("\n************EVENT INFO*************\n");
    // Append in log.txt file
    fs.appendFileSync("log.txt", "***************EVENT INFO***************\n");
    console.log("Artist(s): " + response.data[0].lineup[0]);
    fs.appendFileSync("log.txt", "Artist(s): " + response.data[0].lineup[0] + "\n");
    console.log("City: " + response.data[0].venue.city);
    fs.appendFileSync("log.txt", "City: " + response.data[0].venue.city + "\n");
    console.log("Region: " + response.data[0].venue.region);
    fs.appendFileSync("log.txt", "Venue: " + response.data[0].venue.region + "\n");
    console.log("Country: " + response.data[0].venue.country);
    fs.appendFileSync("log.txt", "Venue: " + response.data[0].venue.country + "\n");
    console.log(("Date: " + (moment(response.data[0].datetime).format("MM/DD/YYYY"))));
    fs.appendFileSync("log.txt", ("Date: " + (moment(response.data[0].datetime).format("MM/DD/YYYY"))) + "\n");
    console.log(divider);
    fs.appendFileSync("log.txt", "-----------------------------------------\n");
  })

}

/*movie-this,Mr.America ---> random.txt file
fs.readFile("random.txt", "utf8", function (error, data) {
       console.log(data);
       });no
var action = data.split(",")
if(action==="movie-this"){
  findMovie(data[1]);
}
*/

// divider will be used as a spacer between the song data we print in log.txt
var divider = "\n-----------------------------------\n\n";

// findSong takes in the name of a song and searches the spotify API
function findSong(term, response) {
  if (!term) {
    term = 'The Sign';
  }
  // console.log(term);
  spotify.search({ type: 'track', query: term })
    .then(function (response) {

      // console.log("B: " + JSON.stringify(response));

      // Print info to consolelog
      //console.log(JSON.stringify(response));
      console.log("\n*************SONG INFO**************\n");
      // Append in log.txt file
      fs.appendFileSync("log.txt", "***************SONG INFO*****************\n");
      console.log("Artist(s): " + JSON.stringify(response.tracks.items[0].album.artists[0].name));
      fs.appendFileSync("log.txt", "Artist(s): " + JSON.stringify(response.tracks.items[0].artists[0].name) + "\n");
      console.log("Song Name: " + JSON.stringify(response.tracks.items[0].name));
      fs.appendFileSync("log.txt", "Song Name: " + JSON.stringify(response.tracks.items[0].name) + "\n");
      console.log("Preview URL: " + JSON.stringify(response.tracks.items[0].preview_url));
      fs.appendFileSync("log.txt", "Preview URL: " + (JSON.stringify(response.tracks.items[0].preview_url)) + "\n");
      console.log("Album: " + JSON.stringify(response.tracks.items[0].album.name));
      fs.appendFileSync("log.txt", "Album: " + (JSON.stringify(response.tracks.items[0].album.name)) + "\n");
      console.log(divider);
      fs.appendFileSync("log.txt", "-----------------------------------------\n");
    })
    .catch(function (err) {
      console.log(err);
    });

  //Append songData and the divider to log.txt, print songData to the console
  fs.appendFile("log.txt", response + divider, function (err) {
    if (err) throw err;
  });
}


function findMovie(term) {

  if (!term) {
    term = ("Mr. Nobody");
  }

  var URL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

  axios.get(URL).then(function (response) {
    // Movie info is printed out
    console.log("************MOVIE INFO**************\n");
    fs.appendFileSync("log.txt", "***************MOVIE INFO***************\n");
    console.log("Title: " + response.data.Title);
    fs.appendFileSync("log.txt", "Title: " + response.data.Title + "\n");
    console.log("Year: " + response.data.Year);
    fs.appendFileSync("log.txt", "Year: " + response.data.Year + "\n");
    console.log("IMDB Rating: " + response.data.imdbRating);
    fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating + "\n");
    console.log("Country: " + response.data.Country);
    fs.appendFileSync("log.txt", "Country: " + response.data.Country + "\n");
    console.log("Language: " + response.data.Language);
    fs.appendFileSync("log.txt", "Year: " + response.data.Language + "\n");
    console.log("Plot: " + response.data.Plot);
    fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
    console.log("Actors: " + response.data.Actors);
    fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
    console.log(divider);
    fs.appendFileSync("log.txt", "-----------------------------------------\n")
  });

};


function findDoWhat(term) {
  fs.readFile('random.txt', "utf8", function (error, data) {
    var txt = data.split(',');
    findSong(txt[1]);
  });
}















