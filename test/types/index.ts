/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

import { MQEmitter, Message } from '../../mqemitter'

const noop = function () {}

var mq = MQEmitter()
mq = MQEmitter({
  concurrency: 100
})
mq.close(noop)

mq = MQEmitter({
  concurrency: 100,
  matchEmptyLevels: true,
  separator: ','
})
mq.close(noop)

mq = MQEmitter({
  concurrency: 10,
  matchEmptyLevels: true,
  separator: '/',
  wildcardOne: '+',
  wildcardSome: '#'
})

const notify = function (msg: Message, cb: () => void) {
  if (msg.topic === 'hello/world') {
    console.log(msg)
  }
  cb()
}

mq.on('hello/+', notify)

mq.emit('hello/world')

mq.emit('hello/world', function (err) {
  console.log(err)
})

mq.removeListener('hello/+', notify)

mq.close(noop)
