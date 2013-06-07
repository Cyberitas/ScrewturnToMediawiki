var fs = require('fs')
  , path = require('path')
  , pageParser = require('../parsers/pageParser.js')
  , ParserContext = require('../model/ParserContext.js')
  , ScrewTurnPageSnapshot = require('../model/ScrewTurnPageSnapshot.js')

function parseScrewTurnWikiPagesCmd(file) {
    assertPage(file)
    return parsePage(file)
}

function assertPage(file) {
    if(!file)
        throw new Error('file is required')
    if(!fs.existsSync(file.filename))
        throw new Error('ScrewTurnWikiPage "' + file.filename + '" does not exist')
}

function parsePage(file) {
    var srcdata = loadFile(file.filename)
      , context = new ParserContext(srcdata, file)

    pageParser(srcdata, context)
    return new ScrewTurnPageSnapshot(context.file, context.header, context.body)
}

function loadFile(filename) {
    return fs.readFileSync(filename).toString()
}

module.exports = parseScrewTurnWikiPagesCmd