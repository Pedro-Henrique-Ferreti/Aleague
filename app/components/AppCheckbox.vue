<template>
  <label
    class="flex gap-0.5 relative"
    :for="id"
  >
    <div v-if="placement === TextPlacement.LEFT && (!!label || $slots.default)">
      <slot>
        <span>{{ label }}</span>
      </slot>
    </div>
    <input
      v-model="model"
      type="checkbox"
      class="checkbox checkbox-secondary checkbox-sm"
      :value="value"
      :id="id"
      :disabled="disabled"
    />
    <div v-if="placement === TextPlacement.RIGHT && (!!label || $slots.default)">
      <slot>
        <span>{{ label }}</span>
      </slot>
    </div>
  </label>
  
</template>

<script lang="ts">
enum TextPlacement {
  LEFT = 'left',
  RIGHT = 'right',
}

interface Props {
  value?: string | number;
  disabled?: boolean;
  label?: string;
  placement?: `${TextPlacement}`;
}
</script>

<script lang="ts" setup>
const id = useId();

withDefaults(defineProps<Props>(), {
  value: '',
  placement: TextPlacement.RIGHT,
});

const model = defineModel<boolean | (string | number)[]>({ default: false });
</script>
