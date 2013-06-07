var path = require('path')
  , fs = require('fs')
  , ScrewTurnPageFile = require('../model/ScrewTurnPageFile.js')
  , parseScrewTurnWikiPage = require('./parseScrewTurnWikiPageCmd.js')
  , buildMediaWikiImportXml = require('./buildMediaWikiImportXmlCmd.js')

function convertScrewTurnWikiCmd(basedir, outdir) {
    var dirstat = fs.statSync(basedir)
      , pageFiles

    assertPath(dirstat)
    pageFiles = prepareSourceFiles(basedir)
    convertWiki(pageFiles, outdir)
}

function assertPath(stat) {
    if(!stat || !stat.isDirectory())
        throw new Error('directory "' + dir + '" does not exist')
}

function prepareSourceFiles(basedir) {
    var filelist = fs.readdirSync(basedir)
      , pageFileList = filelist.map(function (value) { return new ScrewTurnPageFile(path.join(basedir, value)) })

    pageFileList.sort(ScrewTurnPageFile.compare)

    return pageFileList
}

function convertWiki(pageFiles, destdir) {
    var i = 0
      , max = pageFiles.length
      , currentTitle = pageFiles[0].title
      , numSnapshotsProcessed = 0
      , pageSnapshots = []
      , pageFile

    for(;i < max; i++) {
        pageFile = pageFiles[i]
        if(pageFile.title !== currentTitle)
            processSnapshots()
        pageSnapshots.push(parseScrewTurnWikiPage(pageFiles[i]))
    }
    processSnapshots()

    if(numSnapshotsProcessed != max)
        throw new Error('did not parse all records.' + numSnapshotsProcessed + ' parsed; ' + max + ' expected.')

    function processSnapshots() {
        var xml = buildMediaWikiImportXml(pageSnapshots)
          , lastSnapshot = pageSnapshots[pageSnapshots.length - 1]

        exportMediaWikiXml(lastSnapshot, xml, destdir)
        numSnapshotsProcessed += pageSnapshots.length
        pageSnapshots = []
        currentTitle = pageFile.title
    }
}

function exportMediaWikiXml(snapshot, xml, destDir) {
    var targetFilename = path.join(destDir, path.basename(snapshot.file.filename, '.cs') + '.xml' )
    ensureOutputFolder(destDir)
    fs.writeFileSync(targetFilename, xml)
    // TODO remove this
//    throw new Error('done: ' + targetFilename)
}

function ensureOutputFolder(destDir) {
    if(!fs.existsSync(destDir))
        fs.mkdirSync(destDir)
}

module.exports = convertScrewTurnWikiCmd