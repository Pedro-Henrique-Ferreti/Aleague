<template>
  <div>
    <AppInput
      v-model="fields.name"
      label="Nome"
      :error="r$.$errors.name[0]"
    />
  </div>
</template>

<script lang="ts" setup>
import { required } from '@regle/rules';

const props = defineProps<{
  formNamespace?: FormNamespaces;
}>();

const fields = defineModel<CollectionForm>({ required: true });

const { r$ } = useScopedRegle(fields, {
  name: { required },
}, { namespace: props.formNamespace });
</script>
