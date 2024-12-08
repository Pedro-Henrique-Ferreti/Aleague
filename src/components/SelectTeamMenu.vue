<template>
  <AppPopupMenu
    :title="title"
    :confirm-button-text="confirmButtonText"
    :confirm-button-is-disabled="!form.selectedTeamId"
    @confirm="selectTeam"
  >
    <slot />
    <template #content>
      <div class="team-list">
        <SelectTeamMenuItem
          v-for="team in teamOptions"
          v-model="form.selectedTeamId"
          :key="team.id"
          :item="team"
        />
      </div>
    </template>
  </AppPopupMenu>
</template>

<script lang="ts" setup>
import type { SelectTeamMenuOption } from '@/types/SelectTeamMenu';
import { ref, type PropType } from 'vue';
import AppPopupMenu from './AppPopupMenu.vue';
import SelectTeamMenuItem from './SelectTeamMenuItem.vue';

const emit = defineEmits<{
  (e: 'select-team', value: SelectTeamMenuOption): void;
}>();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  confirmButtonText: {
    type: String,
    default: 'Salvar',
  },
  teamOptions: {
    type: Array as PropType<SelectTeamMenuOption[]>,
    default: () => ([]),
  },
});

const form = ref({
  selectedTeamId: '',
});

function selectTeam() {
  emit('select-team', props.teamOptions.find((team) => team.id === form.value.selectedTeamId)!);
}
</script>

<style lang="scss" scoped>
.team-list {
  display: grid;
  gap: 0.5rem;
}
</style>
