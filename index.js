var fs = require('fs')
  , path = require('path')
  , convertScrewTurnWiki = require('./lib/commands/convertScrewTurnWikiCmd.js')
  , basedir = path.join(__dirname, 'data/Pages')
  , destdir = path.join(__dirname, '../out')

convertScrewTurnWiki(basedir, destdir)
