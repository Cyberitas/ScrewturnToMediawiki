var ScrewTurnPageFile = require('./ScrewTurnPageFile.js')
  , ScrewTurnHeader = require('./ScrewTurnHeader.js')

function ScrewTurnPageSnapshot(file, header, body) {
    if(!file || !(file instanceof ScrewTurnPageFile))
        throw new Error('file must be an instance of ScrewTurnPageFile')
    if(!header || !(header instanceof ScrewTurnHeader))
        throw new Error('header must be an instance of ScrewTurnHeader')

    this.__defineGetter__('file', function() {
        return file
    })

    this.__defineGetter__('header', function() {
        return header
    })

    this.__defineGetter__('body', function() {
        return body
    })
}

module.exports = ScrewTurnPageSnapshot