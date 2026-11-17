<template>
  <div class="flex flex-col p-2">
    <AppLogo class="block mb-1 tablet-lg:hidden" />
    <h2 class="text-2xl font-semibold tracking-tight">
      Entrar
    </h2>
    <p class="mt-0.25 text-sm text-base-content/70">
      Use seu email e senha para acessar sua conta.
    </p>
    <form
      class="mt-1.5 flex flex-col gap-1"
      novalidate
      @submit.prevent="r$.$validate()"
    >
      <AppInput
        v-model="form.email"
        label="Email"
        name="email"
        placeholder="exemplo@mail.com"
        autocomplete="email"
        :icon="IconMail"
        :error="r$.$errors.email[0]"
      />
      <AppInput
        v-model="form.password"
        label="Senha"
        name="password"
        placeholder="••••••••"
        autocomplete="current-password"
        type="password"
        :icon="IconLock"
        :error="r$.$errors.password[0]"
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
      <BaseButton
        class="link link-primary"
        @click="$emit('createAccount')"
      >
        Criar conta
      </BaseButton>
    </p>
  </div>
</template>

<script setup lang="ts">
import { email, required } from '@regle/rules';
import { IconLock, IconLogin, IconMail } from '@tabler/icons-vue';

defineEmits<{
  createAccount: [];
}>();

const form = ref({
  email: '',
  password: '',
});

const { r$ } = useScopedRegle(form, {
  email: { required, email },
  password: { required },
}, { namespace: 'auth-modal', autoDirty: false, rewardEarly: true });
</script>
