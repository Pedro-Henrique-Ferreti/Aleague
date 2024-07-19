<template>
  <form
    class="edit-team-form"
    @submit.prevent="submitForm"
  >
    <AppCard title="Configurações">
      <div class="edit-team-form__fields">
        <TeamEmblemPopup v-model="form.emblem">
          <button
            class="edit-team-form__emblem"
            type="button"
          >
            <img
              class="edit-team-form__emblem-img"
              alt=""
              :src="form.emblem.url"
            />
          </button>
        </TeamEmblemPopup>
        <AppInput
          v-model.trim="form.name"
          id="edit-team-form--name"
          label="Nome da equipe"
          :dirty="v$.name.$dirty"
          :error-message="v$.name.$errors[0]?.$message"
        />
      </div>
    </AppCard>
    <div class="edit-team-form__footer">
      <AppButton
        outline
        :to="{ name: 'show-team', params: { id: team.id } }"
      >
        Cancelar
      </AppButton>
      <AppButton
        type="submit"
        :is-loading="isSaving"
        :disabled="submitButtonIsDisabled"
      >
        Salvar alterações
      </AppButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { TeamDetails, TeamEmblem } from '@/types/Team';
import { computed, type PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { useToast } from '@/composables/toast';
import { requiredValidator } from '@/helpers/validators';
import api from '@/api';
import AppButton from './AppButton.vue';
import AppCard from './AppCard.vue';
import AppInput from './AppInput.vue';
import TeamEmblemPopup from './TeamEmblemPopup.vue';

const router = useRouter();
const toast = useToast();

const props = defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

// Form
const form = ref({
  name: props.team.name,
  emblem: {
    id: props.team.emblem.id,
    url: props.team.emblem.url,
    createdAt: '',
    isDefaultEmblem: false,
    isSystemEmblem: true,
  } as TeamEmblem,
});

const submitButtonIsDisabled = computed(() => (
  form.value.name === props.team.name && form.value.emblem.id === props.team.emblem.id
));

// Validation rules
const v$ = useVuelidate({
  name: {
    required: requiredValidator,
  },
}, form, { $autoDirty: true });

// Submit form
const isSaving = ref(false);

async function submitForm() {
  if (!await v$.value.$validate()) return;

  isSaving.value = true;

  try {
    await api.teamService.updateTeam({
      teamId: props.team.id,
      name: form.value.name,
      emblemId: form.value.emblem.id,
    });

    toast.success('Equipe atualizada com sucesso!');
    router.push({ name: 'show-team', params: { id: props.team.id } });
  } catch (error: any) {
    toast.error('Não foi possivel atualizar a equipe. Por favor, tente novamente.');
  } finally {
    isSaving.value = false;
  }
}
</script>

<style lang="scss" scoped>
.edit-team-form {
  &__fields {
    display: grid;
    gap: 1.5rem;
    @include for-tablet-portrait-up {
      grid-template-columns: auto 1fr;
    }
  }
  &__emblem {
    --size: 4.5rem;
    @include for-tablet-portrait-up {
      --size: 6rem;
    }
    display: grid;
    place-items: center;
    width: var(--size);
    height: var(--size);
    border: 1px solid $color--neutral-100;
    border-radius: 0.75rem;
  }
  &__emblem-img {
    max-width: 83%;
    max-height: 83%;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    width: 100%;
    margin-top: 2.5rem;
  }
}
</style>
