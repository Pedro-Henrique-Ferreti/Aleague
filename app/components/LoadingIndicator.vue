<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="w-full max-w-32">
      <p class="mb-0.5">{{ message }}</p>
      <AppProgress />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: 'Carregando. Por favor, aguarde...',
});
</script>
