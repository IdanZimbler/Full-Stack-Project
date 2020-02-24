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

let moduleArr = require('./public/js/mostpopular.js');
let mostPopularArr = moduleArr.array;
app.get("/", function(req, res) {

  let randomNum = Math.floor(Math.random() * 33) + 2;
  res.render("index", {
    mostPopular: mostPopularArr,
    randomNum: randomNum
  });
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

function loadZero(n) {
    return (n < 10) ? '0' + n.toString() : n.toString();
}

function episodefunc(tvShowName, seasonNumber, episodeNumber, overviewHE, res) {

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

      const episodeNumberPlusOne = episodeNumber + 1;
      const tvShowNameWithoutAmp = tvShowName.replace("&", "");
      const morePhotosURL = "https://www.google.com/search?q=" +
       tvShowNameWithoutAmp + " S" + loadZero(seasonNumber) + "E" + loadZero(episodeNumberPlusOne) +" "+ episodeName + "&tbm=isch";
      const encodedMorePhotosURL = encodeURI(morePhotosURL);
      const encodedMorePhotosURLWithoutQuot = encodedMorePhotosURL.replace(/'/g, "%27");

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
