var path = require('path')

ScrewTurnPageFile.LATEST = -1
ScrewTurnPageFile.compare = compare
ScrewTurnPageFile.prototype.isLatest = isLatest
ScrewTurnPageFile.prototype.compareTo = compareTo

function ScrewTurnPageFile(filename) {
    var revision = getRevision(filename)
      , title = getTitle(filename)

    this.__defineGetter__('filename', function() {
        return filename
    })

    this.__defineGetter__('title', function() {
        return title
    })

    this.__defineGetter__('revision', function() {
        return revision
    })
}

function getRevision(filename) {
    var basename = path.basename(filename, '.cs')
      , offset = basename.indexOf('.')
      , revision = offset >= 0 ? parseInt(basename.substr(offset + 1), 10) : ScrewTurnPageFile.LATEST

    return revision
}

function getTitle(filename) {
    var basename = path.basename(filename, 'cs')
      , offset = basename.indexOf('.')
      , title = offset >= 0 ? basename.substr(0, offset) : basename

    return title
}

function isLatest() {
    return this.revision === ScrewTurnPageFile.LATEST
}

function compareTo(item) {
    return compare(this, item)
}

function compare(a, b) {
    if(a.title < b.title)
        return -1
    else if(a.title > b.title)
        return 1
    else if(a.revision === ScrewTurnPageFile.LATEST)
        return 1
    else if(b.revision === ScrewTurnPageFile.LATEST)
        return -1

    return a.revision - b.revision
}

module.exports = ScrewTurnPageFile