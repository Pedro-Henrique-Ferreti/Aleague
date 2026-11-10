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
        v-if="form === 'login'"
        @create-account="form = 'create-account'"
      />
      <AuthModalCreateAccount
        v-else
        @login="form = 'login'"
      />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
type FormType = 'login' | 'create-account';

const { r$ } = useCollectScope('auth-modal');

const form = ref<FormType>('login');
const isOpen = ref(false);

function handleOpenModal(formType: FormType) {
  form.value = formType;
  isOpen.value = true;
  r$.$reset({ toOriginalState: true });
}
</script>
