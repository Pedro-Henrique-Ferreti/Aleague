<template>
  <div class="font-semibold mb-0.5">Sequência</div>
  <swiper-container
    space-between="16"
    free-mode="true"
    slides-per-view="auto"
  >
    <swiper-slide
      v-for="form in entry?.form"
      :key="form.match.id"
      class="w-max last:mr-0!"
      data-allow-mismatch="class"
    >
      <StandingsFormItem
        class="min-h-7"
        :form="form"
        :team-id="entry?.team || null"
      />
    </swiper-slide>
  </swiper-container>
</template>

<script lang="ts" setup>
defineProps<{
  entry: TableEntry | null;
}>();
</script>
