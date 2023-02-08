<template>
  <component :is="icon" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ArrowForward from '@/components/icons/IconArrowForward.vue';
import Bell from '@/components/icons/IconBell.vue';
import Bookmark from '@/components/icons/IconBookmark.vue';
import CalendarCheck from '@/components/icons/IconCalendarCheck.vue';
import CalendarEdit from '@/components/icons/IconCalendarEdit.vue';
import Check from '@/components/icons/IconCheck.vue';
import CheckCircle from '@/components/icons/IconCheckCircle.vue';
import Chevron from '@/components/icons/IconChevron.vue';
import Circlex from '@/components/icons/IconCirclex.vue';
import Clock from '@/components/icons/IconClock.vue';
import Close from '@/components/icons/IconClose.vue';
import Dice from '@/components/icons/IconDice.vue';
import DoubleChevron from '@/components/icons/IconDoubleChevron.vue';
import EnvelopeCheck from '@/components/icons/IconEnvelopeCheck.vue';
import ErrorCircle from '@/components/icons/IconErrorCircle.vue';
import Football from '@/components/icons/IconFootball.vue';
import Gear from '@/components/icons/IconGear.vue';
import Home from '@/components/icons/IconHome.vue';
import HomeOutline from '@/components/icons/IconHomeOutline.vue';
import Info from '@/components/icons/IconInfo.vue';
import Loading from '@/components/icons/IconLoading.vue';
import Logout from '@/components/icons/IconLogout.vue';
import Menu from '@/components/icons/IconMenu.vue';
import Minus from '@/components/icons/IconMinus.vue';
import MinusCircle from '@/components/icons/IconMinusCircle.vue';
import Package from '@/components/icons/IconPackage.vue';
import Pencil from '@/components/icons/IconPencil.vue';
import People from '@/components/icons/IconPeople.vue';
import Plus from '@/components/icons/IconPlus.vue';
import Refresh from '@/components/icons/IconRefresh.vue';
import Save from '@/components/icons/IconSave.vue';
import Search from '@/components/icons/IconSearch.vue';
import TeamAdd from '@/components/icons/IconTeamAdd.vue';
import TeamShield from '@/components/icons/IconTeamShield.vue';
import TeamShieldOutline from '@/components/icons/IconTeamShieldOutline.vue';
import TrashCanOutline from '@/components/icons/IconTrashCanOutline.vue';
import Trophy from '@/components/icons/IconTrophy.vue';
import TrophyOutline from '@/components/icons/IconTrophyOutline.vue';
import WarningCircle from '@/components/icons/IconWarningCircle.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.icon.toLowerCase().replaceAll('-', '')) {
    case 'arrowforward':
      return ArrowForward;
    case 'bell':
      return Bell;
    case 'bookmark':
      return Bookmark;
    case 'calendarcheck':
      return CalendarCheck;
    case 'calendaredit':
      return CalendarEdit;
    case 'check':
      return Check;
    case 'checkcircle':
      return CheckCircle;
    case 'chevron':
      return Chevron;
    case 'circlex':
      return Circlex;
    case 'clock':
      return Clock;
    case 'close':
      return Close;
    case 'dice':
      return Dice;
    case 'doublechevron':
      return DoubleChevron;
    case 'envelopecheck':
      return EnvelopeCheck;
    case 'errorcircle':
      return ErrorCircle;
    case 'football':
      return Football;
    case 'gear':
      return Gear;
    case 'home':
      return Home;
    case 'homeoutline':
      return HomeOutline;
    case 'info':
      return Info;
    case 'loading':
      return Loading;
    case 'logout':
      return Logout;
    case 'menu':
      return Menu;
    case 'minus':
      return Minus;
    case 'minuscircle':
      return MinusCircle;
    case 'package':
      return Package;
    case 'pencil':
      return Pencil;
    case 'people':
      return People;
    case 'save':
      return Save;
    case 'search':
      return Search;
    case 'plus':
      return Plus;
    case 'refresh':
      return Refresh;
    case 'teamadd':
      return TeamAdd;
    case 'teamshield':
      return TeamShield;
    case 'teamshieldoutline':
      return TeamShieldOutline;
    case 'trashcanoutline':
      return TrashCanOutline;
    case 'trophy':
      return Trophy;
    case 'trophyoutline':
      return TrophyOutline;
    case 'warningcircle':
      return WarningCircle;
    default:
      return '';
  }
});
</script>
