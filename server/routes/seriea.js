var express = require('express');
var router = express.Router();
const requestPromise = require('request-promise')

router.get('/matchday', function(req, res, next) {
    const url =
    {
        uri: 'http://api.football-data.org/v1/competitions/456',
        headers: {
        'X-Response-Control': 'minified',
        'X-Auth-Token': 'ea068c8bc152429c9fdca1afec179924'
        }
    }
    requestPromise.get(url, (error, response, body) => {
        let json = JSON.parse(body);
        return json.currentMatchday;
    })
    .then(nextWeeksGames => {
        let json = JSON.parse(nextWeeksGames);
        console.log(json.currentMatchday);
        return res.send({matchday: json.currentMatchday});
    })
    // .catch(error)
  });

  router.get('/today/:matchdayId', function(req, res, next) {
    const matchdayId = req.params.matchdayId;
    const url =
    {
        uri: `http://api.football-data.org/v1/competitions/456/fixtures?matchday=${matchdayId}`,
        headers: {
        'X-Response-Control': 'minified',
        'X-Auth-Token': 'ea068c8bc152429c9fdca1afec179924'
        }
    }
    requestPromise.get(url, (error, response, body) => {
        let json = JSON.parse(body);
        return json.fixtures;
    })
    .then(nextWeeksGames => {
        let json = JSON.parse(nextWeeksGames);
        return res.send(json.fixtures);
    })
    // .catch(error)
  });  

router.get('/next', function(req, res, next) {
  const url =
  {
      uri: 'http://api.football-data.org/v1/competitions/456/fixtures?timeFrame=n7',
      headers: {
      'X-Response-Control': 'minified',
      'X-Auth-Token': 'ea068c8bc152429c9fdca1afec179924'
      }
  }
  requestPromise.get(url, (error, response, body) => {
      let json = JSON.parse(body);
      return json.fixtures;
  })
  .then(nextWeeksGames => {
      let json = JSON.parse(nextWeeksGames);
      return res.send(json.fixtures);
  })
//   .catch(error)
});

router.get('/prev', function(req, res, next) {
  const url =
  {
      uri: 'http://api.football-data.org/v1/competitions/456/fixtures?timeFrame=p7',
      headers: {
      'X-Response-Control': 'minified',
      'X-Auth-Token': 'ea068c8bc152429c9fdca1afec179924'
      }
  }
  requestPromise.get(url, (error, response, body) => {
      let json = JSON.parse(body);
      return json.fixtures;
  })
  .then(pastWeeksGames => {
      let json = JSON.parse(pastWeeksGames);
      return res.send(json.fixtures);
  })
//   .catch(error)
});

router.get('/today', function(req, res, next) {
  res.json('Hey My Ass Stinks');
});

module.exports = router;