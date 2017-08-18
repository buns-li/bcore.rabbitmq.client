const bcore = require('bcore')

const confSymbol = Symbol('rabbitmq#conf')

const amqp = require('amqplib')

bcore.on('rabbitmq', {
    protocol: process.env.BCORE_RABBITMQ_PROTOCOL || 'amqp',
    host: process.env.BCORE_RABBITMQ_HOST || '127.0.0.1',
    port: process.env.BCORE_RABBITMQ_PORT || 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/'
}, function() {

    this.__init = function(options) {
        this[confSymbol] = options
    }

    /**
     * 推送消息至rabbitmq服务器队列中
     *
     * @param {String} queueName 队列名称
     * @param {String} msg 待发布的数据
     *
     * @return {Promise}
     */
    this.publish = function(queueName, msg) {

        let conf = this[confSymbol]

        return amqp.connect(conf, { vhost: conf.vhost })
            .then(conn => {
                return conn
                    .createChannel()
                    .then(ch => {
                        return ch
                            .assertQueue(queueName, { durable: false })
                            .then(qok => {

                                ch.sendToQueue(queueName, Buffer.from ? Buffer.from(msg) : new Buffer(msg))

                                return qok
                            })
                    })
            })
    }
})