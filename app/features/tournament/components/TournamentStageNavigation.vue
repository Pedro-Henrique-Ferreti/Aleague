<template>
  <div class="flex gap-1 mb-2">
    <AppTablist class="grow">
      <AppTab
        v-for="option in stageStore.stageOptions"
        :key="option.id"
        class="basis-1/2 @min-[35rem]/main:basis-1/4 @min-[56rem]/main:basis-1/5"
        :label="option.name"
        :is-active="stageStore.selectedStageId === option.id"
        @click="stageStore.selectedStageId = option.id"
      />
      <BaseButton
        class="tab"
        aria-label="Adicionar fase"
        @click="stageFormModalMode = 'create'"
      >
        <IconPlus
          class="size-1"
          stroke="3"
        />
      </BaseButton>
    </AppTablist>
    <div class="flex gap-0.5 items-center">
      <AppButton
        label="Equipes"
        class="btn-ghost btn-sm"
        :icon-left="IconUsersGroup"
        @click="stageSeedingModalIsOpen = true"
      />
      <AppMenu
        tooltip="Mais opções"
        class="btn-square btn-sm btn-ghost"
        aria-label="Opções da fase"
        dropdown-class="dropdown-end"
        :icon-left="IconDotsVertical"
        :icon-right="false"
      >
        <AppMenuItem
          label="Editar fase"
          :icon="IconPencil"
          @click="stageFormModalMode = 'edit'"
        />
        <AppMenuItem
          type="error"
          label="Excluir fase"
          :icon="IconTrash"
          @click="showDeleteStageDialog = true"
        />
      </AppMenu>
    </div>
    <StageFormModal
      :is-open="!!stageFormModalMode"
      :stage="stageFormModalMode === 'edit' ? stageStore.activeStage : undefined"
      @update:is-open="stageFormModalMode = undefined"
    />
    <template v-if="stageStore.activeStage">
      <StageSeedingModal
        v-model:is-open="stageSeedingModalIsOpen"
        :key="stageStore.activeStage.id"
        :allow-empty-slots="allowEmptySlots"
        :stage="stageStore.activeStage"
      />
      <AppDialog
        v-model:is-open="showDeleteStageDialog"
        type="delete"
        title="Excluir fase"
        @confirm="stageStore.deleteActiveStage"
      >
        <p>Você tem certeza que deseja excluir a fase <strong>{{ stageStore.activeStage?.name }}</strong>? Essa ação não poderá ser desfeita.</p>
      </AppDialog>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { IconDotsVertical, IconPencil, IconPlus, IconTrash, IconUsersGroup } from '@tabler/icons-vue';

const stageStore = useStageStore();

const stageFormModalMode = ref<'create' | 'edit'>();
const stageSeedingModalIsOpen = ref(false);
const showDeleteStageDialog = ref(false);

const allowEmptySlots = computed(() => (
  stageStore.activeStage?.type === StageType.GROUP && stageStore.activeStage.matchweeks.length === 0
));
</script>
