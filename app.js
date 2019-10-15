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
mongoose.connect("mongodb+srv://admin-idan:"+mongodbpw+"@cluster0-gejzc.mongodb.net/TVShowsDB?retryWrites=true&w=majority", {
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


app.get("/", function(req, res) {
  // var mostPopular2 = ["62286", "60735", "456", "1622", "1412",
  //   "1434", "62104", "62688", "60625", "60708",
  //   "46298", "46952", "62273", "1416", "1403",
  //   "69050", "2190", "2734", "62560", "17610"
  // ];
  // var mostPopular2 = [
  //   "2691",
  //   "77199",
  //   "1399",
  //   "73223",
  //   "48891",
  //   "4057",
  //   "63174",
  //   "93392",
  //   "71712",
  //   "46952",
  //   "4614",
  //   "79460",
  //   "76479",
  //   "90755",
  //   "60572",
  //   "44217",
  //   "75450",
  //   "1668"
  // ];
  // mostPopular2.forEach((id) => {
  //   TVShow.findOne({
  //     id: id
  //   }, function(err, foundTVShow) {
  //     if (!err) {
  //       var name = foundTVShow.name;
  //       var posterPath = (foundTVShow.posterPath == null) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + foundTVShow.posterPath;
  //       const obj = {
  //         name,
  //         posterPath
  //       };
  //       console.log(obj);
  //     }
  //   });
  // });

  var mostPopular = [{
      name: 'Fear the Walking Dead',
      posterPath: 'https://image.tmdb.org/t/p/w500/lZMb3R3e5vqukPbeDMeyYGf2ZNG.jpg'
    },
    {
      name: 'The Flash',
      posterPath: 'https://image.tmdb.org/t/p/w500/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg'
    },
    {
      name: 'Arrow',
      posterPath: 'https://image.tmdb.org/t/p/w500/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg'
    },
    {
      name: 'Supernatural',
      posterPath: 'https://image.tmdb.org/t/p/w500/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg'
    },
    {
      name: 'The Simpsons',
      posterPath: 'https://image.tmdb.org/t/p/w500/yTZQkSsxUFJZJe67IenRM0AEklc.jpg'
    },
    {
      name: 'The Seven Deadly Sins',
      posterPath: 'https://image.tmdb.org/t/p/w500/gxTojpKEOtue85EEFlozwRbDXwJ.jpg'
    },
    {
      name: 'Rick and Morty',
      posterPath: 'https://image.tmdb.org/t/p/w500/qJdfO3ahgAMf2rcmhoqngjBBZW1.jpg'
    },
    {
      name: 'Family Guy',
      posterPath: 'https://image.tmdb.org/t/p/w500/gBGUL1UTUNmdRQT8gA1LUV4yg39.jpg'
    },
    {
      name: 'Supergirl',
      posterPath: 'https://image.tmdb.org/t/p/w500/4ka8vAzAFUZFKxWyfGfwVcSXuZo.jpg'
    },
    {
      name: 'Food Wars!: Shokugeki no Soma',
      posterPath: 'https://image.tmdb.org/t/p/w500/oSK6MoEScP9V4XF0cPvJ0a66urY.jpg'
    },
    {
      name: 'Gotham',
      posterPath: 'https://image.tmdb.org/t/p/w500/4XddcRDtnNjYmLRMYpbrhFxsbuq.jpg'
    },
    {
      name: 'Hunter x Hunter',
      posterPath: 'https://image.tmdb.org/t/p/w500/yWBcBIO9OrF3E85C5Arols6QNnG.jpg'
    },
    {
      name: 'Grey\'s Anatomy',
      posterPath: 'https://image.tmdb.org/t/p/w500/jnsvc7gCKocXnrTXF6p03cICTWb.jpg'
    },
    {
      name: 'Mr. Robot',
      posterPath: 'https://image.tmdb.org/t/p/w500/oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg'
    },
    {
      name: 'Riverdale',
      posterPath: 'https://image.tmdb.org/t/p/w500/4X7o1ssOEvp4BFLim1AZmPNcYbU.jpg'
    },
    {
      name: 'The Blacklist',
      posterPath: 'https://image.tmdb.org/t/p/w500/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg'
    },
    {
      name: 'South Park',
      posterPath: 'https://image.tmdb.org/t/p/w500/v9zc0cZpy5aPSfAy6Tgb6I1zWgV.jpg'
    },
    {
      name: 'Marvel\'s Agents of S.H.I.E.L.D.',
      posterPath: 'https://image.tmdb.org/t/p/w500/cXiETfFK1BTLest5fhTLfDLRdL6.jpg'
    },
    {
      name: 'Law & Order: Special Victims Unit',
      posterPath: 'https://image.tmdb.org/t/p/w500/6t6r1VGQTTQecN4V0sZeqsmdU9g.jpg'
    },
    {
      name: 'NCIS: Los Angeles',
      posterPath: 'https://image.tmdb.org/t/p/w500/p0doUtM8RhXcAwHs6VmMZMQKpai.jpg'
    },
    {
      name: 'Two and a Half Men',
      posterPath: 'https://image.tmdb.org/t/p/w500/A9QDK4OWpv41W27kCv0LXe30k9S.jpg'
    },
    {
      name: 'Game of Thrones',
      posterPath: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg'
    },
     {
      name: 'Brooklyn Nine-Nine',
      posterPath: 'https://image.tmdb.org/t/p/w500/A3SymGlOHefSKbz1bCOz56moupS.jpg'
    },
     {
      name: 'Raising Dion',
      posterPath: 'https://image.tmdb.org/t/p/w500/jiXQjwxTJvq3x2Z4zbcvCRwYdo2.jpg'
    },
     {
      name: 'Lucifer',
      posterPath: 'https://image.tmdb.org/t/p/w500/1sBx2Ew4WFsa1YY32vlHt079O03.jpg'
    },
     {
      name: 'Criminal Minds',
      posterPath: 'https://image.tmdb.org/t/p/w500/7TCwgX7oQKxcWYEhSPRmaHe6ULN.jpg'
    },
     {
      name: 'The Good Doctor',
      posterPath: 'https://image.tmdb.org/t/p/w500/53P8oHo9cfOsgb1cLxBi4pFY0ja.jpg'
    },
     {
      name: 'Legacies',
      posterPath: 'https://image.tmdb.org/t/p/w500/rb64COqdpRRfWOc6gWTfC7WxzXP.jpg'
    },
     {
      name: 'The Boys',
      posterPath: 'https://image.tmdb.org/t/p/w500/dzOxNbbz1liFzHU1IPvdgUR647b.jpg'
    },
     {
      name: 'The I-Land',
      posterPath: 'https://image.tmdb.org/t/p/w500/Muev370hN3vdjGsC1ip1HcWqbT.jpg'
    },
     {
      name: 'Titans',
      posterPath: 'https://image.tmdb.org/t/p/w500/eeHI5iBSCOxj4HGSOmFM6azBmwb.jpg'
    },
     {
      name: 'Vikings',
      posterPath: 'https://image.tmdb.org/t/p/w500/94gP9uXNdbypwCLORjeurlad15Z.jpg'
    },
     {
      name: 'Friends',
      posterPath: 'https://image.tmdb.org/t/p/w500/7buCWBTpiPrCF5Lt023dSC60rgS.jpg'
    },
     {
      name: 'NCIS',
      posterPath: 'https://image.tmdb.org/t/p/w500/fi8EvaWtL5CvoielOjjVvTr7ux3.jpg'
    },
     {
      name: 'The Blacklist',
      posterPath: 'https://image.tmdb.org/t/p/w500/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg'
    },
     {
      name: 'Pokémon',
      posterPath: 'https://image.tmdb.org/t/p/w500/2pcTUs20ysCdA6DZclaPmGXD6ph.jpg'
    }
  ];


  res.render("index", {
    mostPopular: mostPopular
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
        name: name,
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

      res.render("seasonpage", {
        name: tvShowName,
        posterPath: posterPath,
        seasonName: season.name,
        numOfEpisodes: season.episodes.length,
        seasonNumber: season.seasonNumber
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

app.get("/TVShows/:TVShowName/:seasonNumber/:episodeNumber", (req, res) => {
  const tvShowName = req.params.TVShowName;
  const seasonNumber = req.params.seasonNumber;
  let episodeNumber = req.params.episodeNumber - 1;

  TVShow.findOne({
      name: tvShowName
    })
    .then((foundTVShow) => {
      if (!foundTVShow) { //if page not exist in db
        return res.status(404).send('Page not found');
      }
      const season = foundTVShow.seasons[seasonNumber];
      const episode = season.episodes[episodeNumber];
      const episodeName = episode.name;
      const posterPath = (episode.stillPath.length <= 5) ? "/img/coming-soon.png" : "https://image.tmdb.org/t/p/w500" + episode.stillPath;
      const overview = (episode.overview.length <= 5) ? "No overview for this episode yet" : episode.overview;
      const episodeImages = episode.episodeImages;
      const guestStars = episode.guestStars;
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
      res.render("episodePage", {
        name: tvShowName,
        episodeName: episodeName,
        seasonNumber: seasonNumber,
        episodeNumber: episodeNumber,
        posterPath: posterPath,
        airDate: episode.airDate,
        overview: overview,
        episodeImages: fullEpisodeImages,
        guestStars: guestStars
      });
    }).catch((err) => {
      res.status(400).send(err);
    });
});





app.listen(3000, function() {
  console.log("Server started Successfully");
});
