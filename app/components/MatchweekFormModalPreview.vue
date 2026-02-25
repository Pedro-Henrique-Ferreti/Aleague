<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="store.showFormStep(MatchweekFormStep.SELECT_RULES)"
    />
    <div class="flex items-center gap-0.75">
      <AppTooltip
        class="tooltip-left"
        label="Gerar novamente"
      >
        <AppButton
          class="btn-square btn-accent btn-soft"
          aria-label="Gerar novamente"
          :icon-left="IconRefresh"
          :disabled="store.isCreatingMatchweeks"
          @click="store.getNewMatchweeks"
        />
      </AppTooltip>
    </div>
  </div>
  <LoadingIndicator
    v-if="store.isCreatingMatchweeks"
    class="min-h-10"
    message="Criando rodadas. Por favor, aguarde..."
  />
  <template v-else>
    <AppAlert
      v-if="store.matchweekList && !store.matchweekList.isBalanced"
      class="mb-2"
      message="Não foi possível criar a quantidade escolhida de rodadas. Se desejar, você pode alterar as configurações da fase ou das partidas."
    />
    <div class="grid gap-1 gap-y-1.5 tablet-md:grid-cols-2 desktop:grid-cols-3">
      <MatchweekFormModalPreviewCard
        v-for="matchweek in store.matchweekList?.matchweeks"
        :key="matchweek.week"
        :matchweek="matchweek"
      />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { IconArrowNarrowLeft, IconRefresh } from '@tabler/icons-vue';

const store = useMatchweekFormStore();
</script>
