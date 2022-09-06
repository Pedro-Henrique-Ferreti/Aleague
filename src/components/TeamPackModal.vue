<template>
  <AppModal
    title="Pacotes de equipe"
    size="large"
    :show="show"
    @close="$emit('close')"
  >

  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from './AppModal.vue';

defineEmits(['close']);
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>

</style>
