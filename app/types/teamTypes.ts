export enum TeamType {
  CLUB,
  NATIONAL,
  CUSTOM,
}

export interface TeamDetails {
  id: string;
  name: string;
  country: string;
  badge: string;
  type: TeamType;
  tags: TeamTags[];
}

export type Team = Pick<TeamDetails, 'id' | 'name'>;

export enum TeamTags {
  // Brazil
  SERIE_A_26 = 'Série A 26',
  SERIE_B_26 = 'Série B 26',
  SERIE_C_26 = 'Série C 26',
  SERIE_D_26 = 'Série D 26',
  // Spain
  LA_LIGA_26 = 'La Liga 26/27',
  LA_LIGA_2_26 = 'La Liga 2 26/27',
  // England
  PREMIER_26 = 'Premier League 26/27',
  EFL_26 = 'EFL Championship 26/27',
  EFL_ONE_26 = 'EFL League One 26/27',
  EFL_TWO_26 = 'EFL League Two 26/27',
  // Germany
  BUNDESLIGA_26 = 'Bundesliga 26/27',
  BUNDESLIGA_2_26 = '2. Bundesliga 26/27',
  // Italy
  ITALIAN_SERIE_A_26 = 'Serie A 26/27',
  // France
  LEAGUE_1_26 = 'League 1 26/27',
  // National
  NORTH_AMERICA = 'América do Norte',
  CENTRAL_AMERICA = 'América Central',
  SOUTH_AMERICA = 'América do Sul',
  EUROPE = 'Europa',
  AFRICA = 'África',
  ASIA = 'Ásia',
  OCEANIA = 'Oceania',
}
