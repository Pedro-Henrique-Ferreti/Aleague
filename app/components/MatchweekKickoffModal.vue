<template>
  <AppModal
    v-model:is-open="isOpen"
    ref="modalRef"
    title="Editar datas"
    size="xl"
    @open="resetKickoffGroups"
    @submit="assignKickoffs"
  >
    <div class="flex gap-1 mb-2 justify-center relative">
      <BaseSelect
        v-model="form.kickoffType"
        class="max-w-15"
        :options="MATCHWEEK_KICKOFF_OPTIONS"
      />
      <div class="absolute flex gap-0.75 right-1.5">
        <div
          class="tooltip"
          data-tip="Preencher partidas"
        >
          <AppButton
            class="btn-square btn-accent btn-soft"
            :icon-left="IconWand"
            @click="fillSlots"
          />
        </div>
        <div
          class="tooltip"
          data-tip="Remover partidas"
        >
          <AppButton
            class="btn-square btn-accent btn-soft"
            :icon-left="IconRefresh"
            @click="resetKickoffGroups"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
      <div
        v-for="group in form.kickoffGroups"
        :key="group.time"
        class="card card-border relative"
      >
        <div class="card-body p-1 flex gap-0.5">
          <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2 capitalize">
            {{ getKickoffDisplayText(group.time) }}
          </div>
          <MatchCard
            v-for="match in group.matches"
            :key="match.id"
            class="border border-dashed border-base-200 rounded-lg p-0.5"
            :match="match"
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { IconRefresh, IconWand } from '@tabler/icons-vue';
import { getKickoffDisplayText } from '~/helpers/match';

interface KickoffGroup {
  time: MatchKickoff;
  matches: Match[];
}

const props = defineProps<{
  matches: Match[];
}>();
const emit = defineEmits<{
  kickoffsUpdated: [value: Matchweek['matches']];
}>();
const isOpen = defineModel<boolean>('is-open');

const modalRef = useTemplateRef('modalRef');

const form = ref({
  kickoffType: MatchweekKickoff.WEEKDAY,
  kickoffGroups: [] as KickoffGroup[],
});

function resetKickoffGroups() {
  form.value.kickoffGroups = KICKOFF_TIMES[form.value.kickoffType].map(time => ({
    time,
    matches: [],
  }));
}

watchEffect(resetKickoffGroups);

function fillSlots() {
  resetKickoffGroups();

  for (const match of props.matches) {
    const randomIndex = Math.floor(Math.random() * form.value.kickoffGroups.length);

    form.value.kickoffGroups[randomIndex]?.matches.push(match);
  }
}

function assignKickoffs() {
  emit('kickoffsUpdated', props.matches.map((match): Match => ({
    ...match,
    kickoff: (
      form.value.kickoffGroups.find(g => g.matches.find(m => m.id === match.id))?.time || null
    ),
  })));

  modalRef.value?.close();
}
</script>
