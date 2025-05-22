export default function listenerInvoker(eventListener, callback) {
  ;[eventListener?.fns].flat().forEach(fn => {
    callback?.(fn)
  })
}
