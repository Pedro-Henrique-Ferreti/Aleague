<template>
  <ResetPasswordSuccess v-if="showSuccessMessage" />
  <ResetPasswordForm
    v-else
    @password-reset="showSuccessMessage = true"
  />
</template>

<script setup>
import { ref } from 'vue';
import ResetPasswordForm from '@/components/ResetPasswordForm.vue';
import ResetPasswordSuccess from '@/components/ResetPasswordSuccess.vue';

const showSuccessMessage = ref(false);
</script>
