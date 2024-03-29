import { addMiddleware } from 'mobx-state-tree'

const onChildAction = (target, listener, attachAfter = false, ignore = []) =>
  addMiddleware(target, (call, next) => {
    if (call.type === 'action' && call.id === call.rootId) {
      const info = {
        args: call.args,
        name: call.name,
      }

      if (ignore.find((item) => item === call.name)) return next(call)

      if (attachAfter) {
        const result = next(call)

        listener(info)

        return result
      }

      listener(info)

      return next(call)
    }

    return next(call)
  })

export default onChildAction
