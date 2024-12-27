<template>
  <AppPopupMenu
    :title="title"
    :confirm-button-text="confirmButtonText"
    :confirm-button-is-disabled="!form.selectedTeamId"
    @apply-show="focusSearchInput"
    @confirm="selectTeam"
  >
    <slot />
    <template #before-content>
      <AppSearchInput
        v-model="form.searchValue"
        size="small"
        ref="searchInputRef"
      />
    </template>
    <template #content>
      <div class="team-list">
        <span
          v-if="displayedTeamOptions.length === 0"
          class="team-list__empty-state"
        >
          Nenhum resultado encontrado
        </span>
        <SelectTeamMenuItem
          v-for="team in displayedTeamOptions"
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
import {
  computed, ref, useTemplateRef, type PropType,
} from 'vue';
import AppPopupMenu from './AppPopupMenu.vue';
import AppSearchInput from './AppSearchInput.vue';
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
  searchValue: '',
  selectedTeamId: '',
});

const displayedTeamOptions = computed(() => props.teamOptions.filter((team) => (
  team.name.toLowerCase().includes(form.value.searchValue.toLowerCase())
)));

// Focus search input
const searchInputRef = useTemplateRef('searchInputRef');

function focusSearchInput() {
  setTimeout(() => {
    searchInputRef.value?.focus();
  }, 100);
}

function selectTeam() {
  emit('select-team', props.teamOptions.find((team) => team.id === form.value.selectedTeamId)!);
}
</script>

<style lang="scss" scoped>
.team-list {
  display: grid;
  gap: 0.5rem;
  &__empty-state {
    color: $color--text-500;
    font-size: 0.875rem;
    text-align: center;
  }
}
</style>
