<template>
  <form
    class="fixtures"
    @submit.prevent
  >
    <AppCard title="Horários das partidas">
      <p>
        Você pode editar ou criar conjuntos de horários para as partidas e escolher
        para quais rodadas os conjuntos serão aplicados.
      </p>
      <div class="fixtures__groups">
        <div
          v-for="n in 3"
          :key="n"
        >
          <div class="fixtures__group-header">
            <h3 class="fixtures__group-title">
              Conjunto {{ n }}
            </h3>
            <AppTextButton :icon-left="IconPencil">
              4/15 rodadas
            </AppTextButton>
          </div>
          <div class="fixtures__group-items">
            <AppIconButton
              color="secondary"
              :icon="IconPlus"
            />
          </div>
        </div>
      </div>
      <div class="fixtures__card-footer">
        <AppTextButton :icon-left="IconPlus">
          Novo conjunto
        </AppTextButton>
      </div>
    </AppCard>
    <AppButton
      class="fixtures__form-button"
      type="submit"
    >
      Salvar alterações
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
import IconPlus from '@/assets/icons/Plus.svg';
import IconPencil from '@/assets/icons/Pencil.svg';
import AppCard from './AppCard.vue';
import AppIconButton from './AppIconButton.vue';
import AppTextButton from './AppTextButton.vue';
import AppButton from './AppButton.vue';
</script>

<style lang="scss" scoped>
.fixtures {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  &__groups {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  &__group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  &__group-title {
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
  &__group-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--medium;
  }
  &__card-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
  &__form-button {
    margin-left: auto;
  }
}
</style>
