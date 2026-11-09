<template>
  <div>
    <AppInput
      v-model="fields.name"
      label="Nome"
    />
  </div>
</template>

<script lang="ts" setup>
const fields = defineModel<CollectionForm>({ required: true });
</script>
