function RevisionList(title) {
    var list = []

    this.__defineGetter__('title', function() {
        return title
    })

    this.__defineGetter__('list', function() {
        return list
    })
}

module.exports = RevisionList