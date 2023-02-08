<template>
  <main class="landing">
    <SectionHero />
    <SectionFeatures />
    <SectionSignIn />
  </main>
</template>

<script lang="ts" setup>
import SectionHero from '@/components/LandingSectionHero.vue';
import SectionFeatures from '@/components/LandingSectionFeatures.vue';
import SectionSignIn from '@/components/LandingSectionSignIn.vue';
</script>

<style lang="scss" scoped>
.landing {
  width: 100%;
}
</style>