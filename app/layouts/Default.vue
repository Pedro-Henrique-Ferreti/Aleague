<template>
  <div class="container-lg pt-1.5 pb-3">
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
</template>
