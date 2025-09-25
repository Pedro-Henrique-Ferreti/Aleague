<template>
  <div role="tablist" class="tabs tabs-border mb-1.5">
    <button
      v-for="stage in stages"
      v-text="stage.name"
      class="tab basis-1/2 tablet-lg:basis-1/6"
      type="button"
      role="tab"
      :class="{ 'tab-active': active === stage.id }"
      :key="stage.id"
      @click="active = stage.id"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  stages: TournamentStage[];
}>();

const active = defineModel<number>();
</script>
