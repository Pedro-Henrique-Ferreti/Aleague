<template>
  <footer class="footer container">
    <span class="footer__copyright">
      © Aleague {{ new Date().getFullYear() }}.
    </span>
    Desenvolvido por
    <a
      class="footer__link"
      target="_blank"
      rel="noopener"
      href="https://www.linkedin.com/in/pedro-henrique-ferreti-de-souza-7921aa174/"
    >Pedro Ferreti</a> e
    <a
      class="footer__link"
      target="_blank"
      rel="noopener"
      href="https://www.linkedin.com/in/guilherme-ferreti-de-souza/"
    >Guilherme Ferreti</a>.
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
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
    @include focus-ring;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>