var stripLineEndings = require('../utils/StrUtil.js').stripLineEndings
  , ScrewTurnRevisionData = require('../model/ScrewTurnRevisionData.js')

function revisionDataParser(data, context) {
    var revdatalist = splitData(data)
    return createRevision(revdatalist)
}

function splitData(data) {
    var revdatalist = data.split('|')
      , lastIndex = revdatalist.length - 1

    revdatalist[lastIndex] = stripLineEndings(revdatalist[lastIndex])

    return revdatalist
}

function createRevision(data) {
    var user = data[0]
      , date = new Date(data[1])
      , comment = data.length > 2 ? data[2] : undefined
      , revision = new ScrewTurnRevisionData(user, date, comment)

    return revision
}

module.exports = revisionDataParser