<template>
  <transition
    name="fade-through"
    mode="out-in"
  >
    <PasswordRecoverySuccess v-if="showSuccessMessage" />
    <PasswordRecoveryForm
      v-else
      @email-sent="showSuccessMessage = true"
    />
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm.vue';
import PasswordRecoverySuccess from '@/components/PasswordRecoverySuccess.vue';

const showSuccessMessage = ref(false);
</script>
