import * as Math from './MathLib.js';
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
 * Returns movies sorted by Rating
 * 
 * @param {bool} ascending - Return movies in ascending order
 */
export function getMoviesRating(ascending) {

    return data.sort((a, b) => {
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

