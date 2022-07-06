import BaseAlert from '@/components/common/BaseAlert.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseIcon from '@/components/common/BaseIcon.vue';
import BaseInput from '@/components/common/BaseInput.vue';

export default {
  install(app) {
    app.component('BaseAlert', BaseAlert);
    app.component('BaseButton', BaseButton);
    app.component('BaseIcon', BaseIcon);
    app.component('BaseInput', BaseInput);
  },
};
