<template>
  <main class="careers | container-extra-small">
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getAllCareers"
      />
      <div v-else>
        <PageHeader title="Carreiras" />
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import api from '@/api';
import TransitionFade from '@/components/TransitionFade.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';

// Careers
const careers = ref([]);

const isLoading = ref(true);
const errorMessage = ref('');

async function getAllCareers() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.careerService.getAllCareers();
    careers.value = data;
  } catch (error) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar as carreiras.';
  } finally {
    isLoading.value = false;
  }
}

getAllCareers();
</script>
