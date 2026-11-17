<template>
  <tr
    class="bg-white h-3 transition-all duration-300 text-center [&_td]:px-0.75"
    :class="{
      'cursor-pointer': isClickable,
      'bg-gray-200!': entry.team && teamStore.focusedTeamId.includes(entry.team),
      'hover:bg-gray-1': !disabled,
      'opacity-50': disabled,
    }"
    :tabindex="isClickable ? 0 : -1"
    @click="isClickable && $emit('click')"
  >
    <slot name="resize-observer" />
    <td
      v-if="!entry.team"
      class="h-3"
      colspan="10"
    />
    <template v-else>
      <slot name="team" />
      <td :class="{ 'font-bold': sortType === TableEntrySortType.POINTS }">
        {{ entry.points }}
      </td>
      <template v-if="displayMode === 'complete'">
        <td>{{ entry.played }}</td>
        <td :class="{ 'font-bold': sortType === TableEntrySortType.WON }">
          {{ entry.won }}
        </td>
        <td>{{ entry.drawn }}</td>
        <td :class="{ 'font-bold': sortType === TableEntrySortType.LOST }">
          {{ entry.lost }}
        </td>
        <td :class="{ 'font-bold': sortType === TableEntrySortType.GOALS_FOR }">
          {{ entry.goalsFor }}
        </td>
        <td :class="{ 'font-bold': sortType === TableEntrySortType.GOALS_AGAINST }">
          {{ entry.goalsAgainst }}
        </td>
        <td :class="{ 'font-bold': sortType === TableEntrySortType.GOALS_DIFFERENCE }">
          {{ entry.goalsFor - entry.goalsAgainst }}
        </td>
        <td>{{ entry.played ? Math.round(entry.points / (entry.played * POINTS_PER_WIN) * 100) : 0 }}%</td>
        <td v-if="showForm">
          <StandingsCardForm
            :form="entry.form.slice(-5)"
            :auto-fill="5"
          />
        </td>
      </template>
    </template>
    <td v-if="displayMode === 'complete'" />
  </tr>
</template>

<script lang="ts" setup>
export interface StandingsTableRowProps {
  entry: TableEntry;
  isClickable?: boolean;
  disabled?: boolean;
  sortType: TableEntrySortType;
  showForm?: boolean;
  displayMode?: 'complete' | 'compact';
}

withDefaults(defineProps<StandingsTableRowProps>(), {
  displayMode: 'complete',
});
defineEmits(['click']);

const teamStore = useTeamStore();
</script>
