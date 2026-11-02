<template>
  <aside
    class="sidebar group"
    :data-open="menuIsOpen || null"
  >
    <header class="mb-2 relative">
      <AppLogo class="text-2xl! not-group-data-open:hidden" />
      <AppButton
        class="sidebar-close-button"
        :aria-label="menuIsOpen ? 'Fechar menu' : 'Abrir menu'"
        :icon-left="menuIsOpen ? IconChevronLeft : IconChevronRight"
        @click="menuIsOpen = !menuIsOpen"
      />
    </header>
    <div class="sidebar-content">
      <h2 class="text-gray-500 mb-0.5">Geral</h2>
      <nav class="mb-1.5">
        <ul class="menu gap-0.25 p-0 w-full">
          <TheSidebarNavItem
            label="Dashboard"
            :to="{ name: 'home' }"
            :icon="IconHome"
          />
          <TheSidebarNavItem
            label="Estatísticas"
            :to="{ name: 'analytics' }"
            :icon="IconReportAnalytics"
          />
        </ul>
      </nav>
      <h2 class="text-gray-500 mb-0.5">Arquivos</h2>
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
  @apply flex flex-col w-2 h-screen py-1.5 px-1 border-r border-base-200 sticky top-0 data-open:w-16;
}
.sidebar-close-button {
  @apply btn-square bg-white btn-sm absolute! top-0 right-0 not-group-data-open:-right-2;
}
.sidebar-content {
  @apply -mr-1 overflow-y-auto scrollbar-on-hover not-group-data-open:hidden scrollbar-gutter-stable;
}
</style>
