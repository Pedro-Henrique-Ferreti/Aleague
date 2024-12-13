<template>
  <div class="stage-control | app-base-card">
    <AppIconButton
      v-tooltip="'Fase anterior'"
      class="stage-control__button stage-control__button-next"
      color="secondary"
      size="small"
      aria-label="Mostrar rodada anterior"
      :icon="IconChevronLeft"
      :disabled="selectedOptionIndex === 0"
      @click="slideTo(selectedOptionIndex - 1)"
    />
    <div class="stage-control__rounds">
      <swiper-container
        ref="swiperContainerRef"
        space-between="8"
        slides-per-view="auto"
      >
        <swiper-slide
          v-for="(option, index) in roundOptions"
          :key="option.id"
        >
          <button
            class="stage-control__round-button"
            type="button"
            :data-active="modelValue === option.id"
            @click="slideTo(index)"
          >
            {{ option.name }}
          </button>
        </swiper-slide>
      </swiper-container>
    </div>
    <AppIconButton
      v-tooltip="'Próxima anterior'"
      class="stage-control__button"
      color="secondary"
      size="small"
      aria-label="Mostrar próxima rodada"
      :icon="IconChevronRight"
      :disabled="selectedOptionIndex === roundOptions.length - 1"
      @click="slideTo(selectedOptionIndex + 1)"
    />
  </div>
</template>

<script lang="ts">
interface RoundOption {
  id: string;
  name: string;
}
</script>

<script lang="ts" setup>
import type { SwiperElement } from '@/types/Swiper';
import { TournamentStageType, type TournamentStage } from '@/types/Tournament';
import {
  computed, nextTick, onMounted, ref, type PropType,
} from 'vue';
import IconChevronRight from '@/assets/icons/ChevronRight.svg';
import IconChevronLeft from '@/assets/icons/ChevronLeft.svg';
import AppIconButton from './AppIconButton.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  stages: {
    type: Array as PropType<TournamentStage[]>,
    required: true,
  },
});

const roundOptions = computed<RoundOption[]>(() => props.stages.flatMap((stage) => {
  if (stage.type === TournamentStageType.GROUPS) {
    return { id: stage.id, name: stage.name || '' };
  }

  return stage.rounds.map((round) => ({
    id: round.id,
    name: round.name,
  }));
}));

const selectedOptionIndex = computed(() => (
  roundOptions.value.findIndex((option) => option.id === props.modelValue)
));

const swiperContainerRef = ref<SwiperElement | null>(null);

function slideTo(index: number) {
  emit('update:modelValue', roundOptions.value[index].id);
  swiperContainerRef.value?.swiper.slideTo(index);
}

onMounted(async () => {
  await nextTick();
  slideTo(selectedOptionIndex.value);
});
</script>

<style lang="scss" scoped>
.stage-control {
  --base-card--padding: 0.75rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  @include for-tablet-portrait-up {
    gap: 1.5rem;
  }
  &__button {
    flex-shrink: 0;
  }
  &__rounds {
    max-width: fit-content;
    overflow-x: hidden;
    swiper-slide {
      width: max-content;
      &:last-child {
        margin-right: 0 !important;
      }
    }
  }
  &__round-button {
    min-width: 6rem;
    height: 2.25rem;
    padding: 0 0.75rem;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--full;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
    transition:
      background-color $transition--fast,
      border-color $transition--fast,
      color $transition--1;
    &:hover:not([data-active="true"]) {
      border-color: $color--text-300;
    }
    &[data-active="true"] {
      background-color: $color--neutral-100;
      color: $color--text-strong;
    }
  }
}
</style>
