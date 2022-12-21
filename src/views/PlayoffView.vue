<template>
  <pre>{{ playoff }}</pre>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayoffStore } from '@/stores/playoffStore';

const route = useRoute();
const { getPlayoffById } = usePlayoffStore();

const playoff = ref({});

getPlayoff();

async function getPlayoff() {
  playoff.value = await getPlayoffById(route.params.id as string);
}
</script>
