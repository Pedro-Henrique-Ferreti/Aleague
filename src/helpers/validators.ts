import * as validators from '@vuelidate/validators';

export const requiredValidator = validators.helpers.withMessage(
  'Por favor, preencha este campo.',
  validators.required,
);

export const emailValidator = validators.helpers.withMessage(
  'O endereço de email informado é inválido.',
  validators.email,
);
