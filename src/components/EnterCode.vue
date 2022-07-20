<template>
  <div class="enter-code">
    <div class="enter-code__fields">
      <input
        v-for="n in 6"
        v-model="digit[n - 1]"
        class="enter-code__field"
        ref="digitRefs"
        type="tel"
        maxlength="1"
        :key="n"
        :id="`digit-${n}`"
        :aria-label="`Digito ${n}`"
        @keydown.delete.prevent="handleDeleteKeypress(n - 1)"
        @input="moveCursor(n)"
      />
    </div>
    <BaseButton
      class="enter-code__resend-code"
      color="gray"
      type="button"
      :disabled="remainingSecondsForResend > 0"
      :is-loading="isLoading"
      @click="resendCode"
    >
      {{ resendCodeButtonText }}
    </BaseButton>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const emit = defineEmits(['resend-code', 'update-code']);
const props = defineProps({
  resendTimeout: {
    type: Number,
    default: 30,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

// Resend code
const remainingSecondsForResend = ref(props.resendTimeout);
const intervalId = ref(null);

const zeroFill = (number) => number < 10 ? `0${number}` : String(number);

const resendCodeButtonText = computed(() => {
  if (remainingSecondsForResend.value === 0) {
    return 'Reenviar código';
  }

  const minutes = Math.floor(remainingSecondsForResend.value / 60);
  const seconds = Math.floor(remainingSecondsForResend.value % 60);

  return `Reenviar código em ${zeroFill(minutes)}:${zeroFill(seconds)}`;
});

function clearResendCodeInterval() {
  clearInterval(intervalId.value);

  intervalId.value = null;
}

function setResendCodeInterval() {
  intervalId.value = setInterval(() => {
    if (remainingSecondsForResend.value === 0) {
      clearResendCodeInterval();
      return;
    }

    remainingSecondsForResend.value -= 1;
  }, 1000);
}

function resendCode() {
  emit('resend-code');

  clearResendCodeInterval();

  remainingSecondsForResend.value = props.resendTimeout;

  setResendCodeInterval();
}

setResendCodeInterval();

// Digit fields
const digit = ref([]);
const digitRefs = ref([]);

watch(digit.value, (newDigit) => {
  emit('update-code', newDigit.join(''));
});

onMounted(() => {
  digitRefs.value[0].focus();
});

function moveCursor(index) {
  digitRefs.value[index]?.focus();
}

function handleDeleteKeypress(index) {
  if (digit.value[index]) {
    digit.value[index] = '';
    return;
  }

  digit.value[index - 1] = '';

  moveCursor(index - 1);
}
</script>

<style lang="scss" scoped>
.enter-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: auto;
  &__fields {
    display: flex;
    gap: 0.5rem;
  }
  &__field {
    width: 2.5rem;
    height: 2.75rem;
    background-color: $color--white;
    color: $color--text-darken;
    border: 1px solid $color--gray-1;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    text-align: center;
    outline: none;
    &:focus {
      border-color: transparent;
      outline: 2px solid $color--tertiary;
    }
    &:nth-child(3) {
      margin-right: 0.5rem;
    }
  }
  &__resend-code {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
