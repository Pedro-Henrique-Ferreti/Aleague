<template>
  <div class="text-center">
    <div class="text-xl font-semibold mb-0.5">Nenhuma partida disponível</div>
    <template v-if="activeGroupStage && isGroupStageSeeded(activeGroupStage.groups)">
      <p>Clique no botão abaixo para configurar as partidas.</p>
      <MatchweekFormModal v-slot="{ openModal }">
        <AppButton
          class="btn-accent btn-wide mt-2"
          label="Configurar partidas"
          :icon-left="IconRefresh"
          @click="openModal"
        />
      </MatchweekFormModal>
    </template>
    <template v-else-if="activeGroupStage">
      <p>Adicione todas as equipes antes de gerar as partidas.</p>
      <StageSeedingModal
        v-slot="{ openModal }"
        :stage="activeGroupStage"
      >
        <AppButton
          class="btn-primary btn-soft btn-wide mt-2"
          label="Equipes"
          :icon-left="IconUsersGroup"
          @click="openModal"
        />
      </StageSeedingModal>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { IconRefresh, IconUsersGroup } from '@tabler/icons-vue';
import { isGroupStageSeeded } from '~/helpers/group-stage';

const { activeGroupStage } = storeToRefs(useStageStore());
</script>
