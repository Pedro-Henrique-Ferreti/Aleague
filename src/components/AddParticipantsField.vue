<template>
  <div
    class="add-participants-field"
    :class="{ 'add-participants-field--list-open': showAutocompleteList }"
  >
    <AppLargeField
      v-bind="$attrs"
      v-model.trim="teamName"
      @focus="inputIsFocused = true"
      @blur="handleBlur"
      @keyup.up="moveHighlightedAutocompleteOption(-1)"
      @keyup.down="moveHighlightedAutocompleteOption(1)"
      @keyup.enter="handleEnterKeypress"
    />
    <AppButton
      class="add-participants-field__button"
      type="button"
      :disabled="disableAddTeam"
      :size="showSmallButton ? 'small' : null"
      @click="addTeam"
    >
      Adicionar
    </AppButton>
    <AppTransition name="fade">
      <div
        v-if="showAutocompleteList"
        class="add-participants-field__autocomplete-list"
      >
        <div
          v-for="(team, index) in autocompleteValues"
          class="add-participants-field__autocomplete-list-item"
          :class="{ 'highlighted': highlightedAutocompleteOption === index }"
          :key="team.id"
          @click="selectTeam(team)"
        >
          {{ team.name }}
        </div>
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import type { TeamListItem } from '@/types/Team';
import type { LeagueParticipant } from '@/types/League';
import { computed, ref, watch, type PropType } from 'vue';
import { useMediaQuery } from '@/utils';
import { useTeamsStore } from '@/stores/teamsStore';
import AppLargeField from './AppLargeField.vue';
import AppTransition from './AppTransition.vue';

const teamsStore = useTeamsStore();

const emit = defineEmits(['add-team']);
const props = defineProps({
  participants: {
    type: Array as PropType<LeagueParticipant[]>,
    default: () => ([]),
  },
  disableAddTeam: {
    type: Boolean,
    default: false,
  },
});

const normalizeName = (name: string) => {
  return name.toLowerCase().split(' ').map((s) => s.trim()).join('');
};

const participantNames = computed(() => {
  return props.participants.map(({ name }) => normalizeName(name));
});

const { tabletPortraitUp: showSmallButton } = useMediaQuery();

// Input state
const teamName = ref('');

const disableAddTeam = computed(() => {
  return participantNames.value.includes(normalizeName(teamName.value))
    || teamName.value === ''
    || props.disableAddTeam;
});

// Select and add a team
function handleEnterKeypress() {
  const team = autocompleteValues.value[highlightedAutocompleteOption.value];

  if (team) {
    selectTeam(team);
  } else {
    addTeam();
  }
}

function selectTeam(team: TeamListItem) {
  teamName.value = team.name;

  addTeam();
}

function addTeam() {
  if (teamName.value === '') return;
 
  const team = teamsStore.teams.find(
    ({ name }) => normalizeName(name) === normalizeName(teamName.value),
  );

  if (team) {
    emit('add-team', {
      id: team.id,
      name: team.name,
      created: true,
    });
  } else {
    emit('add-team', {
      id: new Date().getTime(),
      name: teamName.value,
      created: false,
    });
  }

  teamName.value = '';
}

// Input focus and blur
const inputIsFocused = ref(false);

function handleBlur() {
  setTimeout(() => inputIsFocused.value = false, 300);
}

// Autocomplete list
const showAutocompleteList = computed(() => {
  return inputIsFocused.value
    && teamName.value.length > 0
    && autocompleteValues.value.length > 0;
});

const autocompleteValues = computed(() => teamsStore.teams.filter(({ name }) => {
  const nameNormalized = normalizeName(name);

  return nameNormalized.includes(normalizeName(teamName.value))
    && !participantNames.value.includes(nameNormalized);
}).slice(0, 8));

// Highligh autocomplete options
const highlightedAutocompleteOption = ref(-1);

function moveHighlightedAutocompleteOption(step: number) {
  if (!showAutocompleteList.value) return;
  
  let newIndex = highlightedAutocompleteOption.value + step;

  if (newIndex < 0) {
    newIndex = autocompleteValues.value.length - 1;
  } else if (newIndex >= autocompleteValues.value.length) {
    newIndex = 0;
  }

  highlightedAutocompleteOption.value = newIndex;
}

watch(() => showAutocompleteList.value, () => {
  highlightedAutocompleteOption.value = -1;
});
</script>

<style lang="scss" scoped>
.add-participants-field {
  position: relative;
  &--list-open {
    :deep(.base-input) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 15px 40px 0 rgba(74, 84, 114, 0.1);
    }
  }
  &__button {
    @include for-tablet-portrait-down {
      width: 100%;
      margin-top: 1rem;
    }
    @include for-tablet-portrait-up {
      position: absolute !important;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }
  }
  &__autocomplete-list {
    @include hide-shadow($top: true);
    width: 100%;
    background-color: $color--white;
    border: 1px solid $color--light-gray-1;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    box-shadow: 0 15px 40px 0 rgba(74, 84, 114, 0.1);
    position: absolute;
    top: calc(100% - 1px);
  }
  &__autocomplete-list-item {
    display: flex;
    align-items: center;
    min-height: 2.5rem;
    padding: 0 1rem;
    transition: all $transition--fastest ease-in;
    cursor: pointer;
    &:hover,
    &.highlighted {
      background-color: $color--light-gray-2;
      color: $color--text-darken;
    }
  }
}
</style>
