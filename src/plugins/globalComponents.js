import AppButton from '@/components/AppButton.vue';
import BaseIcon from '@/components/common/BaseIcon.vue';
import BaseInput from '@/components/common/BaseInput.vue';

export default {
  install(app) {
    app.component('AppButton', AppButton);
    app.component('BaseIcon', BaseIcon);
    app.component('BaseInput', BaseInput);
  },
};
