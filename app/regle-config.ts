import { defineRegleNuxtPlugin } from '@regle/nuxt/setup';
import { email, required } from '@regle/rules';

export default defineRegleNuxtPlugin(() => {
  return defineRegleConfig({
    rules: () => ({
      required: withMessage(required, 'Preencha este campo'),
      email: withMessage(email, 'Insira um endereço de email válido'),
    }),
  });
});
