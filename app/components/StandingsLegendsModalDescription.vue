<template>
  <p class="mb-1.5">Você pode adicionar uma descrição para cada legenda. A descrição será exibida na tabela de classificação.</p>
  <template v-if="stageStore.activeGroupStage">
    <div
      v-for="color in COLOR_OPTIONS"
      :key="color"
      class="flex items-center gap-1 not-last:mb-1"
    >
      <IconSquareRoundedFilled
        class="size-2"
        aria-hidden="true"
        :style="`color: ${color}`"
      />
      <BaseInput
        v-model="form.description[color]"
        class="input"
        :aria-label="`Legenda para ${COLOR_LABELS[color]}`"
      />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { IconSquareRoundedFilled } from '@tabler/icons-vue';
import { newLegendDescription } from '~/helpers/group-stage';

interface LegendsForm {
  description: GroupStage['legendDescription'];
}

const COLOR_LABELS: Record<LegendColor, string> = {
  [LegendColor.GREEN]: 'verde',
  [LegendColor.BLUE]: 'azul',
  [LegendColor.RED]: 'vermelho',
  [LegendColor.ORANGE]: 'laranja',
  [LegendColor.NONE]: 'transparente',
};

const COLOR_OPTIONS = Object.values(LegendColor).filter(color => color !== LegendColor.NONE);

const stageStore = useStageStore();

function newForm(): LegendsForm {
  return {
    description: clone(stageStore.activeGroupStage?.legendDescription) ?? newLegendDescription(),
  };
}

const form = ref(newForm());

function submitForm() {
  if (!stageStore.activeGroupStage) return;

  stageStore.activeGroupStage.legendDescription = form.value.description;
}

defineExpose({
  submitForm,
  resetForm: () => (form.value = newForm()),
});
</script>
