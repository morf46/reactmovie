
/**
 *  Truncate a string if its longer then the specified number of characters.
 *  Truncated strings will end with "..." by default or specified characters.
 * 
 * 
 * @param {string} str    - input string.
 * @param {number} length - max string length.
 * @param {string} [ending="..."] - ending characters.
 */
export function text_truncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};