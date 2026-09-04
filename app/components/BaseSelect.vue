<template>
  <select
    v-model="model"
    :id="id"
    class="select"
    :disabled="disabled"
  >
    <optgroup
      v-for="group in optionGroups.filter(g => g.label !== undefined)"
      :key="String(group.label)"
      :label="group.label"
    >
      <option
        v-for="option in group.options"
        v-text="option.label"
        :key="JSON.stringify(option.value)"
        :value="option.value"
        :disabled="option.disabled"
      />
    </optgroup>
    <hr class="divider bg-transparent border-0 m-0 hidden [optgroup~hr]:flex">
    <option
      v-for="option in optionGroups.find(g => g.label === undefined)?.options"
      v-text="option.label"
      :key="JSON.stringify(option.value)"
      :value="option.value"
      :disabled="option.disabled"
    />
  </select>
</template>

<script setup lang="ts" generic="T extends SelectOptionValue">
export interface BaseSelectProps<T extends SelectOptionValue> {
  options: SelectOptionList<T> | Readonly<SelectOptionList<T>>;
  disabled?: boolean;
}

const props = defineProps<BaseSelectProps<T>>();

const id = useId();
const model = defineModel<T>();

const optionGroups = computed(() => {
  const groups = new Map<SelectOption<T>['groupLabel'], SelectOptionList<T>>();

  props.options.forEach((option) => {
    if (!groups.has(option.groupLabel)) {
      groups.set(option.groupLabel, []);
    }

    groups.get(option.groupLabel)!.push(option);
  });

  return Array.from(groups.entries()).map(([label, options]) => ({
    label,
    options,
  }));
});
</script>
