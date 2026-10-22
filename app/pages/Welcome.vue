<template>
  <NuxtLayout name="blank">
    <div class="welcome">
      <header class="container-md flex justify-end pt-2 gap-0.5">
        <AuthModal>
          <template #trigger="{ openModal }">
            <AppButton
              class="btn-outline btn-primary btn-sm"
              label="Criar uma conta"
              @click="openModal"
            />
            <AppButton
              class="btn-primary btn-sm"
              label="Entrar"
              @click="openModal"
            />
          </template>
        </AuthModal>
      </header>
      <main class="container-md grid gap-5 pb-4 pt-3 desktop:pb-6 desktop:gap-7">
        <WelcomeHero />
        <WelcomeFeatures />
        <WelcomeStepsCard />
      </main>
      <footer class="border-t border-base-200 py-1.5 text-center text-xs text-base-content/50">
        Aleague · Crie e simule seus campeonatos
      </footer>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter();
const fileStore = useFileStore();

watch(() => fileStore.hasImportedFiles, () => {
  router.push({ name: 'home' });
});
</script>

<style scoped>
@reference '@/assets/css/main.css';

.welcome {
  @apply relative;
  &::after {
    @apply absolute inset-0 content-[''] -z-10;
    background-image:
      linear-gradient(to right, color-mix(in oklab, var(--color-base-content) 8%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in oklab, var(--color-base-content) 8%, transparent) 1px, transparent 1px);
    background-size: 3rem 3rem;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
  }
}
</style>
