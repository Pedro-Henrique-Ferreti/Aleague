<template>
  <div class="playoffs-page">
    <TournamentPageStageControl
      v-model="selectedRoundId"
      :stages="[stage]"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TournamentPlayoffsStage } from '@/types/Tournament';
import { ref, type PropType } from 'vue';
import TournamentPageStageControl from './TournamentPageStageControl.vue';

const props = defineProps({
  stage: {
    type: Object as PropType<TournamentPlayoffsStage>,
    required: true,
  },
});

const selectedRoundId = ref(props.stage.rounds[3].id);
</script>

<style lang="scss" scoped>
.playoffs-page {
  margin-top: 2rem;
}
</style>
