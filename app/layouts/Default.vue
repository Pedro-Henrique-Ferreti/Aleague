<template>
  <div class="grid grid-cols-[auto_1fr]">
    <TheSidebar />
    <div class="container-base pt-0.75 pb-3 px-0">
      <header class="pb-0.75 mb-2 border-b border-base-200 px-2 desktop-xl:pr-3 empty:hidden">
        <slot name="header" />
      </header>
      <main class="@container/main px-2 desktop-xl:pr-3">
        <slot />
      </main>
    </div>
  </div>
</template>
