<template>
  <div class="grid gap-1 mb-2 tablet-lg:grid-cols-[1fr_auto]">
    <div class="flex items-start gap-1.5">
      <div class="grid place-items-center shrink-0 size-5 rounded-box bg-primary/10 text-primary">
        <IconWorld
          class="size-3"
          stroke="1.5"
        />
      </div>
      <div>
        <h1 class="text-3xl font-medium mb-0.25">{{ world.name }}</h1>
        <div class="badge-container flex-wrap mb-0.75">
          <AppBadge
            class="badge-soft badge-primary badge-sm"
            :icon="IconCalendar"
            :text="`Temporada ${world.season.label}`"
          />
          <AppBadge
            class="badge-soft badge-secondary badge-sm"
            :icon="IconClock"
            :text="formatDate(world.createdAt, 'd MMM yyyy')"
          />
          <AppBadge
            class="badge-soft badge-secondary badge-sm"
            :icon="IconTag"
            :text="`Formato ${world.seasonLabelStyle}`"
          />
        </div>
        <p class="max-w-40 text-base-content/70">{{ world.description }}</p>
      </div>
    </div>
    <div class="flex items-start gap-0.75">
      <AppButton
        class="btn-soft btn-sm"
        label="Mapa do mundo"
        :icon-left="IconMap2"
      />
      <AppButton
        class="btn-soft btn-sm"
        label="Histórico"
        :icon-left="IconHistory"
        :disabled="world.seasonsPlayed === 0"
      />
      <AppMenu
        tooltip="Mais opções"
        class="btn-square btn-sm btn-ghost"
        aria-label="Opções do mundo"
        dropdown-class="dropdown-end"
        :icon-left="IconDotsVertical"
        :icon-right="false"
      >
        <AppMenuItem
          label="Editar perfil"
          :icon="IconPencil"
        />
        <AppMenuItem
          label="Exportar mundo"
          :icon="IconFileExport"
        />
        <AppMenuItem
          label="Exportar como modelo"
          :icon="IconTemplate"
        />
      </AppMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconCalendar,
  IconClock,
  IconDotsVertical,
  IconFileExport,
  IconHistory,
  IconMap2,
  IconPencil,
  IconTag,
  IconTemplate,
  IconWorld,
} from '@tabler/icons-vue';

defineProps<{
  world: WorldOverview;
}>();
</script>
