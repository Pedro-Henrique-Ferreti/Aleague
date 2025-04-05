<template>
  <Dropdown
    v-model:shown="menuIsOpen"
    theme="app-dropdown"
    auto-size="min"
    popper-class="team-input-popper"
    :triggers="[]"
    :auto-hide="false"
  >
    <AppSearchInput
      v-model="form.search"
      ref="searchInputRef"
      :placeholder="placeholder"
      @click="menuIsOpen = true"
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
            v-if="tournamentStages?.length"
            v-model="form.teamType"
            size="small"
            text="Campeonato"
            value=""
          />
        </div>
        <div class="popper__content">
          <TransitionFade>
            <IconSpinner
              v-if="isLoading"
              class="popper__loader"
              size="32"
            />
            <div
              v-else-if="form.teamType"
              class="popper__list"
            >
              <TeamSearchInputOption
                v-for="(opt, index) in teamOptions"
                :key="opt.id"
                :team="opt"
                :focused="index === focusCursor"
                :disabled="opt.disabled"
                :left-chip-text="disabledTeams.find((team) => team.id === opt.id)?.label"
                @select="onSelectTeam(opt)"
              />
            </div>
            <TeamSearchInputStages
              v-else-if="tournamentStages"
              :stages="tournamentStages"
            >
              <template #default="{ teams: stageTeams }">
                <TeamSearchInputOption
                  v-for="(opt, index) in stageTeams"
                  :key="opt.id"
                  :team="opt"
                  :focused="index === focusCursor"
                  :disabled="!!disabledTeams.find((team) => team.id === opt.id)"
                  :left-chip-text="disabledTeams.find((team) => team.id === opt.id)?.label"
                  @select="onSelectTeam(opt)"
                />
              </template>
            </TeamSearchInputStages>
          </TransitionFade>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
type DisabledTeam = { id: string; label: string };
</script>

<script lang="ts" setup>
import { TeamType, type TeamPreview } from '@/types/Team';
import type { TournamentStage } from '@/types/Tournament';
import type { TeamSlot } from '@/views/EditTournamentTeamsView.vue';
import {
  computed, ref, useTemplateRef, watch, type PropType,
} from 'vue';
import { Dropdown } from 'floating-vue';
import { onClickOutside, useDebounceFn } from '@vueuse/core';
import api from '@/api';
import IconSpinner from './IconSpinner.vue';
import AppSearchInput from './AppSearchInput.vue';
import AppRadioInput from './AppRadioInput.vue';
import TransitionFade from './TransitionFade.vue';
import TeamSearchInputOption from './TeamSearchInputOption.vue';
import TeamSearchInputStages from './TeamSearchInputStages.vue';

const emit = defineEmits<{
  (e: 'team-selected', team: TeamSlot): void;
  (e: 'close-menu'): void;
}>();
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  disabledTeams: {
    type: Array as PropType<DisabledTeam[]>,
    default: () => ([]),
  },
  tournamentStages: {
    type: Array as PropType<TournamentStage[]>,
    default: null,
  },
});

const form = ref({
  search: '',
  teamType: TeamType.CLUB as TeamType | '',
});

// Show/hide menu
const menuIsOpen = ref(false);

watch(() => menuIsOpen.value, (value) => {
  if (!value) emit('close-menu');
});

function openMenu() {
  menuIsOpen.value = true;
}

// Teams
const teams = ref<TeamPreview[]>([]);
const isLoading = ref(false);

const teamOptions = computed(() => (teams.value.map((team) => ({
  ...team,
  disabled: !!props.disabledTeams.find(({ id }) => id === team.id),
}))));

async function getTeams() {
  if (!form.value.teamType) return;

  teams.value = [];

  if (!form.value.search) return;

  isLoading.value = true;
  menuIsOpen.value = true;

  try {
    const { data: { data } } = await api.teamService.getTeams({
      name: form.value.search,
      type: form.value.teamType,
    });

    teams.value = data;
  } finally {
    isLoading.value = false;
  }
}

const debouncedGetTeams = useDebounceFn(getTeams, 500);

watch(() => form.value.search, debouncedGetTeams);
watch(() => form.value.teamType, getTeams);

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

watch([() => menuIsOpen.value, () => form.value.teamType], () => {
  focusCursor.value = -1;
});

// Event listeners
const searchInputRef = useTemplateRef<HTMLElement>('searchInputRef');

function onSelectTeam(team: TeamSlot) {
  emit('team-selected', team);
  menuIsOpen.value = false;
  form.value.search = '';
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

onClickOutside(searchInputRef, () => {
  menuIsOpen.value = false;
}, { ignore: ['.team-input-popper'] });

function focusSearchInput() {
  searchInputRef.value?.focus();
}

// Exposed values
defineExpose({
  openMenu,
  focus: focusSearchInput,
});
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
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
  }
}
</style>

<style lang="css">
.team-input-popper {
  --v-popper-dropdown--max-height: 18.125rem;
}
</style>
