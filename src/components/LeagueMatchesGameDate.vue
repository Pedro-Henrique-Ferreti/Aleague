<template>
  <div class="league-game-date">
    <span class="text-darken">{{ weekday }}</span>
    <span class="text-darken">{{ hour }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  weekday: {
    type: String,
    default: '',
  },
  hour: {
    type: String,
    default: '',
  },
});

const weekday = computed(() => {
  switch (props.weekday) {
    case '1':
      return 'Seg';
    case '2':
      return 'Ter';
    case '3':
      return 'Qua';
    case '4':
      return 'Qui';
    case '5':
      return 'Sex';
    case '6':
      return 'Sáb';
    case '7':
      return 'Dom';
    default:
      return '';
  }
});
</script>

<style lang="scss" scoped>
.league-game-date {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: $font-weight--semibold;
  &::after {
    content: '';
    display: block;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 100%;
    height: 1px;
    background-color: $color--light-gray-1;
    transform: translateY(-0.25rem);
  }
}
</style>
