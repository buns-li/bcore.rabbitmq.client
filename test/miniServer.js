const MiniServer = require('bcore/lib/mini-server-center')

module.exports = function(obj) {
    return MiniServer.load('testApp', 'rabbitmq', {
        protocol: 'amqp',
        host: '127.0.0.1',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: '/'
    }).then(() => {
        MiniServer.injection('testApp', obj)
    })
}