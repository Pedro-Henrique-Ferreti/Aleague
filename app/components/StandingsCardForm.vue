<template>
  <div class="flex items-center gap-0.25">
    <TeamForm
      v-for="index in (autoFill > form.length) ? autoFill : form.length"
      :key="index"
      :form="form[index - 1] ?? null"
    />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  form: TableEntry['form'];
  autoFill?: number;
}>(), {
  autoFill: 0,
})
</script>
