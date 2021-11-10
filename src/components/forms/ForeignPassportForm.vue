<template>
  <div class="foreign-passport-form">
    <UiFormRow>
      <UiFormItem label="Номер паспорта">
        <ValidationProvider rules="required" #default="{ isFailed }">
          <UiInput
            :value="number"
            :is-invalid="isFailed"
            @input="_emitValue('number', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Страна выдачи">
        <UiSelect
          :value="country"
          :options="countryOptions"
          @change="_emitValue('country', $event)"
        />
      </UiFormItem>

      <UiFormItem label="Тип паспорта" span="6">
        <UiSelect
          :value="type"
          :options="typeOptions"
          @change="_emitValue('type', $event)"
        />
      </UiFormItem>
    </UiFormRow>
  </div>
</template>

<script>
import UiFormItem from "../ui/UiFormCell";
import UiFormRow from "../ui/UiFormRow";
import UiInput from "../ui/fields/UiInput";
import UiSelect from "../ui/fields/UiSelect";
import ValidationProvider from "../form-validation/ValidationProvider";

import { ARRAY_PROP_DEFAULT, OPTIONS_PROP_VALIDATOR } from "@/utils/consts";

export default {
  name: "ForeignPassportForm",
  components: {
    UiFormItem,
    UiFormRow,
    UiInput,
    UiSelect,
    ValidationProvider,
  },
  props: {
    number: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    countryOptions: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
      validator: OPTIONS_PROP_VALIDATOR,
    },
    type: {
      type: String,
      default: null,
    },
    typeOptions: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
      validator: OPTIONS_PROP_VALIDATOR,
    },
  },
  methods: {
    _emitValue(key, value) {
      this.$emit(`update:${key}`, value);
    },
  },
};
</script>
