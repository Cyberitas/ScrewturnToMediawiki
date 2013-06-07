var translateLink = require('./translateLinkCmd.js')
  , LINK_REGEXP = /\[([^|\n]*)\|([^\]\n]*)]/g

function translateScrewTurnMarkupCmd(body) {
    body = body.replace(LINK_REGEXP, replaceLink)
    return body
}

function replaceLink(match, arg1, arg2, offset, body) {
    return '[[' + translateLink(arg1) + '|' + arg2 + ']]'
}

module.exports = translateScrewTurnMarkupCmd