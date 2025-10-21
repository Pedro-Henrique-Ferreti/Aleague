<template>
  <IconEmptyCircle
    v-if="!form"
    class="size-1 text-gray-400"
  />
  <Dropdown
    v-else
    class="data-[ring=true]:[&_svg]:outline-2"
    theme="team-form"
    :auto-hide="false"
    :key="form.match.id"
    :disabled="tooltipDisabled"
  >
    <IconErrorCircle
      v-if="form.result === MatchResult.LOST"
      class="size-1 text-[#E73737] rounded-full outline-offset-1 outline-current"
      tabindex="0"
    />
    <IconCheckCircle
      v-else-if="form.result === MatchResult.WON"
      class="size-1 text-green-700 rounded-full outline-offset-1 outline-current"
      tabindex="0"
    />
    <IconCircleMinus
      v-else-if="form.result === MatchResult.DRAW"
      class="size-1 text-gray-400 rounded-full outline-offset-1 outline-current"
      tabindex="0"
    />
    <template #popper>
      <div class="font-semibold capitalize mt-0 mb-0.25 text-center text-xs divider">
        Rodada {{ form.week }} {{ form.match.kickoff ? `• ${getKickoffDisplayText(form.match.kickoff)}` : '' }}
      </div>
      <MatchCard
        class="flex!"
        readonly
        :match="form.match"
        :home-score="form.match.homeTeam.score"
        :away-score="form.match.awayTeam.score"
      />
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import IconCheckCircle from '@/assets/icons/CheckCircle.svg';
import IconCircleMinus from '@/assets/icons/CircleMinus.svg';
import IconErrorCircle from '@/assets/icons/ErrorCircle.svg';
import IconEmptyCircle from '@/assets/icons/EmptyCircle.svg';
import { getKickoffDisplayText } from '~/helpers/match';

defineProps<{
  form: TableEntryForm | null;
  tooltipDisabled?: boolean;
}>();
</script>
