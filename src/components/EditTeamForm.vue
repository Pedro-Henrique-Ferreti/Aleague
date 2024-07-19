<template>
  <form
    class="edit-team-form"
    @submit.prevent
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
          v-model="form.name"
          id="edit-team-form--name"
          label="Nome da equipe"
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
      <AppButton type="submit">
        Salvar alterações
      </AppButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { TeamDetails, TeamEmblem } from '@/types/Team';
import { type PropType, ref } from 'vue';
import AppButton from './AppButton.vue';
import AppCard from './AppCard.vue';
import AppInput from './AppInput.vue';
import TeamEmblemPopup from './TeamEmblemPopup.vue';

const props = defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

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
