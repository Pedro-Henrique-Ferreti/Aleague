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
    <ModalDelete
      :show="showModalDelete"
      @close="toggleShowModalDelete"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SectionHeader from './SectionHeader.vue';
import ModalDelete from './CompetitionDetailsActionsModalDelete.vue';

const showModalDelete = ref(false);

function toggleShowModalDelete() {
  showModalDelete.value = !showModalDelete.value;
}
</script>
