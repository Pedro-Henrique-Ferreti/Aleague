<template>
  <div class="landing-layout">
    <header class="header">
      <div class="header__content | container-medium">
        <AppLogo />
        <div class="header__buttons">
          <AppButton
            color="secondary"
          >
            Entrar
          </AppButton>
          <AppButton>
            Começar agora
          </AppButton>
        </div>
      </div>
    </header>
    <slot />
  </div>
  <TheFooter />
</template>

<script lang="ts" setup>
import AppButton from '@/components/AppButton.vue';
import AppLogo from '@/components/AppLogo.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style lang="scss" scoped>
.landing-layout {
  --footer-height: 3.5rem;

  min-height: calc(100vh - var(--footer-height));
  padding-bottom: 3rem;
  background-color: $color--neutral-100;
}
.header {
  padding: 1.25rem 0;
  margin-bottom: 2.5rem;
  background-color: $color--white;
  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    @media (max-width: 462px) {
      justify-content: center;
    }
  }
  &__buttons {
    display: flex;
    gap: 1.25rem;
  }
}
</style>
