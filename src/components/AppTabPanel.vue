<template>
  <div
    class="tab-panel | app-base-card"
    :class="$attrs.class"
    :data-direction="direction"
  >
    <div class="tab-panel__tabs">
      <swiper-container
        ref="swiperContainerRef"
        space-between="8"
        slides-per-view="auto"
        init="false"
      >
        <swiper-slide
          v-for="tab in items"
          :key="tab.id"
        >
          <label :for="tab.elementId || tab.id">
            <input
              v-model="inputValue"
              class="tab-panel__input"
              type="radio"
              :id="tab.elementId || tab.id"
              :name="tab.name"
              :value="tab.id"
              @keypress.enter="($event.target as HTMLInputElement).click()"
            />
            <span
              v-text="tab.name"
              class="tab-panel__tab"
              :data-active="inputValue === tab.id"
            />
          </label>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
  <TransitionFade>
    <slot :active-tab-id="inputValue" />
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types';
import type { SwiperElement } from '@/types/Swiper';
import type { TabPanelTab } from '@/types/TabPanel';
import {
  computed, onMounted, ref, watchEffect, type PropType,
} from 'vue';
import { Breakpoints } from '@/constants/breakpoints';
import TransitionFade from './TransitionFade.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  items: {
    type: Array as PropType<TabPanelTab[]>,
    required: true,
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
});

const activeTabId = ref(props.items[0].id);

const inputValue = computed({
  get() {
    return (props.modelValue !== null) ? props.modelValue : activeTabId.value;
  },
  set(value) {
    activeTabId.value = value;
    emit('update:modelValue', value);
  },
});

const swiperContainerRef = ref<SwiperElement | null>(null);

watchEffect(() => {
  const index = props.items.findIndex((item) => item.id === inputValue.value);

  if (index !== -1) {
    swiperContainerRef.value?.swiper.slideTo(index);
  }
});

onMounted(() => {
  if (!swiperContainerRef.value) return;

  if (props.direction === 'vertical') {
    Object.assign(swiperContainerRef.value, {
      breakpoints: {
        [Breakpoints.LARGE_TABLET_PORTRAIT_UP]: {
          allowSlideNext: false,
          allowSlidePrev: false,
          spaceBetween: 0,
        },
      },
      injectStyles: [`
        @media (min-width: ${Breakpoints.LARGE_TABLET_PORTRAIT_UP}px) {
          .swiper-wrapper {
            display: grid;
            gap: 0.25rem;
            width: 100%;
          }
        }
      `],
    } as SwiperOptions);
  }

  (swiperContainerRef.value as any).initialize();
});
</script>

<style lang="scss" scoped>
.tab-panel {
  --base-card--padding: 0.75rem;
  display: flex;
  justify-content: center;
  border-radius: 0.75rem;
  &[data-direction="vertical"] {
    @include for-large-tablet-portrait-up {
      --slide-width: auto;
      display: block;
    }
  }
  &__tabs {
    overflow-x: hidden;
    swiper-slide {
      width: var(--slide-width, max-content);
      &:last-child {
        margin-right: 0 !important;
      }
    }
  }
  &__tab {
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding: 0 0.75rem;
    border-radius: 0.375rem;
    font-weight: $font-weight--medium;
    cursor: pointer;
    &[data-active="true"] {
      background-color: $color--neutral-50;
      color: $color--blue-800;
    }
    transition:
      background-color $transition--fast,
      color $transition--1;
    &:hover:not([data-active="true"]) {
      background-color: $color--neutral-50;
    }
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    &:focus-visible {
      + .tab-panel__tab {
        outline: 2px solid $color--black;
      }
    }
  }
}
</style>
