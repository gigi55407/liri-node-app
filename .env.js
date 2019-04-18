
//# Spotify API keys

SPOTIFY_ID=e2e71c0dc44446bfa1a16abc9fffbc14
SPOTIFY_SECRET=aa8ecbde8005409189fd29c177f49666
function findConcert(term) {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function(response) {
      // Info is printed out
      console.log("-----Response for Bands in Town-----" );
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city);
      console.log(response.data[0].venue.region);

    })

  
