import * as Math from './libs/MathLib.js';
import Nedb from 'nedb-promises';


const data = require('./movies/moviesDB.json');

var db = Nedb.create({ filename: 'deleteme.db' });
db.on('load', (db) => {
    InitDatabase();

});
db.load();
db.ensureIndex({ fieldName: 'id', unique: true });

/**
 * Initial database Fill.
 * Does nothing if IndexedDB has data.
 */
export function InitDatabase() {
    db.find({ initialData: true })
        .then(docs => {
            if (docs.length === 0) {

                db.insert(data)
                    .then(docs => {
                        db.insert({ initialData: true })
                            .then(function () {

                            })

                    });
            }
        });
}

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
* @returns {Movie|null} - Movie if found, else returns null.
*/
export async function getMovieByTitle(name) {
    var regex = new RegExp(name, "gi");
    return data.find(function (Movie) {
        return Movie.title.match(regex);
    }) || null;
}

/**
 * Returns movies sorted by Rating, optional filters by genre
 * 
 * @param {bool} ascending - Return movies in ascending order
 * @param {number|Array} [FilterGenreIDs] - Genre IDs to filter
 * @param {string} [SearchTerm] - Search Term
 * 
 * @returns {Movie|Array} - Returns Movie Array.
 */
export async function getMoviesRating(ascending, FilterGenreIDs, SearchTerm) {
    var GenreQuery = {};
    var SearchTermQuery = {};
    var ExludeQuery = { initialData: { $exists: false } }



    if (FilterGenreIDs !== null && FilterGenreIDs !== undefined && FilterGenreIDs.length > 0) {

        /**
         * Nedb does not implement $all query.
         * expand genrefilter and build $and query.
         * { 
         *   $and: 
         *      [
         *       {"genre_ids": 1},
         *       {"genre_ids": 2},
         *       {"genre_ids": 3}
         *  ]
         *}
         */

        const expandgenrefilter = FilterGenreIDs.map(Genreid => { return { genre_ids: Genreid } });
        GenreQuery = { $and: expandgenrefilter }

    }

    if (SearchTerm !== null && SearchTerm !== undefined && SearchTerm.length > 2) {
        var regex = new RegExp(SearchTerm, "gi");
        SearchTermQuery = { title: regex };
    }

    // Sort oder ascending == 1 || descending ==-1
    const sortOrder = ascending ? 1 : -1;

    let LocalData = await db.find({ $and: [GenreQuery, SearchTermQuery, ExludeQuery] }).sort({ popularity: -1, vote_average: sortOrder, vote_count: -1 }).exec();

    return LocalData;

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

/**
 * Append new movies to database
 * 
 * @param {Movie|Array} MovieArray  - Movie array to append
 */

export function AppendNewMovies(MovieArray) {

    MovieArray.forEach(element => {
        db.insert(element);
    });
}

/**
 * Updates Movies details to local database.
 * 
 * @param {Movie} Movie 
 */
export async function UpdateMovieDetails(Movie) {

    var FoundData = await db.findOne({ id: Movie.id });
    if (FoundData) {

        const MergedData = { ...FoundData, ...Movie };
        await db.update({ id: Movie.id }, MergedData, { upsert: true });
        return MergedData;

    } else {
        //incase movie dont exist fill genre_ids array and insert
        Movie['genre_ids'] = Movie.genres.map(genre => genre.id);
        await db.insert(Movie);
        return Movie;
    }
}



