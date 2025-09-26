<template>
  <AppButton
    class="btn-primary btn-soft"
    label="Equipes"
    :class="$attrs.class"
    :icon-left="IconUsersGroup"
  />
</template>

<script lang="ts" setup>
import { IconUsersGroup } from '@tabler/icons-vue';
</script>
