UniqueIndex.prototype.has = has
UniqueIndex.prototype.hasIndex = hasIndex
UniqueIndex.prototype.getValue = getValue
UniqueIndex.prototype.add = add
UniqueIndex.prototype.getKey = getKey

UniqueIndex.getPropertyHash = getPropertyHashingFunction

function UniqueIndex(hashFunc) {
    this.hashingFunc = hashFunc
    this._map = {}
}

function getKey(value) {
    return this.hashingFunc(value)
}

function getValue(key) {
    return this._map[key]
}

function has(value) {
    return this._map.hasOwnProperty(this.getKey(value))
}

function hasIndex(key) {
    return this._map.hasOwnProperty(key)
}

function add(value) {
    var key = this.getKey(value)
    if(this.has(value))
        throw new Error('index "' + key + '" exists')
    return this._map[key] = value
}

function getPropertyHashingFunction(propName) {
    return function (value) {
        return value[propName]
    }
}

module.exports = UniqueIndex