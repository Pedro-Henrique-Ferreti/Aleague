<template>
  <Dropdown
    v-model:shown="menuIsOpen"
    theme="app-dropdown"
    auto-size="min"
    popper-class="team-input-popper"
    :triggers="['click']"
    @apply-show="focusSearchInput"
  >
    <AppSearchInput
      v-model="form.search"
      ref="searchInputRef"
      :placeholder="placeholder"
      @keypress.enter.prevent="onEnterKeypress"
      @keyup.esc="menuIsOpen = false"
      @keyup.up="moveFocusCursor(-1)"
      @keyup.down="moveFocusCursor(1)"
    />
    <template #popper>
      <div class="popper">
        <div class="popper__header">
          <AppRadioInput
            v-model="form.teamType"
            size="small"
            text="Clube"
            :value="TeamType.CLUB"
          />
          <AppRadioInput
            v-model="form.teamType"
            size="small"
            text="Seleção"
            :value="TeamType.NATIONAL"
          />
          <AppRadioInput
            v-model="form.teamType"
            size="small"
            text="Personalizado"
            :value="TeamType.CUSTOM"
          />
          <AppRadioInput
            v-model="form.teamType"
            size="small"
            text="Campeonato"
            value=""
          />
        </div>
        <div class="popper__content">
          <ul class="popper__list">
            <TeamSearchInputOption
              v-for="(opt, index) in teams"
              :key="opt.id"
              :team="opt"
              :is-focused="index === focusCursor"
              @select="onSelectTeam(opt)"
            />
          </ul>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { TeamType, type TeamPreview } from '@/types/Team';
import { ref, useTemplateRef, watch } from 'vue';
import { Dropdown } from 'floating-vue';
import { useDebounceFn } from '@vueuse/core';
import api from '@/api';
import AppSearchInput from './AppSearchInput.vue';
import AppRadioInput from './AppRadioInput.vue';
import TeamSearchInputOption from './TeamSearchInputOption.vue';

const emit = defineEmits<{
  (e: 'team-selected', team: TeamPreview): void;
}>();
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
});

const form = ref({
  search: '',
  teamType: TeamType.CLUB as TeamType | '',
});

const teams = ref<TeamPreview[]>([]);

// Get teams
const isLoading = ref(false);

const getTeams = useDebounceFn(async () => {
  teams.value = [];

  if (!form.value.search) return;

  isLoading.value = true;

  try {
    const { data: { data } } = await api.teamService.getTeams({
      name: form.value.search,
      type: form.value.teamType,
    });

    teams.value = data;
  } finally {
    isLoading.value = false;
  }
}, 500);

watch(() => form.value.search, getTeams);
watch(() => form.value.teamType, getTeams);

// Show/hide menu
const menuIsOpen = ref(false);

// Search input
const searchInputRef = useTemplateRef('searchInputRef');

function focusSearchInput() {
  setTimeout(() => searchInputRef.value?.focus(), 20);
}

// Focus cursor
const focusCursor = ref(-1);

function moveFocusCursor(step: number) {
  if (!menuIsOpen.value) return;

  let newIndex = focusCursor.value + step;

  if (newIndex < 0) {
    newIndex = teams.value.length - 1;
  } else if (newIndex >= teams.value.length) {
    newIndex = 0;
  }

  focusCursor.value = newIndex;
}

watch(() => menuIsOpen.value, () => {
  focusCursor.value = -1;
});

function onSelectTeam(team: TeamPreview) {
  emit('team-selected', team);
}

function onEnterKeypress() {
  if (!menuIsOpen.value) {
    menuIsOpen.value = true;
    return;
  }

  if (teams.value[focusCursor.value]) {
    onSelectTeam(teams.value[focusCursor.value]);
  }
}
</script>

<style lang="scss" scoped>
.popper {
  --content-padding: 0.25rem;
  display: flex;
  flex-direction: column;
  max-height: inherit;
  padding: var(--content-padding);
  padding-top: 0.75rem;
  &__header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0 0.5rem;
  }
  &__content {
    @include scrollbar;
    margin-top: 0.75rem;
    margin-right: calc(var(--content-padding) * -1);
    padding-right: var(--content-padding);
    overflow-y: auto;
  }
}
</style>

<style lang="css">
.team-input-popper {
  --v-popper-dropdown--max-height: 18.125rem;
}
</style>
