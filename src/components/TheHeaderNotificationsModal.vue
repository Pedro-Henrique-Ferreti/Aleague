<template>
  <transition
    name="scroll-y"
    mode="out-in"
  >
    <div
      v-show="show"
      class="header-notifications"
    >
      <BaseModal
        is-simple
        class="header-notifications__modal"
        title="Notificações"
        body-classes="header-notifications__content"
      >
        <img
          class="header-notifications__image"
          src="/images/user-email.svg"
          alt="Man holding a smartphone while surrounded by e-mails"
        />
        <span>Nenhuma notificação nova</span>
      </BaseModal>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import BaseModal from './common/BaseModal.vue';
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.header-notifications {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: -0.5rem;
  z-index: $z-index--header-notifications-modal;
  &__modal {
    width: 25rem;
    min-height: 17rem;
  }
  ::v-deep .header-notifications__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__image {
    width: 7.5rem;
    height: auto;
    margin-bottom: 1rem;
  }
}
</style>
