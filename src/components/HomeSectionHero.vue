<template>
  <section class="hero">
    <Swiper class="container-small"
			:modules="modules"
			:pagination="true"
      :slides-per-view="1"
      :space-between="50"
			:autoplay="{ delay: 7500 }"
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
</script>

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
