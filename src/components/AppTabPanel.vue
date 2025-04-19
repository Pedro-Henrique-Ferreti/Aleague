<template>
  <div
    class="tab-panel"
    :class="$attrs.class"
    :data-theme="theme"
    :data-direction="direction"
    :data-justify="justify"
    :data-size="size"
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
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  justify: {
    type: String as PropType<'center' | 'stretch'>,
    default: 'stretch',
  },
  size: {
    type: String as PropType<'small'>,
    default: '',
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
            gap: 0.5rem;
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
  display: flex;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.5rem;
  &[data-size="small"] {
    --tab-button-height: 2rem;
    --tab-button-fnt-size: 0.875rem;
  }
  &[data-theme="light"] {
    --tab-active-bg-color: #{$color--neutral-100};
    background-color: $color--white;
    box-shadow: $shadow--card;
  }
  &[data-theme="dark"] {
    --tab-active-bg-color: #{$color--white};
    --tab-active-shadow: 0 0 1px 0 rgba(122, 122, 122, 0.25);
    background-color: $color--neutral-100;
  }
  &[data-direction="vertical"] {
    @include for-large-tablet-portrait-up {
      --slide-width: auto;
      display: block;
      padding: 0.75rem;
    }
  }
  &[data-justify="center"] {
    @include for-large-tablet-portrait-up {
      margin: 0 auto;
      max-width: fit-content;
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
    height: var(--tab-button-height, 2.5rem);
    padding: 0 0.75rem;
    border-radius: 0.375rem;
    color: $color--text;
    font-size: var(--tab-button-fnt-size, 1rem);
    font-weight: $font-weight--medium;
    transition:
      background-color $transition--fast,
      color $transition--1;
    cursor: pointer;
    &:hover:not([data-active="true"]) {
      background-color: var(--tab-active-bg-color);
      box-shadow: var(--tab-active-shadow, none);
    }
    &[data-active="true"] {
      background-color: var(--tab-active-bg-color);
      color: $color--text-strong;
      box-shadow: var(--tab-active-shadow, none);
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
        outline-offset: -0.125rem;
      }
    }
  }
}
</style>
