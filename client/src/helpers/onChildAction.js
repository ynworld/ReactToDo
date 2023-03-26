import { addMiddleware } from 'mobx-state-tree'

const onChildAction = (target, listener, attachAfter = false) =>
  addMiddleware(target, function handler(rawCall, next) {
    if (rawCall.type === 'action' && rawCall.id === rawCall.rootId) {
      const info = {
        args: rawCall.args,
        name: rawCall.name,
      }

      if (attachAfter) {
        const res = next(rawCall)

        listener(info)

        return res
      }

      listener(info)

      return next(rawCall)
    }

    return next(rawCall)
  })

export default onChildAction
