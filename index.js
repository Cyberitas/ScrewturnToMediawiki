var fs = require('fs')
  , path = require('path')
  , convertScrewTurnWiki = require('./lib/commands/convertScrewTurnWikiCmd.js')
  , USAGE_INFO = 'Usage ./' + path.basename(__filename) + ' "pages directory" "destination directory"'
  , options = parseCommandLine()

if(options)
    convertScrewTurnWiki(options.basedir, options.destdir)


function parseCommandLine() {
    if(process.argv.length > 2 && isRequestForHelp(process.argv[2])) {
        console.log(USAGE_INFO)
        return false
    }
    if(process.argv.length !== 4)
        throw new Error(USAGE_INFO)

    return { basedir : path.resolve(__dirname, process.argv[2])
           , destdir : path.resolve(__dirname, process.argv[3])
           }
}

function isRequestForHelp(text) {
    return text === '-?' || text === '/help' || text === 'help' || text === '/?'
}