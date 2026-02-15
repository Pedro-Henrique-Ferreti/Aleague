<template>
  <AppFieldset label="Categoria">
    <div class="join items-end">
      <BaseInput
        v-model.trim="inputModel"
        class="input join-item w-full"
      />
      <AppButton
        class="join-item"
        label="Adicionar"
        @click="addTag"
      />
    </div>
  </AppFieldset>
  <div class="badge-container flex-wrap">
    <button
      v-for="item in model"
      v-text="item"
      :key="item"
      class="badge badge-outline badge-secondary cursor-pointer"
      type="button"
      @click="removeTag(item)"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<Tournament['tags']>({ required: true });

const inputModel = ref('');

function addTag() {
  model.value.push(inputModel.value);
  inputModel.value = '';
}

function removeTag(item: Tournament['tags'][number]) {
  model.value = model.value.filter(i => i !== item);
}
</script>
