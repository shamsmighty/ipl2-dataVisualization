function numberOfMatchesPlayedInEachVenue(matches) {
    const result = {};
    for (let match of matches) {
        const season = match.season;
        const venue = match.venue;
        if (!result[season]) {
            result[season] = {};
        } else {
            if (result[season][venue]) {
                result[season][venue] += 1;
            } else {
                result[season][venue] = 1;
            }
        }
    }
    return result;
}
module.exports = numberOfMatchesPlayedInEachVenue;