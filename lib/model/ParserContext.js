var ScrewTurnPageRevision = require('./ScrewTurnPageSnapshot.js')

function ParserContext(document, file) {
    if(!document)
        throw new Error('document data is required')

    this.__defineGetter__('document', function() {
        return document
    })

    this.__defineGetter__('file', function() {
        return file
    })

    this.header
    this.body
}

module.exports = ParserContext