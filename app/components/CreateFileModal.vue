<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="modalTitle"
    :submit-button-label="form.step === FormStep.SELECT_FILE_TYPE ? 'Próximo' : 'Criar'"
    :submit-button-disabled="submitButtonDisabled"
    :show-close-icon="false"
    :show-back-button="form.step === FormStep.CREATE_FILE"
    @open="onOpenModal"
    @submit="submitForm"
    @back-button-click="form.step = FormStep.SELECT_FILE_TYPE"
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
    <template v-else>
      <TournamentFormFields
        v-if="form.fileType === SourceFileType.TOURNAMENT"
        v-model="form.tournamentFields"
        :form-namespace="FormNamespaces.CREATE_FILE_MODAL"
      />
      <CollectionFormFields
        v-else
        v-model="form.collectionFields"
        :form-namespace="FormNamespaces.CREATE_FILE_MODAL"
      />
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import { IconPlus } from '@tabler/icons-vue';
import IconFile from '@/assets/icons/File.svg';
import IconFolder from '@/assets/icons/Folder.svg';
import { newCollectionFile, newTournamentFile } from '~/helpers/file';
import { newTournament } from '~/helpers/tournament';

enum FormStep {
  SELECT_FILE_TYPE,
  CREATE_FILE,
}

interface CreateFileForm {
  fileType: SourceFileType | undefined;
  tournamentFields: TournamentForm;
  collectionFields: CollectionForm;
  step: FormStep;
}

defineOptions({
  inheritAttrs: false,
});

const fileStore = useFileStore();

const { r$ } = useCollectScope(FormNamespaces.CREATE_FILE_MODAL);

function newForm(): CreateFileForm {
  return {
    fileType: undefined,
    tournamentFields: {
      name: '',
      icon: ICON_OPTIONS[0]!.value,
      tags: [],
      showCountry: false,
    },
    collectionFields: {
      name: '',
    },
    step: FormStep.SELECT_FILE_TYPE,
  };
}

const modalIsOpen = ref(false);

const form = ref(newForm());

const modalTitle = computed(() => {
  if (form.value.step === FormStep.SELECT_FILE_TYPE) return 'Novo arquivo';
  return (form.value.fileType === SourceFileType.TOURNAMENT) ? 'Novo campeonato' : 'Nova coleção';
});

const submitButtonDisabled = computed(() => {
  return form.value.step === FormStep.SELECT_FILE_TYPE ? form.value.fileType === undefined : r$.$invalid;
});

function onOpenModal() {
  form.value = newForm();
}

async function submitForm() {
  if (form.value.step === FormStep.SELECT_FILE_TYPE) {
    form.value.step = FormStep.CREATE_FILE;
    form.value.tournamentFields = newForm().tournamentFields;
    form.value.collectionFields = newForm().collectionFields;
    return;
  }

  const { valid } = await r$.$validate();

  if (!valid) return;

  modalIsOpen.value = false;

  if (form.value.fileType === SourceFileType.TOURNAMENT) {
    fileStore.addFileToStore(newTournamentFile(newTournament(form.value.tournamentFields)));
  } else {
    fileStore.addFileToStore(newCollectionFile(form.value.collectionFields));
  }
}
</script>
