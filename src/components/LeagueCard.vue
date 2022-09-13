<template>
  <router-link
    class="league-card__link"
    :to="{ name: 'create-league' }"
  >
    <div class="league-card">
      <div class="league-card__details">
        <img
          class="league-card__icon"
          src="/images/leagues/league-format-icon.svg"
          alt="League format icon"
        />
        <div>
          <span class="league-card__title">
            {{ title }}
          </span>
          <ul class="league-card__list">
            <LeagueCardDataItem icon="football">
              Pontos corridos
            </LeagueCardDataItem>
            <LeagueCardDataItem
              icon="people"
              :warning="!teamsCount"
            >
              {{ teamsCountLabel }}
            </LeagueCardDataItem>
            <LeagueCardDataItem icon="calendar-check">
              Criado em {{ formattedCreatedAt }}
            </LeagueCardDataItem>
            <LeagueCardDataItem icon="calendar-edit">
              Última alteração em {{ formattedUpdatedAt }}
            </LeagueCardDataItem>
          </ul>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LeagueCardDataItem from './LeagueCardDataItem.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  teamsCount: {
    type: Number as PropType<number | null>,
    default: 0,
  },
  createdAt: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: String,
    default: '',
  },
});

const teamsCountLabel = computed(() => {
  if (props.teamsCount === 0) {
    return 'Nenhum participante';
  }

  if (props.teamsCount === 1) {
    return '1 participante';
  }

  return `${props.teamsCount} participantes`;
});

// Format dates
const pattern = 'dd \'de\' LLLL \'de\' yyyy';

const formattedCreatedAt = computed(
  () => format(new Date(props.createdAt), pattern, { locale: ptBR }),
);

const formattedUpdatedAt = computed(
  () => format(new Date(props.updatedAt), pattern, { locale: ptBR }),
);
</script>

<style lang="scss" scoped>
.league-card {
  padding: 1rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  box-shadow: $box-shadow--layer-1;
  transition: background-color $transition--fastest ease-in;
  &:hover {
    background-color: $color--light-gray-2;
  }
  &__link {
    @include focus-ring;
  }
  &__details {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  &__icon {
    --size: 3rem;
    width: var(--size);
    height: var(--size);
    @include for-large-tablet-landscape-up {
      --size: 4rem;
    }
  }
  &__title {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
  }
  &__list {
    display: grid;
    gap: 0.25rem;
  }
}
</style>
