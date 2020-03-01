class InMemoryDb {

    constructor() {
        this.dataMap = new Map()
        this.listDataMap = new Map()
        this.setDataMap = new Map()
    }

    set(key, value) {
        this.dataMap.set(key, value)
    }

    get(key) {
        if (this.dataMap.has(key)) {
            return this.dataMap.get(key)
        } else {
            throw new Error("key doesn't exist")
        }
    }

    ladd(key, value) {
        if (!this.listDataMap.has(key)) {
            this.listDataMap.set(key, [])
        }
        this.listDataMap.get(key).push(value)
    }

    lgetall(key) {
        if (this.listDataMap.has(key)) {
            return this.listDataMap.get(key)
        } else {
            throw new Error("key doesn't exist")
        }
    }

    sadd(key, value) {
        if (!this.setDataMap.has(key)) {
            this.setDataMap.set(key, new Set())
        } else {
            this.setDataMap.get(key).add(10)
        }
    }

    sgetall(key) {
      if (this.setDataMap.has(key)) {
          return this.setDataMap.get(key)
      } else {
          throw new Error("key doesn't exist")
      }
    }
}

const inMemoryDb = new InMemoryDb()

module.exports = inMemoryDb
