module.exports = function () {
    const randomMovieName = require("random-movie-names");
    const _ = require("lodash");
    return {
        movie: _.times(100, function (n) {
            let year = Math.floor(Math.random() * (58)) + 1963;
            let nominations = Math.random();
            return {
                id: n,
                title: randomMovieName(),
                year: year,
                nominations: Math.floor(nominations * 30),
                wins: Math.floor(nominations * 10)
            }
        })
    }
}