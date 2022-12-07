type DeleteAccountReason = {
  id: number;
  text: string;
};

export const DELETE_ACCOUNT_REASONS: DeleteAccountReason[] = [
  {
    id: 1,
    text: 'O Aleague não tem o que eu preciso',
  },
  {
    id: 2,
    text: 'Não achei o Aleague divertido',
  },
  {
    id: 3,
    text: 'Quero apagar os registros da minha conta',
  },
];

export const COMMENTARY_MAX_LENGTH = 500;
