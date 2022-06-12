<template>
  <section class="hero">
    <Swiper id="hero-swiper"
			class="container"
			:modules="modules"
			:pagination="paginationOptions"
      :slides-per-view="1"
      :space-between="50"
			:autoplay="autoplayOptions"
    >
      <SwiperSlide>Lorem ipsum dolor sit amet.</SwiperSlide>
      <SwiperSlide>Lorem ipsum dolor sit amet.</SwiperSlide>
      <SwiperSlide>Lorem ipsum dolor sit amet.</SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
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
	padding-top: 8rem;
	padding-bottom: 4.5rem;
	position: relative;
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
		@include for-large-tablet-landscape-down {
			display: none;
		}
	}
}
</style>
