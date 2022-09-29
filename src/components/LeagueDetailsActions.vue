<template>
  <section>
    <SectionHeader heading="h3">
      Ações
    </SectionHeader>
    <AppButton
      color="dangerGray"
      @click="toggleShowModalDelete"
    >
      Excluir campeonato
    </AppButton>
    <LeagueDetailsActionsModalDelete
      :show="showModalDelete"
      @close="toggleShowModalDelete"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SectionHeader from './SectionHeader.vue';
import LeagueDetailsActionsModalDelete from './LeagueDetailsActionsModalDelete.vue';

const showModalDelete = ref(false);

function toggleShowModalDelete() {
  showModalDelete.value = !showModalDelete.value;
}
</script>
