const Should = require('should')

const miniServer = require('./miniServer')

const Processor = require('./processor')

let obj = new Processor()

require('../index')

describe('bcore.rabbitmq.client test', () => {
    before(done => {
        miniServer(obj).then(() => {
            done()
        })
    })

    it('should have property `rabbitmq`', () => {
        let property = obj.returnProperty()

        property.should.have.property('rabbitmq')
    })

    it('should return ok', done => {

        obj.publish('bcore.rabbit', 'xiaobaozi')
            .then(data => {

                console.log('data:', data)

                Should(data).be.ok()

                done()

            })
            .catch(err => done(err))

    })
})