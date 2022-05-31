import BaseButton from '@/components/common/BaseButton.vue';
import BaseIcon from '@/components/common/BaseIcon.vue';

export default {
  install(app) {
    app.component('BaseButton', BaseButton);
    app.component('BaseIcon', BaseIcon);
  },
};
