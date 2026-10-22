<template>
  <div class="flex flex-col p-2">
    <AppLogo class="block mb-1 tablet-lg:hidden" />
    <h2 class="text-2xl font-semibold tracking-tight">
      Criar conta
    </h2>
    <p class="mt-0.25 text-sm text-base-content/70">
      Digite usuário e senha para criar uma conta.
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
        autocomplete="new-password"
        type="password"
        :icon="IconLock"
      />
      <AppInput
        v-model="form.passwordRepeat"
        label="Repita a senha"
        name="password"
        placeholder="••••••••"
        autocomplete="new-password"
        type="password"
        :icon="IconLock"
      />
      <AppButton
        type="submit"
        class="btn-primary mt-0.25 w-full"
        label="Criar conta"
        :icon-left="IconLogin2"
      />
    </form>
    <p class="mt-1.5 text-center text-xs text-base-content/70">
      Já tem uma conta?
      <BaseButton
        class="link link-primary"
        @click="$emit('login')"
      >
        Fazer login
      </BaseButton>
    </p>
  </div>
</template>

<script setup lang="ts">
import { IconLock, IconLogin2, IconUser } from '@tabler/icons-vue';

defineEmits<{
  login: [];
}>();

const form = ref({
  login: '',
  password: '',
  passwordRepeat: '',
});
</script>
