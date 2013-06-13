var translateLink = require('./translateLinkCmd.js')
  , LINK_REGEXP = /\[([^|\n]*)\|([^\]\n]*)]/g
  , TOP_REGEXP = /{(TOP)}/gi
  , TOC_REGEXP = /{(TOC)}/gi
  , ESC_REGEXP = /<esc>/g
  , ESCEND_REGEXP = /<\/esc>/g
  , IMG_REGEXP = /<img[^>]*>/g
  , IMG_SRC_REGEXP = /src=\"([^;]*);File=([^\"]*)\"/
  , IMG_WIDTH_REGEXP = /width=\"([0-9]*)\"/

function translateScrewTurnMarkupCmd(body) {
    body = body.replace(LINK_REGEXP, replaceLink)
    body = body.replace(TOP_REGEXP, '[[#top|Top]]')
    body = body.replace(TOC_REGEXP, '__TOC__')
    body = body.replace(ESC_REGEXP, '__TOC__')
    body = body.replace(ESCEND_REGEXP, '__TOC__')
    body = body.replace(IMG_REGEXP, replaceImg)
    return body
}

function replaceLink(match, arg1, arg2, offset, body) {
    return '[[' + translateLink(arg1) + '|' + arg2 + ']]'
}

function replaceImg(match, offset, body) {
    var srcResult = match.match(IMG_SRC_REGEXP)
      , imageName = srcResult ? srcResult[2] : undefined
      , widthResult = match.match(IMG_WIDTH_REGEXP)
      , width = widthResult ? ('|' + widthResult[1] + 'px') : ''
      , replacement = imageName ? '[[Image:' + imageName + width + ']]' : match

    return replacement
}

module.exports = translateScrewTurnMarkupCmd