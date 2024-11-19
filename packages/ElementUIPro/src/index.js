import ElButtonPro from './ElButtonPro.vue';
import ElButtonGroupPro from './ElButtonGroupPro.vue';
import ElInputPro from './ElInputPro.vue';
import ElSelectPro from './ElSelectPro.vue';
import ElCheckboxPro from './ElCheckboxPro.vue';
import ElCheckboxGroupPro from './ElCheckboxGroupPro.vue';
import ElTablePro from './ElTablePro/index.vue';
import ElFormPro from './ElFormPro/index.vue';
import ElRadioGroupPro from './ElRadioGroupPro.vue';
import ElDatePickerPro from './ElDatePickerPro.vue';
import ElTimePickerPro from './ElTimePickerPro.vue';
import ElDialogPro from './ElDialogPro.vue';
import ElDescriptionPro from './ElDescriptionsPro/index.vue';

const components = [
  ElInputPro,
  ElSelectPro,
  ElCheckboxGroupPro,
  ElTablePro,
  ElFormPro,
  ElRadioGroupPro,
  ElDatePickerPro,
  ElTimePickerPro,
  ElButtonGroupPro,
  ElDialogPro,
  ElDescriptionPro,
  ElButtonPro,
  ElCheckboxPro,
];

export default {
  install(Vue) {
    for (const comp of components) {
      Vue.component(comp.name, comp);
    }
  },
};
export const VERSION = '2.0.0';
