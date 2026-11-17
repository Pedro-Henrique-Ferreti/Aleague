<template>
  <AppMenuItem
    v-if="legsCount === 1"
    type="primary"
    label="Adicionar segundo jogo"
    :icon="IconPlus"
    @click="$emit('addSecondLeg')"
  />
  <AppMenuItem
    v-else
    type="error"
    label="Excluir segundo jogo"
    :icon="IconTrash"
    @click="$emit('removeSecondLeg')"
  />
</template>

<script lang="ts" setup>
import { IconPlus, IconTrash } from '@tabler/icons-vue';

defineProps<{
  legsCount: PlayoffRoundSlot['legs']['length'];
}>();

defineEmits<{
  addSecondLeg: [];
  removeSecondLeg: [];
}>();
</script>
