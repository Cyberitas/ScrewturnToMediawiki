function ScrewTurnHeader(title, revisionData) {
    if(!title)
        throw new Error('title is required')
    if(!revisionData)
        throw new Error('revisionData is required')

    this.__defineGetter__('title', function() {
        return title
    })

    this.__defineGetter__('revisionData', function() {
        return revisionData
    })
}

module.exports = ScrewTurnHeader