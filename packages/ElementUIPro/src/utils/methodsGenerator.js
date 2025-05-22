export default function methodsGenerator(ctx, refName, ...fields) {
  fields.forEach(mn => {
    ctx[mn] = (...args) => {
      return ctx.$refs[refName][mn](...args)
    }
  })
}

export const tableMethodsGenerator = (ctx, refName) => {
  methodsGenerator(
    ctx,
    refName,
    'clearSelection',
    'toggleRowSelection',
    'toggleAllSelection',
    'toggleRowExpansion',
    'setCurrentRow',
    'clearSort',
    'clearFilter',
    'doLayout',
    'sort'
  )
}

export const formMethodsGenerator = (ctx, refName) => {
  methodsGenerator(ctx, refName, 'validate', 'validateField', 'resetFields', 'clearValidate')
}
