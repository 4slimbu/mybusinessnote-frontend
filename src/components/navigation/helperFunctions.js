// export  function getLevelUsingSlug(levelSlug, LevelsArray) {
//     return levelsArray[levelSlug];
// }

export function generateAppRelativeUrl(level, section = null, businessOption = null) {
    if (level && !section && !businessOption) {
        return '/level/' + level;
    }

    if (level && section && !businessOption) {
        return '/level/' + level + '/section/' + section;
    }

    if (level && section && businessOption) {
        return '/level/' + level + '/section/' + section + '/business-option/' + businessOption;
    }
}