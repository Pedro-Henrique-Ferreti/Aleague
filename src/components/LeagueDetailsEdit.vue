<template>
  <section>
    <SectionHeader heading="h3">
      Editar
    </SectionHeader>
    <form
      class="league-details-form"
      @submit.prevent
    >
      <AppTextField
        id="league--field-name"
        label="Nome do campeonato"
        v-model.lazy="leagueName"
      />
      <AppButton :disabled="leagueName === props.leagueName">
        Renomear
      </AppButton>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SectionHeader from './SectionHeader.vue';
import AppTextField from './AppTextField.vue';

const props = defineProps({
  leagueName: {
    type: String,
    required: true,
  },
});

const leagueName = ref(props.leagueName);
</script>

<style lang="scss" scoped>
.league-details-form {
  display: grid;
  gap: 1rem;
  @include for-tablet-portrait-up {
    grid-template-columns: 3fr 1fr;
    align-items: flex-end;
  }
}
</style>
