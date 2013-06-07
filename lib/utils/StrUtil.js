var lineEndingRegEx = /(\r\n|\n|\r)/gm

function stripLineEndingsCmd(str) {
    return str.replace(lineEndingRegEx,'');
}

function hasLineEndings(str) {
    return lineEndingRegEx.test(str)
}

function convertLineEndings(str, ending) {
    ending = ending || '\n'
    return str.replace(lineEndingRegEx, ending)
}

exports['stripLineEndings'] = stripLineEndingsCmd
exports['hasLineEndings'] = hasLineEndings
exports['convertLineEndings'] = convertLineEndings