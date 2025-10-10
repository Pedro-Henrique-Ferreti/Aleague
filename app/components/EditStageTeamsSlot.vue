<template>
  <div class="flex gap-0.5 w-full h-2.5 p-0.5 border border-dashed border-base-200 rounded-lg">
    <span
      v-if="!team"
      class="opacity-60"
    >
      Em aberto
    </span>
    <template v-else>
      <img
        class="size-1.5"
        alt="Team badge"
        :src="team?.badge || ''"
      />
      <span>{{ team.name }}</span>
      <button
        v-text="'✕'"
        type="button"
        class="btn btn-xs btn-circle btn-ghost ml-auto"
        aria-label="Remove team"
        @click="$emit('remove')"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
const { getTeamById } = useTeamStore();

defineEmits<{
  (e: 'remove'): void;
}>();
const props = defineProps<{
  teamId: Team['id'] | null;
}>();

const team = computed(() => props.teamId ? getTeamById(props.teamId) : null);
</script>
