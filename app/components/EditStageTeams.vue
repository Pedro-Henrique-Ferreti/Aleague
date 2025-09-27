<template>
  <AppModal
    title="Editar equipes"
    size="xl"
    @open="onOpenModal"
  >
    <template #trigger="{ open }">
      <AppButton
        class="btn-primary btn-soft"
        label="Equipes"
        :class="$attrs.class"
        :icon-left="IconUsersGroup"
        @click="open"
      />
    </template>
    <div class="flex gap-1 mb-2 justify-center relative">
      <EditStageTeamsInput />
      <div class="absolute flex gap-0.75 right-2">
        <div class="tooltip" data-tip="Preencher participantes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            :icon-left="IconWand"
          />
        </div>
        <div class="tooltip" data-tip="Embaralhar equipes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            :icon-left="IconArrowsShuffle"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
      <div
        v-for="group in form"
        class="card card-border relative"
        :key="group.order"
      >
        <div class="card-body p-1 grid gap-0.5">
          <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2">
            Grupo {{ group.order }}
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
type TeamSlot = Team | null;

interface FormGroup {
  order: number;
  teams: TeamSlot[];
}
</script>

<script lang="ts" setup>
import { IconArrowsShuffle, IconUsersGroup, IconWand } from '@tabler/icons-vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  stage: TournamentGroupsStage;
}>();

const form = ref<FormGroup[]>([]);

function onOpenModal() {
  form.value = props.stage.groups.map((group) => ({
    order: group.order,
    teams: group.standings.map((entry) => entry.team),
  }));
}
</script>
