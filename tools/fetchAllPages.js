/**
 * Query MediaWiki's api to get a list of all pages
 * usage: node ./fetchAllPages "base mediawiki URL"
 * @link http://www.mediawiki.org/wiki/API:Main_page
 */

var http = require('http')
  , MATCH_ALL_SPACES = / /g
  , options = { host: process.argv[2]
              , port: 80
              , path: '/api.php?action=query&list=allpages&format=json&aplimit=500'
              , method: 'GET'
              }
  , data = ''

var req = http.request(options, onHTTPOpen)
req.on('error', onError)
req.on('close', onDone)
req.end()

function onHTTPOpen(res) {
    console.log('STATUS: ' + res.statusCode)
    console.log('HEADERS: ' + JSON.stringify(res.headers))
    res.setEncoding('utf8')
    res.on('data', onResponseData)
}

function onResponseData(chunk) {
    if(!chunk)
        return
    data += chunk
}

function onError(e) {
    console.log('problem with request: ' + e.message)
}

function onDone() {
    var allpages = JSON.parse(data).query.allpages
    allpages.map(function (page) {
        var title = page.title
        title = title.replace(MATCH_ALL_SPACES, '_')

        console.log('http://' + options.host + "/index.php/" + title)
    })
}