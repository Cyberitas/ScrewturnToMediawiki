var stripLineEndings = require('../utils/StrUtil.js').stripLineEndings
  , revisionDataParser = require('./revisionDataParser.js')
  , ScrewTurnHeader = require('../model/ScrewTurnHeader.js')

function headerParser(data, context) {
    var firstEOL = data.indexOf('\n')
      , title = stripLineEndings(data.substr(0, firstEOL))
      , revisionData = revisionDataParser(data.substr(firstEOL + 1))

    context.header = new ScrewTurnHeader(title, revisionData)
}

module.exports = headerParser