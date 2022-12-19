import type { CompetitionFormat } from '@/types/Competition';

type CompetitionFormats = {
  [key: string]: {
    name: string;
    value: CompetitionFormat;
    image: string;
    description: string;
    isAvailable: boolean;
  };
};

export const competitionFormats: CompetitionFormats = {
  LEAGUE: {
    name: 'Pontos corridos',
    value: 'league',
    image: '/images/leagues/league-format-icon.svg',
    description: 'Cada um dos competidores enfrenta todos os demais. Ao final, aquele que obtiver mais pontos é o campeão. Pode ser disputado em turno único ou em dois turnos (turno e returno).',
    isAvailable: true,
  },
  CUP: {
    name: 'Copa',
    value: 'cup',
    image: '/images/leagues/cup-format-icon.svg',
    description: 'Dividido em duas fases. Na primeira fase, as equipes são dividias em grupos, onde podem se enfrentar em um turno ou dois turnos. Um determinado número de equipes é promovido para a próxima fase, que é disputada em formato eliminatório.',
    isAvailable: false,
  },
  PLAY_OFF: {
    name: 'Eliminatórias',
    value: 'playoff',
    image: '/images/leagues/play-off-format-icon.svg',
    description: 'Cada equipe competidora disputa um certo número de partidas, até ser promovida à próxima fase. A equipe perdedora de cada disputa é eliminada da competição.',
    isAvailable: true,
  },
};
