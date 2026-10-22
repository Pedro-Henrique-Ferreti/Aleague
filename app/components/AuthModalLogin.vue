<template>
  <div class="flex flex-col p-2">
    <span class="block mb-1 text-base text-primary font-semibold tracking-tight tablet-lg:hidden">Aleague</span>
    <h2 class="text-2xl font-semibold tracking-tight">
      Entrar
    </h2>
    <p class="mt-0.25 text-sm text-base-content/70">
      Use seu usuário e senha para acessar sua conta.
    </p>
    <form
      class="mt-1.5 flex flex-col gap-1"
      novalidate
      @submit.prevent
    >
      <AppInput
        v-model="form.login"
        label="Usuário"
        name="username"
        placeholder="usuário"
        autocomplete="username"
        :icon="IconUser"
      />
      <AppInput
        v-model="form.password"
        label="Senha"
        name="password"
        placeholder="••••••••"
        autocomplete="current-password"
        type="password"
        :icon="IconLock"
      />
      <BaseButton class="link link-primary text-xs ml-auto">
        Esqueci minha senha
      </BaseButton>
      <AppButton
        type="submit"
        class="btn-primary mt-0.25 w-full"
        label="Entrar"
        :icon-left="IconLogin"
      />
    </form>
    <p class="mt-1.5 text-center text-xs text-base-content/70">
      Ainda não tem conta?
      <BaseButton class="link link-primary">
        Criar conta
      </BaseButton>
    </p>
  </div>
</template>

<script setup lang="ts">
import { IconLock, IconLogin, IconUser } from '@tabler/icons-vue';

const form = ref({
  login: '',
  password: '',
});
</script>
