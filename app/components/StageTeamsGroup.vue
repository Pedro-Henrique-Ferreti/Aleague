<template>
  <div class="card card-border relative">
    <div
      class="card-body"
      ref="cardRef"
    >
      <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2">
        {{ stageType === StageType.GROUPS ? 'Grupo' : 'Partida' }} {{ group.order }}
      </div>
      <StageTeamsSlot
        v-for="team, index in teams"
        :key="team ?? index"
        :index="index"
        :team-id="team"
        @remove="teams[index] = null"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dragAndDrop} from '@formkit/drag-and-drop/vue';
import type { StageTeamsFormGroup } from './StageTeamsModal.vue';

defineProps<{
  stageType: TournamentStage['type'];
  group: StageTeamsFormGroup;
}>();

const teams = defineModel<StageTeamsFormGroup['teams']>('teams', { required: true });

const cardRef = useTemplateRef('cardRef');

dragAndDrop({
  parent: cardRef as unknown as HTMLElement,
  values: teams,
  group: 'teams-group',
  draggingClass: 'drag-placeholder',
  dropZoneParentClass: 'bg-base-200',
  dragPlaceholderClass: 'opacity-0',
  draggable: (child) => !child.classList.contains('badge'),
});
</script>

<style scoped>
@reference '@/assets/css/main.css';

.card-body {
  @apply p-1 grid gap-0.5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] grid-rows-[repeat(auto-fill,minmax(0,2.5rem))];
}
.drag-placeholder {
  @apply border-base-content bg-secondary/15;
}
</style>
