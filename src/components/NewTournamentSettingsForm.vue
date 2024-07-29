<template>
  <div class="settings-form">
    <NewTournamentSettingsFormIcon v-model:selected-icon-id="iconIdValue" />
    <div>
      <AppInput
        v-model.trim="tournamentNameValue"
        id="new-tournament--name"
        label="Nome do campeonato"
      />
      <NewTournamentSettingsFormFormat v-model="formatValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AppInput from './AppInput.vue';
import NewTournamentSettingsFormIcon from './NewTournamentSettingsFormIcon.vue';
import NewTournamentSettingsFormFormat from './NewTournamentSettingsFormFormat.vue';

const emit = defineEmits(['update:tournamentName', 'update:iconId', 'update:format']);
const props = defineProps({
  tournamentName: {
    type: String,
    required: true,
  },
  iconId: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
});

const tournamentNameValue = computed({
  get: () => props.tournamentName,
  set(value) {
    emit('update:tournamentName', value);
  },
});
const iconIdValue = computed({
  get: () => props.iconId,
  set(value) {
    emit('update:iconId', value);
  },
});
const formatValue = computed({
  get: () => props.format,
  set(value) {
    emit('update:format', value);
  },
});
</script>

<style lang="scss" scoped>
.settings-form {
  display: grid;
  gap: 1.5rem;
  @include for-tablet-portrait-up {
    grid-template-columns: auto 1fr;
  }
}
</style>
