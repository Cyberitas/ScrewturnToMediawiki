var MATCH_ALL_SPACES = / /g

function translateLinkCmd(title) {
    if(title === 'MainPage')
        return 'Main_Page'
    return title.replace(MATCH_ALL_SPACES, '_')
}

module.exports = translateLinkCmd