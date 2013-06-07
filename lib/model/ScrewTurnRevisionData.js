function ScrewTurnRevisionData(contributor, date, comment) {
    if(!contributor)
        throw new Error('contributor is required')
    if(!date || !(date instanceof Date))
        throw new Error('date is required to be an instance of Date')

    this.__defineGetter__('contributor', function() {
        return contributor
    })

    this.__defineGetter__('date', function() {
        return date
    })

    this.__defineGetter__('comment', function() {
        return comment
    })
}

module.exports = ScrewTurnRevisionData