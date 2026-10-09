<template>
  <IconEmptyCircle
    v-if="!form"
    class="size-1 text-gray-400"
    aria-hidden="true"
  />
  <Dropdown
    v-else
    :key="form.match.id"
    class="data-[ring=true]:[&_svg]:outline-2"
    theme="team-form"
    :auto-hide="false"
    :disabled="tooltipDisabled"
  >
    <IconErrorCircle
      v-if="form.result === MatchResult.LOST"
      class="size-1 text-[#E73737] rounded-full outline-offset-1 outline-current"
      tabindex="0"
      role="img"
      aria-label="Derrota"
    />
    <IconCheckCircle
      v-else-if="form.result === MatchResult.WON"
      class="size-1 text-green-700 rounded-full outline-offset-1 outline-current"
      tabindex="0"
      role="img"
      aria-label="Vitória"
    />
    <IconCircleMinus
      v-else-if="form.result === MatchResult.DRAW"
      class="size-1 text-gray-400 rounded-full outline-offset-1 outline-current"
      tabindex="0"
      role="img"
      aria-label="Empate"
    />
    <template #popper>
      <div class="text-xs font-medium">
        <div class="capitalize mt-0 mb-0.25 text-center">
          Rodada {{ form.week }} {{ form.match.kickoff ? `• ${getKickoffDisplayText(form.match.kickoff)}` : '' }}
        </div>
        <div class="grid grid-cols-[1fr_auto_1fr] gap-0.5 items-center">
          <TeamDetails
            class="flex-row-reverse text-right"
            size="xs"
            :show-country="tournamentStore.activeTournament?.showCountry"
            :team="getTeamById(form.match.homeTeam.id)!"
          />
          <span class="font-semibold">{{ form.match.homeTeam.score }} - {{ form.match.awayTeam.score }}</span>
          <TeamDetails
            size="xs"
            :show-country="tournamentStore.activeTournament?.showCountry"
            :team="getTeamById(form.match.awayTeam.id)!"
          />
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import IconCheckCircle from '@/assets/icons/CheckCircle.svg';
import IconCircleMinus from '@/assets/icons/CircleMinus.svg';
import IconEmptyCircle from '@/assets/icons/EmptyCircle.svg';
import IconErrorCircle from '@/assets/icons/ErrorCircle.svg';
import { getTeamById } from '@/helpers/team';
import { getKickoffDisplayText } from '~/helpers/match';

defineProps<{
  form: TableEntryForm | null;
  tooltipDisabled?: boolean;
}>();

const tournamentStore = useTournamentStore();
</script>
