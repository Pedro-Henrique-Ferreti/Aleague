<template>
  <footer class="footer | container">
    <span class="text-center">
      <span class="footer__copyright">
        © Aleague {{ new Date().getFullYear() }}.
      </span>
      Desenvolvido por
      <a
        class="footer__link"
        target="_blank"
        rel="noopener"
        href="https://www.linkedin.com/in/pedro-henrique-ferreti-de-souza-7921aa174/"
      >
        Pedro Ferreti
      </a> e
      <a
        class="footer__link"
        target="_blank"
        rel="noopener"
        href="https://www.linkedin.com/in/guilherme-ferreti-de-souza/"
      >
        Guilherme Ferreti
      </a>.
    </span>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3.5rem;
  font-size: 0.875rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &__copyright {
    @include for-large-tablet-portrait-down {
      display: block;
    }
  }
  &__link {
    color: $color--text-strong;
    // @include focus-ring;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
