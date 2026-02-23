<template>
  <div class="round">
    <div class="relative group">
      <input
        v-model.lazy="name"
        :id="inputId"
        type="text"
        class="w-full text-lg text-center font-medium focus:[&+svg]:hidden"
      >
      <IconPencil class="round-edit-icon" />
    </div>
    <div class="flex flex-col gap-0.75">
      <PlayoffRoundCard
        v-for="(slot, index) in slots"
        :key="slot.id"
        class="bracket even:not-last:mb-1"
        :model-value="slot"
        @update:model-value="slots[index] = $event"
        @winner-updated="$emit('slotWinnerUpdated', { team: $event, slotIndex: index })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconPencil } from '@tabler/icons-vue';

defineEmits<{
  slotWinnerUpdated: [{ team: PlayoffRoundWinner, slotIndex: number }];
}>();

const inputId = useId();

const name = defineModel<PlayoffRound['name']>('name', { required: true });
const slots = defineModel<PlayoffRound['slots']>('slots', { required: true });

watch(name, (newValue, oldValue) => {
  if (newValue === '') {
    name.value = oldValue;
  }
});
</script>

<style scoped>
@reference '@/assets/css/main.css';

.round {
  @apply grid gap-1.5 grid-rows-[auto_1fr] not-first:[&_.bracket]:mb-0! first:[&_.bracket]:before:hidden! first:[&_.bracket]:after:hidden!;
}

.round-edit-icon {
  @apply size-1.25 text-base-content/60 fill-white absolute right-0.5 top-1/2 -translate-y-1/2 pointer-events-none not-group-hover:hidden;
}

.bracket::before, .bracket::after {
  @apply block shrink-0 border border-gray-300 content-[''];
}
.bracket::before {
  @apply w-1.75 h-1/2 rounded-xl rounded-l-none border-2 border-l-0;
}
.bracket::after {
  @apply w-2.5;
}
</style>
