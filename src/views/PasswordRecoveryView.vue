<template>
  <PasswordRecoverySuccess v-if="showSuccessMessage" />
  <PasswordRecoveryForm
    v-else
    @email-sent="showSuccessMessage = true"
  />
</template>

<script setup>
import { ref } from 'vue';
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm.vue';
import PasswordRecoverySuccess from '@/components/PasswordRecoverySuccess.vue';

const showSuccessMessage = ref(false);
</script>
