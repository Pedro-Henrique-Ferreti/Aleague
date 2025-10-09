<template>
  <div class="flex items-center gap-0.25">
    <template
      v-for="index in (autoFill > form.length) ? autoFill : form.length"
      :key="index"
    >
      <IconErrorCircle
        v-if="form[index - 1] === MatchResult.LOST"
        class="size-1 text-[#E73737]"
      />
      <IconCheckCircle
        v-else-if="form[index - 1] === MatchResult.WON"
        class="size-1 text-green-700"
      />
      <IconCircleMinus
        v-else-if="form[index - 1] === MatchResult.DRAW"
        class="size-1 text-gray-400"
      />
      <IconEmptyCircle
        v-else
        class="size-1 text-gray-400"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import IconCheckCircle from '@/assets/icons/CheckCircle.svg';
import IconCircleMinus from '@/assets/icons/CircleMinus.svg';
import IconErrorCircle from '@/assets/icons/ErrorCircle.svg';
import IconEmptyCircle from '@/assets/icons/EmptyCircle.svg';

withDefaults(defineProps<{
  form: TableEntry['form'];
  autoFill?: number;
}>(), {
  autoFill: 0,
})
</script>
