<template>
  <component :is="icon" />
</template>

<script setup>
import { computed } from 'vue';
import ArrowFoward from '@/components/icons/IconArrowFoward.vue';
import Check from '@/components/icons/IconCheck.vue';
import Chevron from '@/components/icons/IconChevron.vue';
import Close from '@/components/icons/IconClose.vue';
import ErrorCircle from '@/components/icons/IconErrorCircle.vue';
import Home from '@/components/icons/IconHome.vue';
import HomeOutline from '@/components/icons/IconHomeOutline.vue';
import Loading from '@/components/icons/IconLoading.vue';
import Menu from '@/components/icons/IconMenu.vue';
import Plus from '@/components/icons/IconPlus.vue';
import Save from '@/components/icons/IconSave.vue';
import TeamShield from '@/components/icons/IconTeamShield.vue';
import TeamShieldOutline from '@/components/icons/IconTeamShieldOutline.vue';
import Trophy from '@/components/icons/IconTrophy.vue';
import TrophyOutline from '@/components/icons/IconTrophyOutline.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.icon.toLowerCase().replaceAll('-', '')) {
    case 'arrowfoward':
      return ArrowFoward;
    case 'check':
      return Check;
    case 'chevron':
      return Chevron;
    case 'close':
      return Close;
    case 'errorcircle':
      return ErrorCircle;
    case 'home':
      return Home;
    case 'homeoutline':
      return HomeOutline;
    case 'loading':
      return Loading;
    case 'menu':
      return Menu;
    case 'save':
      return Save;
    case 'plus':
      return Plus;
    case 'teamshield':
      return TeamShield;
    case 'teamshieldoutline':
      return TeamShieldOutline;
    case 'trophy':
      return Trophy;
    case 'trophyoutline':
      return TrophyOutline;
    default:
      return '';
  }
});
</script>
