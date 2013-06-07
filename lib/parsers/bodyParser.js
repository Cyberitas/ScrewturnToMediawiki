var convertLineEndings = require('../utils/StrUtil.js').convertLineEndings

function bodyParser(data, context) {
    var data = convertLineEndings(data.trim())

    context.body = data
}

module.exports = bodyParser