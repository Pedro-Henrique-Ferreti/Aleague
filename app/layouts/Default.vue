<template>
  <div class="grid grid-cols-[auto_1fr]">
    <TheSidebar />
    <div class="container-base pt-1.5 pb-3 px-2 desktop-xl:pr-3">
      <header class="pb-0.75 mb-2 border-b border-base-200">
        <slot name="header" />
      </header>
      <main class="@container/main">
        <slot />
      </main>
    </div>
  </div>
</template>
