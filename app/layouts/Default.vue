<template>
  <div class="grid grid-cols-[auto_1fr]">
    <TheSidebar />
    <div class="container-base pb-3 px-0">
      <header class="py-0.75 border-b border-base-200 px-2 desktop-xl:pr-3 empty:hidden not-empty:[&+main]:pt-2">
        <slot name="header" />
      </header>
      <main class="@container/main px-2 pt-3.5 desktop-xl:pr-3">
        <slot />
      </main>
    </div>
  </div>
</template>
