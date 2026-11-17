<template>
  <div class="flex flex-col p-2">
    <AppLogo class="block mb-1 tablet-lg:hidden" />
    <h2 class="text-2xl font-semibold tracking-tight">
      Criar conta
    </h2>
    <p class="mt-0.25 text-sm text-base-content/70">
      Digite usuário, email e senha para criar uma conta.
    </p>
    <form
      class="mt-1.5 flex flex-col gap-1"
      novalidate
      @submit.prevent="r$.$validate()"
    >
      <AppInput
        v-model="form.username"
        label="Usuário"
        name="username"
        placeholder="usuário"
        autocomplete="username"
        :icon="IconUser"
        :error="r$.$errors.username[0]"
      />
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
        autocomplete="new-password"
        type="password"
        :icon="IconLock"
        :error="r$.$errors.password[0]"
      />
      <AppInput
        v-model="form.passwordRepeat"
        label="Repita a senha"
        name="password"
        placeholder="••••••••"
        autocomplete="new-password"
        type="password"
        :icon="IconLock"
        :error="r$.$errors.passwordRepeat[0]"
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
import { email, required, sameAs } from '@regle/rules';
import { IconLock, IconLogin2, IconMail, IconUser } from '@tabler/icons-vue';

defineEmits<{
  login: [];
}>();

const form = ref({
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
});

const { r$ } = useScopedRegle(form, {
  username: { required },
  email: { required, email },
  password: { required },
  passwordRepeat: { required, sameAs: withMessage(sameAs(() => form.value.password), 'As senhas devem ser iguais') },
}, { namespace: 'auth-modal', autoDirty: false, rewardEarly: true });
</script>
