<template>
  <CardRadio
    v-model="model"
    v-slot="{ isChecked }"
    name="collection"
    :value="value"
  >
    <div class="flex items-center gap-1">
      <component
        :is="icon ?? IconFolderFilled"
        class="size-1.25"
        :class="[isChecked ? 'fill-base-content' : 'fill-base-200']"
      />
      <span>{{ label }}</span>
    </div>
  </CardRadio>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';
import { IconFolderFilled } from '@tabler/icons-vue';

defineProps<{
  value: Tournament['collectionId'];
  label: string;
  icon?: Icon;
}>();

const model = defineModel<Tournament['collectionId']>();
</script>
