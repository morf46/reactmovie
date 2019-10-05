import * as Math from './libs/MathLib.js';
const data = require('./movies/moviesDB.json');

/**
 * Movie's type.
 * @typedef {object} Movie
 * @property {number} id - Movie's id.
 * @property {string} name - Movie's name.
 * @property {Array<string>} typeList - Movie's types.
 */

/**
 * Returns Movie found by its id.
 *
 * @param {number} id - Movie's id.
 * @returns {Movie|null} - Movie if founded, else returns null.
 */
export function getMovieById(id) {
    return data.find(function (Movie) {
        return Movie.id === id;
    }) || null;
}


/**
* Returns Movie found by its title.
*
* @param {string} name - Movie's title.
* @returns {Movie|null} - Movie if founded, else returns null.
*/
export function getMovieByTitle(name) {
    return data.find(function (Movie) {
        return Movie.title === name;
    }) || null;
}

/**
 * Returns movies sorted by Rating, optional filters by genre
 * 
 * @param {bool} ascending - Return movies in ascending order
 * @param {number|Array} [FilterGenreIDs] - Genre IDs to filter
 */
export function getMoviesRating(ascending, FilterGenreIDs) {
    let LocalData = data;

    if (FilterGenreIDs !== undefined && FilterGenreIDs.length > 0) {

        LocalData = data.filter(movie => FilterGenreIDs.every(GenreID => movie.genre_ids.includes(GenreID)));
    }

    return LocalData.sort((a, b) => {
        if (ascending === true) {

            return a.vote_average - b.vote_average;
        } else {
            return b.vote_average - a.vote_average;
        }
    });
}

/**
* Returns Movie at random.
*
* 
* @returns {Movie|null} - The Random Movie.
*/
export function getMovieAtRandom() {



    var rndId = Math.getRandomInt(0, data.length);

    return data[rndId];

}

/**
 * Returns Popular Movies.
 * 
 * @returns {Movie|Array} - Movie Array
 */
export function getPopularMovies() {

    var LocalArray = [];

    for (let i = 0; i < 5; i++) {
        LocalArray.push(getMovieAtRandom());
    }

    return LocalArray;

}

