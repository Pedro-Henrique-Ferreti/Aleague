<template>
  <AppContextMenu>
    <button
      v-tooltip="team.name"
      class="rival-team"
      type="button"
    >
      <img
        class="rival-team__emblem"
        :src="team.emblem.url"
        :alt="`${team.name}'s emblem'`"
      />
    </button>
    <template #menu="{ hide }">
      <AppContextMenuItem
        text="Ver equipe"
        :icon="IconArrowRight"
        :to="{ name: 'show-team', params: { id: team.id } }"
      />
      <hr />
      <AppContextMenuItem
        text="Remover rival"
        color="danger"
        :icon="IconDelete"
        @click="$emit('remove'), hide()"
      />
    </template>
  </AppContextMenu>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RivalTeam } from '@/types/Team';
import IconDelete from '@/assets/icons/Delete.svg';
import IconArrowRight from '@/assets/icons/ArrowRight.svg';
import AppContextMenu from './AppContextMenu.vue';
import AppContextMenuItem from './AppContextMenuItem.vue';

defineEmits(['remove']);
defineProps({
  team: {
    type: Object as PropType<RivalTeam>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.rival-team {
  display: grid;
  place-items: center;
  width: 5rem;
  height: 5rem;
  border: 1px solid $color--neutral-100;
  border-radius: $radius--medium;
  &__emblem {
    max-width: 4rem;
    max-height: 4rem;
  }
}
</style>
