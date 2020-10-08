const express = require("express");
const fs = require("fs");
const app = express();
const File = JSON.parse(fs.readFileSync("./public/data.json", 'utf-8'));
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/season/:year", (req, res) => {
    const year = req.params.year;
    //console.log("server year:",year);
    const data = File.numberOfMatchesPlayedInEachVenue[year];
    //console.log("server data",data);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}..... `);
});