IndexedList.prototype.insert = insert
IndexedList.prototype.has = has
IndexedList.prototype.selectAll = selectAll
IndexedList.prototype.select = select

function IndexedList(primaryIndex) {
    var self = this

    this._list = []
    this._index = primaryIndex

    this.__defineGetter__('length', function() {
        return this._list.length
    })

    this.__defineGetter__('last', function() {
        var list = self._list
          , last = self._list.length - 1
        return last >= 0 ? list[last] : undefined
    })
}

function insert(value) {
    if(this.has(value))
        throw new Error('value exists')

    this._list.push(value)
    this._index.add(value)
}

function has(value) {
    return this._index.has(value)
}

function hasKey(key) {
    return this._index.hasIndex(key)
}

function select(key) {
    return this._index.getValue(key)
}

function selectAll() {
    return Array.prototype.slice.call(this._list)
}

module.exports = IndexedList