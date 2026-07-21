<template>
  <p class="mb-1.5">Você pode editar várias legendas de uma vez. Todos os grupos receberão as mesmas legendas.</p>
  <table>
    <thead>
      <tr class="[&_th]:pr-1 [&_th]:pb-0.5">
        <th >Posição</th>
        <th>Cor da legenda</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(_, index) in form.legends"
        :key="index"
      >
        <td class="pl-0.5 pr-1.5">{{ index + 1 }}</td>
        <td><LegendColorPicker v-model="form.legends[index]" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
interface LegendsForm {
  legends: GroupStage['groups'][number]['legend'];
}

const stageStore = useStageStore();

function newForm(): LegendsForm {
  return {
    legends: clone(stageStore.activeGroupStage?.groups[0]?.legend) ?? [],
  };
}

const form = ref(newForm());

function submitForm() {
  if (!stageStore.activeGroupStage) return;

  for (const group of stageStore.activeGroupStage.groups) {
    group.legend = form.value.legends;
  }
}

defineExpose({
  submitForm,
  resetForm: () => (form.value = newForm()),
});
</script>
