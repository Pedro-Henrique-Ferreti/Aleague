<template>
  <main class="landing">
    <SectionHero />
    <SectionFeatures />
    <SectionSignIn />
  </main>
</template>

<script setup>
import SectionHero from '@/components/LandingSectionHero.vue';
import SectionFeatures from '@/components/LandingSectionFeatures.vue';
import SectionSignIn from '@/components/LandingSectionSignIn.vue';
</script>