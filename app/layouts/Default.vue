<template>
  <div class="grid grid-cols-[auto_1fr]">
    <TheSidebar />
    <div class="container-base pt-1.5 pb-3 px-2 desktop-xl:pr-3">
      <header class="flex gap-1 justify-end mb-2">
        <slot name="header" />
      </header>
      <main class="@container/main">
        <slot />
      </main>
    </div>
  </div>
</template>
