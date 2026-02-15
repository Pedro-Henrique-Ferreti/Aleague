<template>
  <label
    class="card card-border rounded-lg"
    :for="id"
    :class="{
      'cursor-pointer': !disabled,
      'border-base-content': model === value,
    }"
  >
    <div class="card-body p-0.75 flex-row justify-between">
      <div>
        <slot :is-checked="model === value" />
      </div>
      <input
        v-model="model"
        :id="id"
        type="radio"
        class="radio size-1.25"
        :name="name"
        :value="value"
        :disabled="disabled"
      >
    </div>
  </label>
</template>

<script lang="ts" setup generic="T extends string | number | null">
defineProps<{
  name: string;
  value: T;
  disabled?: boolean;
}>();

const id = useId();

const model = defineModel<T>();
</script>
