var PARSE_MAP = { '[' : parseLink }
  , MATCH_ALL_SPACES = / /g
  , LINK_REGEXP = /\[([^|\n]*)\|([^\]\n]*)]/g

function translateScrewTurnMarkupCmd(body) {
    body = body.replace(LINK_REGEXP, replaceLink)
    return body
}

function replaceLink(match, arg1, arg2, offset, body) {
    if(arg1 === 'MainPage')
        arg1 = 'Main_Page'
    arg1 = arg1.replace(MATCH_ALL_SPACES, '_')
    return '[[' + arg1 + '|' + arg2 + ']]'
}

function parseBody(body) {
    var i = 0, max = strlenbody.length
        , context = { body : body, off : i, max : max}
        , char

    for(i; i < max; i++) {
        char = body.charAt(i)
        if(PARSE_MAP.hasOwnProperty(char))
            i = PARSE_MAP[char](context)
    }

    return context.body
}

function parseLink(context) {
    var start = context.off
      , i = off + 1
      , char

    for(i; i < context.max && char !== '\n'; i++) {
        char = body.charAt(i)
        if(char === '\n') {

        }
    }
}

module.exports = translateScrewTurnMarkupCmd