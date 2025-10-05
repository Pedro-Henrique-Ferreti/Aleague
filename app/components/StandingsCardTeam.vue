<template>
  <div
    class="standings-team flex items-center h-full"
    :style="`--clr:${getColor(qualification)};`"
  >
    <button
      class="font-medium text-[1rem] size-1.5 btn btn-ghost p-0"
      type="button"
      :style="`anchor-name:--team-button-${popoverId}`"
      :popovertarget="popoverId"
    >
      {{ position }}
    </button>
    <div
      class="dropdown menu p-0.5 flex flex-row rounded-md bg-base-100 shadow-sm"
      popover
      :id="popoverId"
      :style="`position-anchor:--team-button-${popoverId}`"
    >
      <button
        v-for="color in [Qualification.GREEN, Qualification.BLUE, Qualification.RED, Qualification.ORANGE]"
        class="flex items-center justify-center size-1.75 cursor-pointer"
        aria-label="Select qualification color"
        :key="color"
        @click="qualification === color ? qualification = Qualification.NONE : qualification = color"
      >
        <component
          :style="`fill:${getColor(color)}`"
          :is="color === qualification ? IconCircleDotFilled : IconCircleFilled"
        />
      </button>
    </div>
    <span class="size-0.25 ml-0.75 mr-1 rounded-full bg-base-200" />
    <img
      class="size-1.5 mr-0.75"
      alt="Team badge"
      :src="team?.badge || ''"
    />
    <span>{{ team?.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import { IconCircleDotFilled, IconCircleFilled } from '@tabler/icons-vue';

const popoverId = useId();

const { getTeamById } = useTeamStore();

const props = defineProps<{
  position: number;
  teamId: TeamDetails['id'];
}>();

const qualification = defineModel<Qualification>('qualification', { required: true });

const team = computed(() => getTeamById(props.teamId));

function getColor(value: Qualification) {
  switch (value) {
    case Qualification.GREEN:
      return '#00a63e';
    case Qualification.BLUE:
      return '#2b7fff';
    case Qualification.RED:
      return '#fb2c36';
    case Qualification.ORANGE:
      return '#ff6900';
    case Qualification.NONE:
    default:
      return 'transparent';
  }
}
</script>

<style scoped>
@reference '@/assets/css/main.css';

.standings-team::before {
  @apply content-[''] absolute left-0 h-[calc(100%-0.5rem)] w-0.25 bg-(--clr) rounded-e-md;
}
</style>
