<template>
  <AppFieldset :label="label">
    <label
      class="input w-full"
      :class="{ 'input-error': error }"
      :for="id"
    >
      <component
        v-if="icon"
        :is="icon"
        class="size-1 shrink-0 opacity-50"
      />
      <BaseInput
        v-model="model"
        :id="id"
        :model-modifiers="modelModifiers"
        :placeholder="placeholder"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorMessageId : undefined"
        :name="name"
        :autocomplete="autocomplete"
        :type="type === 'password' && showPassword ? 'text' : type"
      />
      <BaseButton
        v-if="type === 'password'"
        class="btn btn-ghost btn-xs btn-square shrink-0"
        :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
        :aria-pressed="showPassword"
        @click="showPassword = !showPassword"
      >
        <component
          :is="showPassword ? IconEyeOff : IconEye"
          class="size-1"
        />
      </BaseButton>
    </label>
    <p
      v-if="error"
      :id="errorMessageId"
      class="text-xs text-error"
    >
      {{ error }}
    </p>
  </AppFieldset>
</template>

<script lang="ts" setup>
import type { AppFieldsetProps } from './AppFieldset.vue';
import type { BaseInputModel, BaseInputProps } from './BaseInput.vue';
import { type Icon, IconEye, IconEyeOff } from '@tabler/icons-vue';

type AppInputProps = Pick<AppFieldsetProps, 'label'> & Pick<BaseInputProps, 'type' | 'name'> & {
  icon?: Icon;
  error?: string;
  placeholder?: string;
  autocomplete?: string;
};

defineProps<AppInputProps>();

const id = useId();
const errorMessageId = useId();

const [model, modelModifiers] = defineModel<BaseInputModel>();

const showPassword = ref(false);
</script>
