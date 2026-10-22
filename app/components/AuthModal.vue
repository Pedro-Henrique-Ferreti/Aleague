<template>
  <AppModal
    class="[&_.modal-content]:p-0!"
    size="lg"
    :show-actions="false"
    @open="form = 'login'"
  >
    <template #trigger="slotProps">
      <slot
        name="trigger"
        v-bind="slotProps"
      />
    </template>
    <div class="tablet-lg:grid tablet-lg:grid-cols-2">
      <AuthModalBrand />
      <AuthModalLogin
        v-if="form === 'login'"
        @register="form = 'register'"
      />
      <AuthModalRegister
        v-else
        @login="form = 'login'"
      />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import type { AppModalSlots } from './AppModal.vue';

defineSlots<Pick<AppModalSlots, 'trigger'>>();

const form = ref<'login' | 'register'>('login');
</script>
