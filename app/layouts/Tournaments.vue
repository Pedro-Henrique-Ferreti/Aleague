<template>
  <div class="grid grid-cols-[auto_1fr] gap-2">
    <TheSidebar />
    <div class="container-base pt-1.5 pb-3 pl-0 desktop-xl:pr-5">
      <header class="flex gap-2 justify-between mb-2">
        <TheNavbar />
        <div class="flex gap-1 justify-end">
          <slot name="header" />
        </div>
      </header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
