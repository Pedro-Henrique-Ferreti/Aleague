<template>
	<section class="hero">
	</section>    
</template>

<style lang="scss" scoped>
.hero {
	padding-top: 8rem;
	padding-bottom: 4.5rem;
	position: relative;
	&::after {
		content: '';
		display: block;
		width: 62%;
		height: 587px;
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
