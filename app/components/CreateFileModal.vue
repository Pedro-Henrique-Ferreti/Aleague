<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="modalTitle"
    :submit-button-label="form.step === FormStep.SELECT_FILE_TYPE ? 'Próximo' : 'Criar'"
    :submit-button-disabled="submitButtonDisabled"
    :show-close-icon="false"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ openModal }">
      <AppButton
        label="Criar arquivo"
        :class="$attrs.class"
        :icon-left="IconPlus"
        @click="openModal"
      />
    </template>
    <template v-if="form.step === FormStep.SELECT_FILE_TYPE">
      <p>Selecione o tipo de arquivo que você gostaria de criar.</p>
      <div class="mt-1.5 grid gap-0.75">
        <RadioCard
          v-model="form.fileType"
          name="file-type"
          label="Campeonato"
          description="Um campeonato com fases de grupos ou eliminatórias."
          :value="SourceFileType.TOURNAMENT"
          :icon="IconFile"
        />
        <RadioCard
          v-model="form.fileType"
          name="file-type"
          label="Coleção"
          description="Uma coleção para organizar vários campeonatos."
          :value="SourceFileType.COLLECTION"
          :icon="IconFolder"
        />
      </div>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import { IconPlus } from '@tabler/icons-vue';
import IconFile from '@/assets/icons/File.svg';
import IconFolder from '@/assets/icons/Folder.svg';

enum FormStep {
  SELECT_FILE_TYPE,
  CREATE_FILE,
}

interface CreateFileForm {
  fileType: SourceFileType | undefined;
  step: FormStep;
}

defineOptions({
  inheritAttrs: false,
});

function newForm(): CreateFileForm {
  return {
    fileType: undefined,
    step: FormStep.SELECT_FILE_TYPE,
  };
}

const modalIsOpen = ref(false);

const form = ref<CreateFileForm>(newForm());

const modalTitle = computed(() => {
  if (form.value.step === FormStep.SELECT_FILE_TYPE) return 'Novo arquivo';
  return (form.value.fileType === SourceFileType.TOURNAMENT) ? 'Novo campeonato' : 'Nova coleção';
});

const submitButtonDisabled = computed(() => {
  if (form.value.step === FormStep.SELECT_FILE_TYPE) {
    return form.value.fileType === undefined;
  }
  return false;
});

function onOpenModal() {
  form.value = newForm();
}

function submitForm() {
  if (form.value.step === FormStep.SELECT_FILE_TYPE) {
    form.value.step = FormStep.CREATE_FILE;
  }
}
</script>
