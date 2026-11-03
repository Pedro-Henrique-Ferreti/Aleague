<template>
  <aside
    class="sidebar group"
    :data-open="menuIsOpen || null"
  >
    <header class="sidebar-header">
      <AppLogo class="text-2xl! not-group-data-open:hidden" />
      <div class="relative">
        <AppButton
          class="sidebar-close-button"
          :aria-label="menuIsOpen ? 'Fechar menu' : 'Abrir menu'"
          :icon-left="menuIsOpen ? IconChevronLeft : IconChevronRight"
          @click="menuIsOpen = !menuIsOpen"
        />
      </div>
    </header>
    <div class="sidebar-content">
      <h2 class="sidebar-menu-title">Geral</h2>
      <nav class="mb-1.5">
        <ul class="menu gap-0.25 p-0 w-full">
          <TheSidebarMenuItem
            label="Dashboard"
            :to="{ name: 'home' }"
            :icon="IconHome"
          />
          <TheSidebarMenuItem
            label="Estatísticas"
            :to="{ name: 'analytics' }"
            :icon="IconReportAnalytics"
          />
        </ul>
      </nav>
      <h2 class="sidebar-menu-title">Arquivos</h2>
      <ul class="menu gap-0.25 w-full p-0">
        <TheSidebarCollection
          v-for="file in Object.values(fileStore.files).filter(isCollectionFile)"
          :key="file.id"
          :file="file"
        />
        <TheSidebarFileItem
          v-for="file in Object.values(fileStore.files).filter(isTournamentFile)"
          :key="file.id"
          :file-id="file.id"
          :label="file.data.name"
        />
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { IconChevronLeft, IconChevronRight, IconHome, IconReportAnalytics } from '@tabler/icons-vue';
import { isCollectionFile, isTournamentFile } from '~/helpers/file';

const fileStore = useFileStore();

const menuIsOpen = ref(true);
</script>

<style scoped>
@reference '@/assets/css/main.css';

.sidebar {
  @apply flex flex-col w-2 h-screen pb-1.5 border-r border-base-200 sticky top-0 data-open:w-16;
}
.sidebar-header {
  @apply flex justify-between p-1 mb-2 h-4;
}
.sidebar-close-button {
  @apply btn-square bg-white btn-sm absolute! top-0 right-0 not-group-data-open:-right-2;
}
.sidebar-content {
  @apply pl-1 pr-[0.125rem] overflow-y-auto scrollbar-on-hover not-group-data-open:hidden scrollbar-gutter-stable;
}
.sidebar-menu-title {
  @apply text-base-content/70 mb-0.5 font-medium text-sm;
}
</style>
