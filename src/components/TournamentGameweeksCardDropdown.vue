<template>
  <Dropdown
    v-model:shown="menuIsOpen"
    theme="app-dropdown"
    auto-hide
    placement="bottom"
    :triggers="['click']"
  >
    <slot />
    <template #popper>
      <div class="gameweeks">
        <AppRadioInput
          v-for="n in gameweekCount"
          v-model="gameweek"
          class="gameweeks__radio"
          size="small"
          :value="n"
          :key="n"
          :text="n.toString()"
          @update:model-value="menuIsOpen = false"
        />
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Dropdown } from 'floating-vue';
import AppRadioInput from './AppRadioInput.vue';

defineProps({
  gameweekCount: {
    type: Number,
    required: true,
  },
});
const gameweek = defineModel('gameweek', { type: Number, required: true });

const menuIsOpen = ref(false);
</script>

<style lang="scss" scoped>
.gameweeks {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 0.25rem;
  padding: 0.5rem;
  &__radio {
   min-width: 2.5rem;
  }
}
</style>
