<template>
  <footer class="home-footer container">
    <span class="home-footer__copyright">
      © Aleague {{ new Date().getFullYear() }}.
    </span>
    Desenvolvido por
    <a class="home-footer__link"
      href="#"
    >Pedro Ferreti</a> e
    <a class="home-footer__link"
      href="#"
    >Guilherme Ferreti</a>.
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-footer {
  margin-top: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: $color--light-gray-2;
  text-align: center;
  @include for-large-tablet-portrait-up {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  &__copyright {
    @include for-large-tablet-portrait-down {
      display: block;
    }
  }
  &__link {
    color: $color--text-darken;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>