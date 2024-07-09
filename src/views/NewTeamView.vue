<template>
  <main>
    <PageHeader
      :breadcrumb-items="[{ title: 'Equipes', to: { name: 'teams' } }, 'Adicionar equipe']"
    />
    <div class="card | app-base-card">
      <h1 class="h1">
        Adicionar equipe
      </h1>
      <p>O que você gostaria de fazer?</p>
      <div class="card__links">
        <RouterLink
          class="card__link"
          data-theme="blue"
          to="/"
        >
          <div class="card__link-icon-wrapper">
            <IconListSearch />
          </div>
          <p>Procurar equipes na lista</p>
        </RouterLink>
        <RouterLink
          class="card__link"
          :to="{ name: 'team-list' }"
        >
          <div class="card__link-icon-wrapper">
            <IconCreateMultiple />
          </div>
          <p>Procurar equipes na lista</p>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import IconListSearch from '@/assets/icons/IconListSearch.svg';
import IconCreateMultiple from '@/assets/icons/IconCreateMultiple.svg';
import PageHeader from '@/components/PageHeader.vue';
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  .h1 {
    margin-bottom: 1rem;
  }
  &__links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    margin-top: 2.5rem;
    @include for-tablet-portrait-up {
      flex-direction: row;
    }
  }
  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    padding-top: 2.5rem;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--large;
    font-weight: $font-weight--medium;
    transition: border-color $transition--fastest linear;
    outline-color: $color--focus-ring;
    &:hover {
      border-color: $color--text-300;
    }
    @include for-tablet-portrait-up {
      max-width: 12.75rem;
    }
    &[data-theme="blue"] {
      --icon-bg-color: #{$color--blue-100};
      --icon-color: #{$color--blue-800};
    }
  }
  &__link-icon-wrapper {
    display: grid;
    place-items: center;
    width: 6rem;
    height: 6rem;
    margin-bottom: 2rem;
    background-color: var(--icon-bg-color, #{$color--primary-100});
    color: var(--icon-color, #{$color--primary});
    border-radius: 1rem;
  }
}
</style>
