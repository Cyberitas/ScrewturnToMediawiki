var builder = require('xmlbuilder')
  , path = require('path')
  , ScrewTurnPageSnapshot = require('../model/ScrewTurnPageSnapshot.js')
  , translateScrewTurnMarkup = require('./translateScrewTurnMarkupCmd.js')
  , INVALID_CHARS = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/g


function createXmlSkeleton() {
    var xml = builder.create('mediawiki')
    xml.att('xml:lang', 'en')
    xml.ele('page')
    return xml
}

function addRevisionData(parent, snapshot) {
    var revisionEle = parent.ele('revision')

    try {
        revisionEle.ele('timestamp', snapshot.header.revisionData.date.toISOString())
        revisionEle.ele('contributor')
                   .ele('username', snapshot.header.revisionData.contributor)
        if(snapshot.header.revisionData.comment)
            revisionEle.ele('comment', snapshot.header.revisionData.comment)
        revisionEle.ele('text', translateScrewTurnMarkup(snapshot.body))
    } catch(e) {
        // back out
        revisionEle.remove()
        throw e
    }
}

function cleanScrewTurnPageSnapshot(snapshot) {
    cleanBody = snapshot.body.replace(INVALID_CHARS, '')
    return new ScrewTurnPageSnapshot(snapshot.file, snapshot.header, cleanBody)
}

function tryAddingCleanRevisionData(parent, snapshot) {
    var cleanSnapshot = cleanScrewTurnPageSnapshot(snapshot)

    try {
        addRevisionData(parent, cleanSnapshot)
    } catch(e) {
        console.error('failed to build ' + snapshot.file.filename)
        throw e
    }
}

function tryAddingRevisionData(pageElement, snapshot) {
    try {
        addRevisionData(pageElement, snapshot)
    } catch(e) {
        console.warn('adding "' + snapshot.file.filename + '" failed. Attempting to clean data and try again.')
        tryAddingCleanRevisionData(pageElement, snapshot)
    }
}

function findPageElement(xml) {
    return xml.root().children[0]
}

function addTitle(pageElement, snapshot) {
    var title = path.basename(snapshot.file.filename, '.cs')
    if(title === 'MainPage')
        title = 'Main_Page'
    pageElement.children[0].insertBefore('title', title)
}

function buildMediaWikiImportXmlCmd(snapshots) {
    var xml = createXmlSkeleton()
      , pageElement = findPageElement(xml)

    snapshots.forEach(function(snapshot, index, list) {
        tryAddingRevisionData(pageElement, snapshot)
        if(index === list.length - 1)
            addTitle(pageElement, snapshot)
    })

    return xml.end({ pretty: true})
}


module.exports = buildMediaWikiImportXmlCmd