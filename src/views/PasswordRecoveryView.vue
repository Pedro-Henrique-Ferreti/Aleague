<template>
  <AppTransition name="fade-through">
    <PasswordRecoverySuccess v-if="showSuccessMessage" />
    <PasswordRecoveryForm
      v-else
      @email-sent="showSuccessMessage = true"
    />
  </AppTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm.vue';
import PasswordRecoverySuccess from '@/components/PasswordRecoverySuccess.vue';
import AppTransition from '@/components/AppTransition.vue';

const showSuccessMessage = ref(false);
</script>
