<template>
  <div class="page-header">
    <div
      v-if="breadcrumbItems.length > 0"
      class="page-header__breadcrumbs"
    >
      <div
        v-for="(item, index) in breadcrumbItems"
        class="page-header__breadcrumb-item"
        :key="index"
      >
        <component
          class="page-header__breadcrumb-link"
          :is="(typeof item === 'string') ? 'span' : 'RouterLink'"
          :to="(typeof item === 'string') ? undefined : item.to"
        >
          {{ (typeof item === 'string') ? item : item.title }}
        </component>
        <IconChevron
          v-if="index < breadcrumbItems.length - 1"
          class="page-header__breadcrumb-icon"
        />
      </div>
    </div>
    <div
      v-if="title"
      class="page-header__content"
    >
      <h1 class="h1">
        {{ title }}
      </h1>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Breadcrumb } from '@/types/Breadcrumb';
import IconChevron from '@/assets/icons/IconChevron.svg';

defineProps({
  title: {
    type: String,
    default: '',
  },
  breadcrumbItems: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => ([]),
  },
});
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 2rem;
  &__breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
    + .page-header__content {
      margin-top: 1rem;
    }
  }
  &__breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  &__breadcrumb-link {
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
    &:is(a):hover {
      text-decoration: underline;
    }
  }
  &__breadcrumb-icon {
    flex-shrink: 0;
    width: 0.625rem;
    height: auto;
    transform: rotate(-90deg);
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
  }
}
</style>
