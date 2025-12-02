<template>
  <aside
    class="sidebar group"
    :data-open="menuIsOpen || null"
  >
    <header class="pt-3.5 mb-2 relative">
      <AppButton
        class="sidebar-close-button"
        :aria-label="menuIsOpen ? 'Close menu' : 'Open menu'"
        :icon-left="menuIsOpen ? IconChevronLeft : IconChevronRight"
        @click="menuIsOpen = !menuIsOpen"
      />
      <div class="not-group-data-[open]:hidden">
        <CreateTournamentMenu class="w-full" />
        <ImportTournamentButton class="w-full mt-1 btn-soft" />
      </div>
    </header>
    <div class="sidebar-content">
      <div class="text-lg font-medium">Campeonatos</div>
      <ul class="menu gap-0.25 w-full mt-1 p-0">
        <li
          v-for="tournament in tournamentStore.tournaments"
          :key="tournament.id"
        >
          <button
            type="button"
            :class="{ 'menu-active': tournamentStore.activeTournamentId === tournament.id }"
            @click="tournamentStore.activeTournamentId = tournament.id"
          >
            <IconFile class="h-1 w-1" />
            {{ tournament.name }}
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { IconChevronLeft, IconChevronRight, IconFile } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const menuIsOpen = ref(true);
</script>

<style scoped>
@reference '@/assets/css/main.css';

.sidebar {
  @apply flex flex-col w-3 h-screen py-1.5 px-1 border-r-1 border-base-200 sticky top-0 data-[open]:w-16;
}
.sidebar-close-button {
  @apply btn-square bg-white btn-sm absolute! top-0 right-0 not-group-data-[open]:-right-2;
}
.sidebar-content {
  @apply -mr-1 overflow-y-auto scrollbar-on-hover not-group-data-[open]:hidden [scrollbar-gutter:stable];
}
</style>
