<template>
  <div>
    <div class="grid gap-0.75">
      <AppInput
        v-model="fields.name"
        label="Nome"
      />
      <TagInput v-model="fields.tags" />
    </div>
    <div class="grid grid-cols-[1fr_auto] gap-x-2 gap-y-0.75 mt-1">
      <AppSelect
        v-model="fields.icon"
        label="Logo"
        :options="ICON_OPTIONS"
      />
      <div class="flex justify-center size-5">
        <img
          class="h-5"
          alt="Logo do campeonato"
          :src="fields.icon"
        >
      </div>
      <div class="flex gap-0.5 col-end-3 justify-between">
        <AppButton
          class="btn-square btn-sm"
          aria-label="Mostrar logo anterior"
          :icon-left="IconChevronLeft"
          @click="setIcon(iconIndex - 1)"
        />
        <AppButton
          class="btn-square btn-sm"
          aria-label="Mostrar logo seguinte"
          :icon-left="IconChevronRight"
          @click="setIcon(iconIndex + 1)"
        />
      </div>
    </div>
    <AppToggle
      v-model="fields.showCountry"
      label="Mostrar legenda de país"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const fields = defineModel<TournamentForm>({ required: true });

const iconIndex = computed(() => ICON_OPTIONS.findIndex(option => option.value === fields.value.icon));

function setIcon(index: number) {
  const lastIndex = ICON_OPTIONS.length - 1;
  fields.value.icon = ICON_OPTIONS.at(index > lastIndex ? 0 : index)!.value;
}
</script>
