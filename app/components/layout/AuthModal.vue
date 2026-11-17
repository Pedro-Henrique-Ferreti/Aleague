<template>
  <AppModal
    v-model:is-open="isOpen"
    class="[&_.modal-content]:p-0!"
    size="lg"
    :show-actions="false"
  >
    <template #trigger>
      <slot
        name="trigger"
        :open-modal="handleOpenModal"
      />
    </template>
    <div class="tablet-lg:grid tablet-lg:grid-cols-2">
      <AuthModalBrand />
      <AuthModalLogin
        v-if="modalType === 'login'"
        @create-account="modalType = 'create-account'"
      />
      <AuthModalCreateAccount
        v-else
        @login="modalType = 'login'"
      />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
type ModalType = 'login' | 'create-account';

const { r$ } = useCollectScope('auth-modal');

const modalType = ref<ModalType>('login');
const isOpen = ref(false);

function handleOpenModal(type: ModalType) {
  modalType.value = type;
  isOpen.value = true;
  r$.$reset({ toOriginalState: true });
}
</script>
