const InMemoryClient = require('./inmemorydb-client')

const inmemoryClient = new InMemoryClient(4272)

inmemoryClient.connect()

inmemoryClient.set('B', 100)


setTimeout(() => {
    inmemoryClient.get('B').then((data) => {
        console.log(data)
        setTimeout(() => {
            inmemoryClient.close()
        }, 3000)
    })
}, 1000)
