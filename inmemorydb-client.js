const {Socket} = require('net')

class InmemoryClient {

    constructor(port) {
        this.port = port
        this.socket = new Socket()
        this.cbMap = {}
        this._onData()
    }

    _onData() {
        this.socket.on('data', (data) => {
            Object.keys(this.cbMap).forEach((key) => {
                if (this.cbMap[key] != null) {
                    this.cbMap[key](data.toString())
                }
            })
        })
    }

    connect() {
        this.socket.connect(this.port)
    }

    _write(obj) {
        this.socket.write(Buffer.from(JSON.stringify(obj) + "\n"))
    }

    set(key, value) {
        this._write({command : 'set', key, value})
    }

    get(key) {
        return new Promise((resolve, reject) => {
            const cbKey = `GET_${new Date().getTime()}`
            this.cbMap[cbKey] = (data) => {
                resolve(data)
            }
            try {
                this._write({command : 'get', key})
              } catch(err) {
                reject(err)
            }
        })
    }

    close() {
        this.socket.end()
    }
}

module.exports = InmemoryClient
