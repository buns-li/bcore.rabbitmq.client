module.exports = class Processor {
    constructor() {}

    returnProperty() {
        return this.msrv
    }

    async publish(queueName, msg) {
        return await this.msrv.rabbitmq.publish(queueName, msg)
    }
}