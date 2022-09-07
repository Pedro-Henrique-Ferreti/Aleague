<template>
  <Transition
    mode="out-in"
    :name="name"
  >
    <slot />
  </Transition>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});

</script>
