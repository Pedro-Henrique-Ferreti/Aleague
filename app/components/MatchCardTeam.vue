<template>
  <div
    class="flex items-center gap-0.5"
    :class="{ 'flex-row-reverse text-right': align === 'right' }"
  >
    <template v-if="teamDetails">
      <img
        class="size-1.5 shrink-0"
        alt="Team badge"
        :src="teamDetails.badge"
      />
      <span>{{ teamDetails.name }}</span>
    </template>
    <template v-else>
      <IconShieldFilled class="size-1.5 shrink-0 fill-gray-300" />
      <span>A definir</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { IconShieldFilled } from '@tabler/icons-vue';

const { getTeamById } = useTeamStore();

const props = defineProps<{
  team?: TeamDetails['id'] | null;
  align?: 'right';
}>();

const teamDetails = computed(() => getTeamById(props.team));
</script>