<template>
  <CardRadio
    v-model="model"
    v-slot="{ isChecked }"
    name="collection"
    :value="value"
  >
    <div class="flex items-center gap-1">
      <component
        class="size-1.25"
        :is="icon ?? IconFolderFilled"
        :class="[isChecked ? 'fill-base-content' : 'fill-base-200']"
      />
      <span>{{ label }}</span>
    </div>
  </CardRadio>
</template>

<script lang="ts" setup>
import { IconFolderFilled, type Icon } from '@tabler/icons-vue';

interface Props {
  value: Tournament['collectionId'];
  label: string;
  icon?: Icon;
}

const model = defineModel<Tournament['collectionId']>();

defineProps<Props>();
</script>
