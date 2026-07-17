<template>
  <section
    v-if="showCard"
    class="card card-border bg-gray-1"
  >
    <div class="card-body gap-0 p-1.25">
      <h3 class="font-semibold mb-0.5">Legenda</h3>
      <ul class="grid gap-0.5">
        <li
          v-for="[color, legend] in displayedLegends"
          :key="color"
          class="flex items-center gap-0.75"
        >
          <IconSquareRoundedFilled
            class="size-0.75"
            :aria-label="`Cor ${LEGEND_COLOR_ARIA_LABELS[color]}`"
            :style="`color: ${color}`"
          />
          {{ legend }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IconSquareRoundedFilled } from '@tabler/icons-vue';

type DescriptionKeys = keyof GroupStage['legendDescription'];
type DisplayedLegends = Array<[DescriptionKeys, GroupStage['legendDescription'][DescriptionKeys]]>;

const props = defineProps<{
  legends: GroupStage['legendDescription'];
}>();

const showCard = computed(() => Object.values(props.legends).some(Boolean));

const displayedLegends = computed(() => {
  return Object.entries(props.legends).filter(([_, value]) => !!value) as DisplayedLegends;
});
</script>
