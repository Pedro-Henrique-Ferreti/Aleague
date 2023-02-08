<template>
  <section class="hero">
    <Swiper
      id="hero-swiper"
      class="container"
      :modules="modules"
      :pagination="paginationOptions"
      :slides-per-view="1"
      :space-between="50"
      :autoplay="autoplayOptions"
    >
      <SwiperSlide>
        <div class="hero__slide">
          <div class="hero__slide-details">
            <h1 class="hero__title">
              Crie e gerencie
              <br />
              <span class="hero__title-callout">campeonatos de futebol</span>
            </h1>
            <p class="hero__description">
              Com o Alegue, você pode criar campeonatos de futebol de maneira fácil e rápida. Escolha entre diversos formatos e opções de regras para ter uma experiência completa.
            </p>
            <AppButton
              color="tertiary"
              size="large"
              icon-right="arrow-forward"
              icon-rounded
              :to="{ name: 'register' }"
            >
              Começar agora
            </AppButton>
          </div>
          <img
            class="hero__illustration"
            src="/images/soccer-kick.svg"
            alt="Soccer players"
            draggable="false"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="hero__slide hero__slide--theme-tertiary">
          <div class="hero__slide-details">
            <h1 class="hero__title">
              Faça suas próprias
              <br />
              <span class="hero__title-callout">equipes</span>
            </h1>
            <p class="hero__description">
              Escolha nomes, cores e diversas opções de escudos para a sua nova equipe. Se preferir, você pode utilizar o pacote de equipes para cadastrar os clubes das ligas mais famosas do mundo.
            </p>
            <AppButton
              size="large"
              color="secondary"
              icon-right="arrow-forward"
              icon-rounded
              :to="{ name: 'register' }"
            >
              Começar agora
            </AppButton>
          </div>
          <img
            class="hero__illustration"
            src="/images/team-board.svg"
            alt="Team board"
            draggable="false"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="hero__slide hero__slide--theme-secondary">
          <div class="hero__slide-details">
            <h1 class="hero__title">
              Análise detalhada de
              <br />
              <span class="hero__title-callout">estatísticas e resultados</span>
            </h1>
            <p class="hero__description">
              O Aleague apresenta estatísticas detalhadas sobre cada equipe e cada campeonato que você criar. Mergulhe em uma profunda análise dos resultados das suas equipes.
            </p>
            <AppButton
              size="large"
              icon-right="arrow-forward"
              icon-rounded
              :to="{ name: 'register' }"
            >
              Começar agora
            </AppButton>
          </div>
          <img
            class="hero__illustration"
            src="/images/spreadsheet.svg"
            alt="Spreadsheet"
            draggable="false"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/autoplay';

const modules = ref([Autoplay, Pagination]);
const paginationOptions = ref({
	clickable: true,
});
const autoplayOptions = ref({
	delay: 7500,
	disableOnInteraction: false,
});
</script>

<style lang="scss">
#hero-swiper {
	max-width: 68rem;
	.swiper-pagination-bullets {
		margin-top: 1.5rem;
		text-align: center;
	}
	.swiper-pagination-bullet {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background-color: $color--white;
		border: 2px solid $color--text-darken;
		cursor: pointer;
		transition: background-color $transition--fast ease-in-out;
		&:not(:last-of-type) {
			margin-right: 0.75rem;
		}
		&.swiper-pagination-bullet-active {
			background-color: $color--text-darken;
		}
	}
}
</style>

<style lang="scss" scoped>
.hero {
	--slide-theme-color: #{$color--primary};

	padding-top: 6rem;
	position: relative;
	@include for-tablet-landscape-up {
		padding-top: 8rem;
		padding-bottom: 4.5rem;
	}
	&::after {
		content: '';
		display: block;
		width: 62%;
		height: 100%;
		background-color: $color--light-gray-3;
		position: absolute;
		top: 0;
		right: 0;
		z-index: -1;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 28% 100%);
		@include for-tablet-landscape-down {
			display: none;
		}
	}
	&__slide {
		display: grid;
		gap: 2rem;
		place-items: center;
		@include for-tablet-landscape-up {
			grid-template-columns: 1fr auto;
			gap: 4rem;
		}
		&--theme-secondary {
			--slide-theme-color: #{$color--secondary};
		}
		&--theme-tertiary {
			--slide-theme-color: #{$color--tertiary};
		}
	}
	&__title {
		margin-bottom: 1rem;
		color: $color--text-darken;
		font-size: 1.875rem;
		font-weight: $font-weight--semibold;
		@include for-desktop-up {
			font-size: 3rem;
		}
	}
	&__title-callout {
		color: var(--slide-theme-color);
		font-size: inherit;
		font-weight: inherit;
	}
	&__description {
		margin-bottom: 1.5rem;
		@include for-desktop-up {
			margin-bottom: 2rem;
		}
	}
	&__illustration {
		width: 18.75rem;
		height: auto;
		@include for-desktop-up {
			width: 25rem;
		}
	}
}
</style>
