const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunsConcededByEachTeam = require("./ipl/extraRunsConcededByEachTeam");
const topEconomicalBowlers = require("./ipl/topEconomicalBowlers");
const story = require("./ipl/story");
const numberOfMatchesPlayedInEachVenue = require("./ipl/numberOfMatchesPlayedInEachVenue");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const JSON_OUTPUT_FILE_PATH2 = "./public/data2.json";
function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          let result = matchesPlayedPerYear(matches);
          let result1 = matchesWonByEachTeam(matches);
          let result2 = extraRunsConcededByEachTeam(matches, deliveries);
          let result3 = topEconomicalBowlers(matches, deliveries);
          let result4 = story(matches);
          let result_dynamic = numberOfMatchesPlayedInEachVenue(matches);
          //console.log(result_dynamic);
          saveInfo(result, result1, result2, result3, result4);
          saveNumberOfMatchesPlayedInEachVenue(result_dynamic);
        });
    });
}

function saveInfo(result, result1, result2, result3, result4) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonByEachTeam: result1,
    extraRunsConcededByEachTeam: result2,
    topEconomicalBowlers: result3,
    story: result4,
  };
  const jsonString = JSON.stringify(jsonData);
  //console.log(jsonString);
  fs.writeFile(JSON_OUTPUT_FILE_PATH2, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

function saveNumberOfMatchesPlayedInEachVenue(result_dynamic) {
  const jsonData = {
    numberOfMatchesPlayedInEachVenue: result_dynamic,
  };
  const jsonString = JSON.stringify(jsonData);
  //console.log(jsonString);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
