import * as validators from '@vuelidate/validators';

export const required = validators.helpers.withMessage('Por favor, preencha este campo.', validators.required);

export const email = validators.helpers.withMessage('O endereço de email informado é inválido.', validators.email);
