/**
 * Transform 'slug_string' or 'camelCaseString' or 'any type of string' to 'Capitalized Words'
 *
 * @param string
 * @returns {string}
 */
export function toCapitalizedWords(string) {
    const newString = string.replace(/([A-Z])/g, ' $1')
        .replace(/([_])/g, ' ');

    return firstOfEachWordToUppercase(newString);
}

/**
 * Capitalize first letter of each words in a string
 *
 * @param str
 * @returns {string}
 */
export function firstOfEachWordToUppercase(str)
{
    let array = str.split(' ');
    let newArray = [];

    for(let x = 0; x < array.length; x++){
        newArray.push(array[x].charAt(0).toUpperCase() + array[x].slice(1));
    }

    return newArray.join(' ');
}
