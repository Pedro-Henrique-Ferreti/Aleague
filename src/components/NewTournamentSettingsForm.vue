<template>
  <div class="settings-form">
    <TournamentSettingsIconInput
      :model-value="iconId"
      @update:model-value="$emit('update:iconId', $event)"
    />
    <div>
      <AppInput
        v-model.trim="tournamentNameValue"
        id="new-tournament--name"
        label="Nome do campeonato"
      />
      <NewTournamentSettingsFormFormat
        :model-value="format"
        @update:model-value="$emit('update:format', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AppInput from './AppInput.vue';
import TournamentSettingsIconInput from './TournamentSettingsIconInput.vue';
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
