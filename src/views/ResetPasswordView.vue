<template>
  <LoadingIndicator
    v-if="isLoading"
    class="reset-password__loading"
  />
  <ResetPasswordExpiredLink v-else-if="showLinkExpiredMessage" />
  <ResetPasswordSuccess v-else-if="showSuccessMessage" />
  <ResetPasswordForm
    v-else
    @password-reset="showSuccessMessage = true"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ResetPasswordForm from '@/components/ResetPasswordForm.vue';
import ResetPasswordSuccess from '@/components/ResetPasswordSuccess.vue';
import ResetPasswordExpiredLink from '@/components/ResetPasswordExpiredLink.vue';

const route = useRoute();
const authStore = useAuthStore();

const showSuccessMessage = ref(false);
const showLinkExpiredMessage = ref(false);
const isLoading = ref(true);

async function validateEmailAndToken() {
  try {
    const { email, token } = route.query;

    if (!email || !token) {
      throw new Error();
    }

    const { isValid } = await authStore.validatePasswordResetToken({ email, token });

    if (!isValid) {
      throw new Error();
    }
  } catch(error) {
    showLinkExpiredMessage.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(validateEmailAndToken);
</script>

<style lang="scss" scoped>
.reset-password__loading {
  min-height: 20rem;
}
</style>
