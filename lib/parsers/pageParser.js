var headerParser = require('./headerParser.js')
  , bodyParser = require('./bodyParser.js')
  , pageDelim = '##PAGE##'

function pageParser(data, context) {
    var pageDelimPos = data.indexOf(pageDelim)

    if(pageDelimPos < 0)
        throw new Error('invalid Screwturn wiki page: ' + context.file.filename)

    headerParser(data.substr(0, pageDelimPos), context)
    bodyParser(data.substr(pageDelimPos + pageDelim.length), context)
}

module.exports = pageParser