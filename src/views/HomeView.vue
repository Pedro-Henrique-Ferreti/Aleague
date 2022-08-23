<template>
  <main class="home container-small">
    <AppTitle>{{ greetingMessage }}</AppTitle>
    <p>Bem-vindo ao Aleague! Você pode escolher uma das opções abaixo.</p>
    <div class="home__cards">
      <HomeCard
        theme="tertiary"
        title="Minhas equipes"
        description="Crie e gerencie suas equipes."
        icon="team-shield"
        aria-label="Ir para Minhas equipes"
        :path="{ name: 'teams' }"
      />
      <HomeCard
        title="Meus campeonatos"
        description="Visualize seus campeonatos e insira resultados para as partidas."
        icon="trophy"
        aria-label="Ir para Meus campeonatos"
        :path="{ name: 'home' }"
      />
      <HomeCard
        theme="secondary"
        title="Criar campeonato"
        description="Defina as regras e as equipes participantes para um campeonato totalmente novo."
        icon="plus"
        aria-label="Ir para Criar campeonato"
        :path="{ name: 'home' }"
      />
    </div>
    <img
      class="home__image"
      src="/images/receptionist-working.svg"
      alt="Receptionist working with a laptop on a desk"
      draggable="false"
    />
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import AppTitle from '@/components/AppTitle.vue';
import HomeCard from '@/components/HomeCard.vue';

const userStore = useUserStore();

const greetingMessage = computed(() => {
  const curentHour = new Date().getHours();
  let greeting = 'Boa noite';

  if (curentHour < 13) {
    greeting = 'Bom dia';
  } else if (curentHour < 19) {
    greeting = 'Boa tarde';
  }

  return `${greeting}, ${userStore.user?.username}`;
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  &__cards {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
    @include for-large-tablet-landscape-up {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }
  }
  &__image {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    margin-top: 3rem;
  }
}
</style>
