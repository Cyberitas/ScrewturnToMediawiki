Revision.prototype.validate = validate
Revision.UNKNOWN_REVISION_NUMBER = -1

function Revision(timestamp) {
    var text

    if(!timestamp)
        throw new Error('timestamp is required')

    this.__defineGetter__('timestamp', function() {
        return timestamp
    })

    this.__defineGetter__('text', function() {
        return text
    })

    this.__defineSetter__('text', function(value) {
        if(text)
            throw new Error('text has already been set to this revision')
        text = value
    })

    this.contributor
    this.comment
    this.revisionNumber = Revision.UNKNOWN_REVISION_NUMBER
    this.minor = false
}

function validate() {
    if(!this.contributor)
        throw new Error('contributor is required')
}

module.exports = Revision