<template>
  <section class="features container-small">
    <SectionTitle>O que o Aleague oferece</SectionTitle>
    <div class="features__cards">
      <div class="features__card">
        <div class="features__card-badge">
          <img
            class="features__card-icon"
            src="/images/medal.svg"
            alt="Medal"
            draggable="false"
          />
        </div>
        <h3 class="features__card-title">
          Criação de Campeonatos
        </h3>
        <p class="features__card-description">
          Vários formatos e opções disponíveis
        </p>
      </div>
      <div class="features__card">
        <div class="features__card-badge">
          <img
            class="features__card-icon"
            src="/images/analysis-chart.svg"
            alt="Chart"
            draggable="false"
          />
        </div>
        <h3 class="features__card-title">
          Análise de Estatísticas
        </h3>
        <p class="features__card-description">
          Histórico, partidas recentes e desempenho
        </p>
      </div>
      <div class="features__card">
        <div class="features__card-badge">
          <img
            class="features__card-icon"
            src="/images/check-certification.svg"
            alt="Certification"
            draggable="false"
          />
        </div>
        <h3 class="features__card-title">
          Regras Customizadas
        </h3>
        <p class="features__card-description">
          Escolha as regras para seus campeonatos
        </p>
      </div>
      <div class="features__card">
        <div class="features__card-badge">
          <img
            class="features__card-icon"
            src="/images/football.svg"
            alt="Football"
            draggable="false"
          />
        </div>
        <h3 class="features__card-title">
          Equipes Personizadas
        </h3>
        <p class="features__card-description">
          Nomes, cores, escudos e mais
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionTitle from './LandingSectionTitle.vue';
</script>

<style lang="scss" scoped>
.features {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  &__cards {
    display: grid;
    gap: 2rem;
    width: 100%;
    margin-top: 2.5rem;
    @include for-tablet-landscape-up {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 16rem;
    padding: 1.5rem;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.75rem;
    transition:
      transform $transition--fast ease-in-out,
      box-shadow $transition--fast ease-in-out;
    &:hover {
      transform: scale(1.005);
      box-shadow: $shadow--medium;
    }
    @include for-tablet-landscape-up {
      min-height: 16rem;
    }
  }
  &__card-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background-color: $color--tertiary;
    border-radius: 50%;
  }
  &__card-icon {
    width: 3.5rem;
  }
  &__card-title {
    margin-top: 1.5rem;
    color: $color--text-darken;
    font-size: 1.25rem;
    font-weight: $font-weight--semibold;
  }
  &__card-description {
    margin-top: 1rem;
    font-size: 1.125rem;
  }
}
</style>
