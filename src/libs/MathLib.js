
/**
 * Returns random integer, maximum is exclusive and the minimum is inclusive.
 * 
 * @param {number} min - Minimum - inclusive
 * @param {number} max - Maximum - exclusive
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}







