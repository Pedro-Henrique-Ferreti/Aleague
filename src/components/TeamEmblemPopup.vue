<template>
  <Dropdown
    theme="app-popup-large"
    auto-hide
    :triggers="['click']"
  >
    <slot />
    <template #popper="{ hide }">
      <div class="team-emblem__list">
        <button
          v-for="emblem in teamEmblems"
          class="team-emblem__item"
          type="button"
          :key="emblem.id"
          :data-selected="modelValue.id === emblem.id"
          @click="$emit('update:modelValue', emblem), hide()"
        >
          <img
            class="team-emblem__item-image"
            alt=""
            :src="emblem.url"
          />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import type { TeamEmblem } from '@/types/Team';
import { onMounted, ref, type PropType } from 'vue';
import { Dropdown } from 'floating-vue';
import api from '@/api';

defineEmits(['update:modelValue']);
const props = defineProps({
  emblems: {
    type: Array as PropType<TeamEmblem[]>,
    default: () => ([]),
  },
  modelValue: {
    type: Object as PropType<TeamEmblem>,
    default: () => ({}),
  },
});

// Team emblems
const teamEmblems = ref<TeamEmblem[]>(props.emblems);
const isLoading = ref(false);
const errorMessage = ref('');

// Get team emblems
async function getTeamEmblems() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getTeamEmblems();

    teamEmblems.value = data;
  } catch (error) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar a lista de escudos.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (teamEmblems.value.length === 0) getTeamEmblems();
});
</script>

<style lang="scss" scoped>
.team-emblem {
  &__list {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(2.25rem, 1fr));
    gap: 0.5rem;
  }
  &__item {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: $radius--small;
    transition: background-color $transition--fastest;
    &:hover:not([data-selected="true"]) {
      background-color: $color--neutral-200;
    }
    &[data-selected="true"] {
      background-color: $color--blue-1100;
    }
  }
  &__item-image {
    max-width: 88%;
    max-height: 88%;
  }
}
</style>
