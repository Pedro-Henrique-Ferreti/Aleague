<template>
  <component :is="icon" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ArrowFoward from '@/components/icons/IconArrowFoward.vue';
import Bell from '@/components/icons/IconBell.vue';
import Bookmark from '@/components/icons/IconBookmark.vue';
import Check from '@/components/icons/IconCheck.vue';
import CheckCircle from '@/components/icons/IconCheckCircle.vue';
import Chevron from '@/components/icons/IconChevron.vue';
import Clock from '@/components/icons/IconClock.vue';
import Close from '@/components/icons/IconClose.vue';
import EnvelopeCheck from '@/components/icons/IconEnvelopeCheck.vue';
import ErrorCircle from '@/components/icons/IconErrorCircle.vue';
import Gear from '@/components/icons/IconGear.vue';
import Home from '@/components/icons/IconHome.vue';
import HomeOutline from '@/components/icons/IconHomeOutline.vue';
import Loading from '@/components/icons/IconLoading.vue';
import Logout from '@/components/icons/IconLogout.vue';
import Menu from '@/components/icons/IconMenu.vue';
import Package from '@/components/icons/IconPackage.vue';
import Pencil from '@/components/icons/IconPencil.vue';
import Plus from '@/components/icons/IconPlus.vue';
import Save from '@/components/icons/IconSave.vue';
import Search from '@/components/icons/IconSearch.vue';
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
    case 'bell':
      return Bell;
    case 'bookmark':
      return Bookmark;
    case 'check':
      return Check;
    case 'checkcircle':
      return CheckCircle;
    case 'chevron':
      return Chevron;
    case 'clock':
      return Clock;
    case 'close':
      return Close;
    case 'envelopecheck':
      return EnvelopeCheck;
    case 'errorcircle':
      return ErrorCircle;
    case 'gear':
      return Gear;
    case 'home':
      return Home;
    case 'homeoutline':
      return HomeOutline;
    case 'loading':
      return Loading;
    case 'logout':
      return Logout;
    case 'menu':
      return Menu;
    case 'package':
      return Package;
    case 'pencil':
      return Pencil;
    case 'save':
      return Save;
    case 'search':
      return Search;
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
