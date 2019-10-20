//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const mongodbpw = process.env.MONGODB_PASSWORD;
mongoose.connect("mongodb+srv://admin-idan:" + mongodbpw + "@cluster0-gejzc.mongodb.net/TVShowsDB?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  originalName: String,
  popularity: Number,
  firstAirDate: String,
  voteAvg: Number,
  overview: String,
  posterPath: String,
  seasons: [{
    id: Number,
    airDate: String,
    episodeCount: Number,
    name: String,
    posterPath: String,
    seasonNumber: Number,
    episodes: [{
      airDate: String,
      id: Number,
      name: String,
      overview: String,
      stillPath: String,
      episodeImages: [{
        type: String
      }],
      guestStars: [{
        id: Number,
        name: String,
        character: String,
        profilePath: String
      }]
    }]
  }],
  relatedTvShowIds: Array
});

const TVShow = mongoose.model('TVShow', itemsSchema, 'TVShows_en');
const TVShowHE = mongoose.model('TVShow', itemsSchema, 'TVShows');


app.get("/", function(req, res) {
  // var mostPopular2 = [
  //   "62286", "60735", "456", "1622", "1412",
  //   "1434", "62104", "62688", "60625", "60708",
  //   "46298", "46952", "62273", "1416", "1403",
  //   "69050", "2190", "2734", "62560", "17610",
  //   "2691","77199","1399","73223","48891",
  //   "4057","63174","93392","71712","46952",
  //   "4614","79460","76479","90755","60572",
  //   "44217","75450","1668"
  // ];
  // mostPopular2.forEach((id) => {
  //   TVShow.findOne({
  //     id: id
  //   }, function(err, foundTVShow) {
  //     if (!err) {
  //
  //       var name = foundTVShow.name;
  //       var posterPath = (foundTVShow.posterPath == null) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + foundTVShow.posterPath;
  //       var voteAvg = foundTVShow.voteAvg;
  //       const obj = {
  //         name,
  //         posterPath,
  //         voteAvg
  //       };
  //       console.log(obj);
  //     }
  //   });
  // });

  var mostPopular = [{
      name: 'Game of Thrones',
      posterPath: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
      voteAvg: 8.1
    },
    {
      name: 'Fear the Walking Dead',
      posterPath: 'https://image.tmdb.org/t/p/w500/lZMb3R3e5vqukPbeDMeyYGf2ZNG.jpg',
      voteAvg: 6.3
    },
    {
      name: 'The Flash',
      posterPath: 'https://image.tmdb.org/t/p/w500/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg',
      voteAvg: 6.7
    },
    {
      name: 'The Simpsons',
      posterPath: 'https://image.tmdb.org/t/p/w500/yTZQkSsxUFJZJe67IenRM0AEklc.jpg',
      voteAvg: 7.1
    },
    {
      name: 'Arrow',
      posterPath: 'https://image.tmdb.org/t/p/w500/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg',
      voteAvg: 5.8
    },
    {
      name: 'Family Guy',
      posterPath: 'https://image.tmdb.org/t/p/w500/gBGUL1UTUNmdRQT8gA1LUV4yg39.jpg',
      voteAvg: 6.5
    },
    {
      name: 'The Seven Deadly Sins',
      posterPath: 'https://image.tmdb.org/t/p/w500/gxTojpKEOtue85EEFlozwRbDXwJ.jpg',
      voteAvg: 7.9
    },
    {
      name: 'Rick and Morty',
      posterPath: 'https://image.tmdb.org/t/p/w500/qJdfO3ahgAMf2rcmhoqngjBBZW1.jpg',
      voteAvg: 8.5
    },
    {
      name: 'Supergirl',
      posterPath: 'https://image.tmdb.org/t/p/w500/4ka8vAzAFUZFKxWyfGfwVcSXuZo.jpg',
      voteAvg: 5.8
    },
    {
      name: 'Food Wars!: Shokugeki no Soma',
      posterPath: 'https://image.tmdb.org/t/p/w500/oSK6MoEScP9V4XF0cPvJ0a66urY.jpg',
      voteAvg: 8.2
    },
    {
      name: 'Hunter x Hunter',
      posterPath: 'https://image.tmdb.org/t/p/w500/yWBcBIO9OrF3E85C5Arols6QNnG.jpg',
      voteAvg: 8.4
    },
    {
      name: 'Gotham',
      posterPath: 'https://image.tmdb.org/t/p/w500/4XddcRDtnNjYmLRMYpbrhFxsbuq.jpg',
      voteAvg: 6.9
    },
    {
      name: 'Riverdale',
      posterPath: 'https://image.tmdb.org/t/p/w500/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg',
      voteAvg: 7
    },
    {
      name: 'South Park',
      posterPath: 'https://image.tmdb.org/t/p/w500/v9zc0cZpy5aPSfAy6Tgb6I1zWgV.jpg',
      voteAvg: 7.8
    },
    {
      name: 'Lucifer',
      posterPath: 'https://image.tmdb.org/t/p/w500/1sBx2Ew4WFsa1YY32vlHt079O03.jpg',
      voteAvg: 7.4
    },
    {
      name: 'Legacies',
      posterPath: 'https://image.tmdb.org/t/p/w500/rb64COqdpRRfWOc6gWTfC7WxzXP.jpg',
      voteAvg: 7.3
    },
    {
      name: 'Titans',
      posterPath: 'https://image.tmdb.org/t/p/w500/eeHI5iBSCOxj4HGSOmFM6azBmwb.jpg',
      voteAvg: 7.5
    },
    {
      name: 'Two and a Half Men',
      posterPath: 'https://image.tmdb.org/t/p/w500/A9QDK4OWpv41W27kCv0LXe30k9S.jpg',
      voteAvg: 6.4
    },
    {
      name: 'The Blacklist',
      posterPath: 'https://image.tmdb.org/t/p/w500/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg',
      voteAvg: 7
    },
    {
      name: 'Criminal Minds',
      posterPath: 'https://image.tmdb.org/t/p/w500/7TCwgX7oQKxcWYEhSPRmaHe6ULN.jpg',
      voteAvg: 7.1
    },
    {
      name: 'NCIS',
      posterPath: 'https://image.tmdb.org/t/p/w500/fi8EvaWtL5CvoielOjjVvTr7ux3.jpg',
      voteAvg: 6.7
    },
    {
      name: 'Vikings',
      posterPath: 'https://image.tmdb.org/t/p/w500/94gP9uXNdbypwCLORjeurlad15Z.jpg',
      voteAvg: 7.5
    },
    {
      name: 'Supernatural',
      posterPath: 'https://image.tmdb.org/t/p/w500/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg',
      voteAvg: 7.3
    },
    {
      name: 'Law & Order: Special Victims Unit',
      posterPath: 'https://image.tmdb.org/t/p/w500/6t6r1VGQTTQecN4V0sZeqsmdU9g.jpg',
      voteAvg: 6.5
    },
    {
      name: 'Marvel\'s Agents of S.H.I.E.L.D.',
      posterPath: 'https://image.tmdb.org/t/p/w500/cXiETfFK1BTLest5fhTLfDLRdL6.jpg',
      voteAvg: 6.8
    },
    {
      name: 'Raising Dion',
      posterPath: 'https://image.tmdb.org/t/p/w500/jiXQjwxTJvq3x2Z4zbcvCRwYdo2.jpg',
      voteAvg: 10
    },
    {
      name: 'The Boys',
      posterPath: 'https://image.tmdb.org/t/p/w500/dzOxNbbz1liFzHU1IPvdgUR647b.jpg',
      voteAvg: 8
    },
    {
      name: 'NCIS: Los Angeles',
      posterPath: 'https://image.tmdb.org/t/p/w500/p0doUtM8RhXcAwHs6VmMZMQKpai.jpg',
      voteAvg: 6.8
    },
    {
      name: 'Friends',
      posterPath: 'https://image.tmdb.org/t/p/w500/7buCWBTpiPrCF5Lt023dSC60rgS.jpg',
      voteAvg: 7.9
    },
    {
      name: 'Grey\'s Anatomy',
      posterPath: 'https://image.tmdb.org/t/p/w500/jnsvc7gCKocXnrTXF6p03cICTWb.jpg',
      voteAvg: 6.4
    },
    {
      name: 'Brooklyn Nine-Nine',
      posterPath: 'https://image.tmdb.org/t/p/w500/A3SymGlOHefSKbz1bCOz56moupS.jpg',
      voteAvg: 7.6
    },
    {
      name: 'Mr. Robot',
      posterPath: 'https://image.tmdb.org/t/p/w500/oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg',
      voteAvg: 7.9
    },
    {
      name: 'The Good Doctor',
      posterPath: 'https://image.tmdb.org/t/p/w500/53P8oHo9cfOsgb1cLxBi4pFY0ja.jpg',
      voteAvg: 7.6
    },
    {
      name: 'The I-Land',
      posterPath: 'https://image.tmdb.org/t/p/w500/Muev370hN3vdjGsC1ip1HcWqbT.jpg',
      voteAvg: 5.5
    },
    {
      name: 'The Blacklist',
      posterPath: 'https://image.tmdb.org/t/p/w500/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg',
      voteAvg: 7
    },
    {
      name: 'Pokémon',
      posterPath: 'https://image.tmdb.org/t/p/w500/2pcTUs20ysCdA6DZclaPmGXD6ph.jpg',
      voteAvg: 6.4
    }
  ];

  let randomNum = Math.floor(Math.random() * 33) + 2;
  res.render("index", {
    mostPopular: mostPopular,
    randomNum: randomNum
  });
  // TVShow.find({},{name:1},function(err,docs){
  //
  //   if(err){
  //     console.log(err);
  //   }else{
  //     var arr = ["test"];
  //     docs.forEach(function(doc){
  //           arr.push(doc.name);
  //           });
  //     var data = {local: app.local, docs:arr};
  //     res.render("index",data);
  // docs.forEach(function(doc){
  //   console.log(doc.name);
  // });
  // }
  // });
  // TVShow.find({},function(err,docs){
  // if(err){
  //   console.log(err);
  // }else{
  //   docs.forEach(function(doc){
  //     console.log(doc);
  //   });
  // }
  // }).project({name:1}).limit(10);
});

app.get("/TVShows/:TVShowName", (req, res) => {
  const tvShowName = req.params.TVShowName;

  TVShow.findOne({
    name: tvShowName
  }, function(err, foundTVShow) {
    if (!err) {
      var name = foundTVShow.name;
      var posterPath = (foundTVShow.posterPath == null) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + foundTVShow.posterPath;
      var overview = foundTVShow.overview;
      var numOfSeasons = foundTVShow.seasons.length;
      res.render("tvshowpage", {
        name: encodeURI(name),
        posterPath: foundTVShow.posterPath,
        overview: foundTVShow.overview,
        numOfSeasons: foundTVShow.seasons.length
      });
    }
  });
});

app.get("/TVShows/:TVShowName/:seasonNumber", (req, res) => {
  const tvShowName = req.params.TVShowName;
  const seasonNumber = req.params.seasonNumber;

  TVShow
    .findOne({
      name: tvShowName
    })
    .then((foundTVShow) => {
      if (!foundTVShow) { //if page not exist in db
        return res.status(404).send('Page not found');
      }
      const season = foundTVShow.seasons[seasonNumber];
      const posterPath = (season.posterPath.length <= 5) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + season.posterPath;
      const numOfSeasons = foundTVShow.seasons.length - 1;
      res.render("seasonpage", {
        name: encodeURI(tvShowName),
        posterPath: posterPath,
        seasonName: season.name,
        numOfEpisodes: season.episodes.length,
        seasonNumber: season.seasonNumber,
        numOfSeasons: numOfSeasons
      });

    }).catch((err) => {
      res.status(400).send(err);
    });
  // TVShow.findOne({
  //   name: tvShowName
  // }, function(err, foundTVShow) {
  //   if (!err) {
  //     if(foundTVShow){
  // console.log("looking for seasonNumber"+seasonNumber+"for tvshow: "+tvShowName);
  // var season = foundTVShow.seasons[seasonNumber];
  // var posterPath = (season.posterPath.length <= 5) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + season.posterPath;
  // res.render("seasonpage", {
  //   name: tvShowName,
  //   posterPath: posterPath,
  //   seasonName: season.name,
  //   airDate: season.airDate,
  //   overview: season.overview,
  //   numOfEpisodes: season.episodes.length,
  //   seasonNumber: season.seasonNumber
  //
  //       });
  //     }else{
  //       console.log("Error, no tvshow found");
  //     }
  //   }
  // });
});

function episodefunc(tvShowName, seasonNumber, episodeNumber, overviewHE, res) {
  const episodeNumberPlusOne = episodeNumber + 1;
  const tvShowNameWithoutAmp = tvShowName.replace("&", "");

  const morePhotosURL = "https://www.google.com/search?q=" + tvShowNameWithoutAmp + " Season " + seasonNumber + " Episode " + episodeNumberPlusOne + "&tbm=isch";
  const encodedMorePhotosURL = encodeURI(morePhotosURL);
  const encodedMorePhotosURLWithoutQuot = encodedMorePhotosURL.replace(/'/g, "%27");
  TVShow.findOne({
      name: tvShowName
    })
    .then((foundTVShow) => {
      if (!foundTVShow) { //if page not exist in db
        return res.status(404).send('Page not found2');
      }
      const season = foundTVShow.seasons[seasonNumber];
      const episode = season.episodes[episodeNumber];
      const episodeName = episode.name;
      const posterPath = (episode.stillPath.length <= 5) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + episode.stillPath;
      const overview = (episode.overview.length <= 5) ? "No overview for this episode yet" : episode.overview;
      const episodeImages = episode.episodeImages;
      const guestStars = episode.guestStars;
      const numOfEpisodes = season.episodeCount;
      const fullEpisodeImages = [];
      var firstTime = true;
      episodeImages.forEach(function(image) {
        if (!firstTime) {
          fullEpisodeImages.push("https://image.tmdb.org/t/p/w500" + image);
        } else {
          firstTime = false;
        }
      });
      guestStars.forEach(function(guest) {
        guest.profilePath = (guest.profilePath.length <= 5) ? "" : "https://image.tmdb.org/t/p/w300" + guest.profilePath;
      });
      episodeNumber++;
      if (overview.trim() === overviewHE.trim()) {
        overviewHE = "עדיין אין סיכום בעברית לפרק זה";
      }
      res.render("episodePage", {
        name: encodeURI(tvShowName),
        episodeName: episodeName,
        seasonNumber: seasonNumber,
        episodeNumber: episodeNumber,
        posterPath: posterPath,
        airDate: episode.airDate,
        overview: overview,
        episodeImages: fullEpisodeImages,
        guestStars: guestStars,
        numOfEpisodes: numOfEpisodes,
        overviewHE: overviewHE,
        morePhotosURL: encodedMorePhotosURLWithoutQuot
      });
    }).catch((err) => {
      res.status(400).send(err);
    });

}

app.get("/TVShows/:TVShowName/:seasonNumber/:episodeNumber", (req, res) => {
  const tvShowName = req.params.TVShowName;
  const seasonNumber = req.params.seasonNumber;
  const episodeNumber = req.params.episodeNumber - 1;

  //https://www.google.com/search?q=Game%20Of%20Thrones%20Season%201%20Episode%201&tbm=isch
  //ba020980-f34e-11e9-ae76-758e51850a11
  TVShowHE.findOne({
      originalName: tvShowName
    })
    .then((foundTVShow) => {

      if (!foundTVShow) { //if page not exist in db
        //return res.status(404).send('Page not found1');
        episodefunc(tvShowName, seasonNumber, episodeNumber, "עדיין אין סיכום בעברית לפרק זה", res);
      } else {
        const season = foundTVShow.seasons[seasonNumber];
        const episode = season.episodes[episodeNumber];
        const overviewHE = (episode.overview.length <= 5) ? "עדיין אין סיכום בעברית לפרק זה" : episode.overview;
        episodefunc(tvShowName, seasonNumber, episodeNumber, overviewHE, res);
      }
    }).catch((err) => {
      res.status(400).send(err);
    });



});




const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Server started Successfully");
});
