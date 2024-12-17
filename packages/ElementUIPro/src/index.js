import ElButtonPro from './ElButtonPro.vue'
import ElButtonGroupPro from './ElButtonGroupPro.vue'
import ElInputPro from './ElInputPro.vue'
import ElSelectPro from './ElSelectPro.vue'
import ElCheckboxPro from './ElCheckboxPro.vue'
import ElCheckboxGroupPro from './ElCheckboxGroupPro.vue'
import ElTablePro from './ElTablePro'
import ElFormPro from './ElFormPro'
import ElRadioGroupPro from './ElRadioGroupPro'
import ElDatePickerPro from './ElDatePickerPro.vue'
import ElDialogPro from './ElDialogPro.vue'
import ElDescriptionPro from './ElDescriptionsPro/index.vue'
import ElTreePro from './ElTreePro/index.vue'

const components = [
  ElInputPro,
  ElSelectPro,
  ElCheckboxGroupPro,
  ElTablePro,
  ElFormPro,
  ElRadioGroupPro,
  ElDatePickerPro,
  ElButtonGroupPro,
  ElDialogPro,
  ElDescriptionPro,
  ElButtonPro,
  ElCheckboxPro,
  ElTreePro,
]

export default {
  install(Vue) {
    for (const comp of components) {
      Vue.component(comp.name, comp)
    }
  },
}
export const VERSION = '2.0.0'
