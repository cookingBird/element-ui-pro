import { get, set } from 'lodash'
import Ajax from '../utils/Ajax'

/** @description 以.访问符获取一个ctx中的某一字段值 */
export function getCtxValueGetter(path, fallbackValue) {
  const segments = path?.split('.')
  return ctx => {
    if (!segments) return ctx
    if (!ctx) return fallbackValue
    const fileds = segments
    let val = ctx
    fileds.forEach((key, index) => {
      if (index < fileds.length - 1) {
        val = val[key] ?? this.$set(val, key, {})
      } else {
        val = val[key] ?? this.$set(val, key, fallbackValue)
      }
    })
    return val
  }
}

/**
 * @description 以.访问符设置一个ctx中的某些字段值
 * @param {object} ctx
 * @param {string} filedLike
 */
export function getCtxValueSetter(ctx, filedLike) {
  if (!filedLike) throw Error('filedLike is required')
  if (typeof ctx !== 'object') throw Error('ctx is not object')
  return value => {
    set(ctx, filedLike, value)
  }
}

/**
 * @description 获取effectFingerprint
 * @param {object} model
 * @param {string} effectKey
 * @returns
 */
export function effectFingerprint(model, effectKey) {
  const getCtxValue = get
  if (effectKey === undefined) return ''
  if (Array.isArray(effectKey)) {
    const cur = effectKey.map(keyLike => getCtxValue(model, keyLike))
    return cur.join(',')
  }
  if (typeof effectKey === 'string') {
    const cur = effectKey.split(',').map(keyLike => getCtxValue(model, keyLike))
    return cur.join(',')
  }
  return ''
}

/**
 * @deprecated
 * @description 判断当前effectFingerprint是否有效 */
export function validateEffect(val = '') {
  if (val === '') return true
  return effectFingerprint.split(',').reduce((pre, cur) => {
    return pre && Boolean(cur)
  }, true)
}

/**
 * @deprecated
 * @description 根据配置参数请求字典
 * @param {object} model
 * @param {vueComponent} ctx
 * @returns
 */
export function request(model, ctx) {
  const getCtxValue = get
  const { URL, method, params, data, objectMap } = ctx
  const urlParams = URL?.matchAll(/\[(.+?)\]/g).map(res => res[1])
  const urlParamsValue = urlParams.map(key => getCtxValue(model, key))
  if (method === 'get') {
    const parsedPrams = objectMap(params, (key, value) => getCtxValue(model, value))
    return Ajax({
      url: urlParams.reduce((pre, key, index) => {
        return pre.replace(key, urlParamsValue[index])
      }, URL),
      method,
      params: parsedPrams,
    })
  }
  if (method === 'post') {
    const parsedData = objectMap(data, (key, value) => getCtxValue(model, value))
    return Ajax({
      url: urlParams.reduce((pre, key, index) => {
        return pre.replace(key, urlParamsValue[index])
      }, URL),
      method,
      data: parsedData,
    })
  }
  throw Error('method not support')
}
