<template>
  <button
    class="notifications-button"
    type="button"
    aria-label="Notificações"
    data-new-notifications="true"
  >
    <IconNotificationBell class="notifications-button__icon" />
    <span class="notifications-button__badge">
      2
    </span>
  </button>
</template>

<script lang="ts" setup>
import IconNotificationBell from '@/assets/icons/NotificationBell.svg';
</script>

<style lang="scss" scoped>
.notifications-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  position: relative;
  &[data-new-notifications="true"] {
    color: $color--text-strong;
    .notifications-button__badge {
      display: flex;
    }
  }
  &__badge {
    display: none;
    justify-content: center;
    align-items: center;
    width: 0.875rem;
    height: 0.875rem;
    background-color: $color--danger;
    color: $color--white;
    border-radius: 0.1875rem;
    font-size: 0.625rem;
    font-weight: $font-weight--semibold;
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
  }
}
</style>
