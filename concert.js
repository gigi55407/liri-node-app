// var axios = require("axios"); [is this needed here?]
// var fs = require("fs"); [Is this needed here?]

// Create the Concert constructor
var Concert = function() {
  // divider will be used as a spacer between the concert data we print in log.txt
  var divider = "\n------------------------------------------------------------\n\n";

  // findShow takes in the name of an artist or band and searches the 'Bands in Town' API
  this.findConcert = function(concert) {
    var URL = "http://www.artists.bandsintown.com/bandsintown-api" + show;

    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;

      // showData ends up being the string containing the show data we will print to the console
      var showData = [
        "Show: " + jsonData.name,
        "Genre(s): " + jsonData.genres.join(", "),
        "Rating: " + jsonData.rating.average,
        "Network: " + jsonData.network.name,
        "Summary: " + jsonData.summary
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
      });
    });
  };

  // findActor takes in the name of an actor to search for
  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;

    axios.get(URL).then(function(response) {
      // Grab the first index of the response array, access the object at the `person` key and store it in a variable.
      var jsonData = response.data[0].person;
      // actorData ends up being the string containing the show data we will print to the console
      var actorData = [
        "Name: " + jsonData.name,
        "Birthday: " + jsonData.birthday,
        "Gender: " + jsonData.gender,
        "Country: " + jsonData.country.name,
        "URL: " + jsonData.url
      ].join("\n\n");

      // Append actorData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", actorData + divider, function(err) {
        if (err) throw err;
        console.log(actorData);
      });
    });
  };
};

module.exports = TV;
