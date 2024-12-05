<template>
  <AppModal
    format="dialog"
    :id="id"
    :title="title"
    :show="show"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  >
    <template #header-icon>
      <div class="delete-icon">
        <IconDelete class="delete-icon__image" />
      </div>
    </template>
    <slot>
      <p>Você tem certeza que deseja excluir esse item?</p>
    </slot>
    <template #footer>
      <AppButton
        outline
        block
        @click="$emit('close')"
      >
        Cancelar
      </AppButton>
      <AppButton
        color="danger-high-emphasis"
        block
        :is-loading="isLoading"
        @click="$emit('confirm')"
      >
        Confirmar e excluir
      </AppButton>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import IconDelete from '@/assets/icons/Delete.svg';
import AppModal from './AppModal.vue';
import AppButton from './AppButton.vue';

defineEmits(['close', 'confirm']);
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.delete-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  color: $color--danger;
  background-color: $color--danger-100;
  border-radius: $radius--full;
  &__image {
    width: 2rem;
    height: 2rem;
  }
}
</style>
