<template>
  <div>
    <AppAlert
      v-if="formHasEmptySlots"
      class="mb-2"
      message="Esta fase possui vagas em aberto. Preencha todas as vagas antes de realizar o sorteio."
      type="warning"
    />
    <DrawPots
      v-model="drawPots"
      :seeding-draw="seedingDraw"
      :disabled="formHasEmptySlots"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  seedingDraw: ReturnType<typeof useSeedingDraw>;
  formHasEmptySlots: boolean;
}>();

const drawPots = defineModel<DrawPot[]>('drawPots', { required: true });
</script>
