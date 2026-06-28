<template>
  <tr
    class="bg-white h-3 hover:bg-gray-1 transition-colors duration-300 text-center [&_td]:px-0.75"
    :class="{
      'cursor-pointer': isClickable,
      'bg-gray-200!': entry.team && teamStore.focusedTeamId.includes(entry.team),
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
    <td />
  </tr>
</template>

<script lang="ts" setup>
defineProps<{
  entry: TableEntry;
  isClickable?: boolean;
  sortType: TableEntrySortType;
  showForm?: boolean;
}>();
defineEmits(['click']);

const teamStore = useTeamStore();
</script>
