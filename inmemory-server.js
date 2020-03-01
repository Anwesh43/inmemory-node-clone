const net = require('net')
const inmemoryDb = require('./memdb')
const port = process.argv.length == 3 ? parseInt(process.argv[2]) : 4272

const commandOperationMap = {
    set(obj) {
        const {key, value} = obj
        inmemoryDb.set(key, value)
    },

    get(obj) {
        const {key} = obj
        return inmemoryDb.get(key)
    },

    ladd(obj) {
        const {key, value} = obj
        inmemoryDb.ladd(key, value)
    },

    lgetall(obj) {
        const {key} = obj
        return inmemoryDb.lgetall(key)
    },

    sadd(obj) {
        const {key, value} = obj
        inmemoryDb.sadd(key, value)
    },

    sgetall(obj) {
        const {key} = obj
        inmemoryDb.sgetall(key)
    }
}

class InmemoryServer {

    constructor() {
        this.server = net.createServer()

    }
    handleConnection() {
        this.server.on('connection', (socket) => {
            socket.on('data', (data) => {
                const dataJSON = JSON.parse(data.toString())
                const {command} = dataJSON
                console.log(`operation requested ${command}`)
                const out = commandOperationMap[command](dataJSON)
                if (out) {
                    socket.write(Buffer.from(`${out}`))
                }
            })
        })
    }

    start() {
      this.server.listen(port, () => {
          console.log(`started listening on port ${port}`)
      }, () => {
          console.log(`already listeinging on ${port}`)
      })
    }
}

const inmemoryServer = new InmemoryServer()
inmemoryServer.handleConnection()
inmemoryServer.start()
