<template>
  <div class="previous-full-name-form">
    <UiFormRow
      description="Иностранцы заполняют латинскими буквами. Например, Ivanov Ivan"
    >
      <UiFormItem label="Фамилия на латинице">
        <ValidationProvider rules="required|latin" #default="{ isFailed }">
          <UiInput
            :value="lName"
            :is-invalid="isFailed"
            @input="_emitValue('l-name', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Имя на латинице">
        <ValidationProvider rules="required|latin" #default="{ isFailed }">
          <UiInput
            :value="fName"
            :is-invalid="isFailed"
            @input="_emitValue('f-name', $event)"
          />
        </ValidationProvider>
      </UiFormItem>
    </UiFormRow>
  </div>
</template>

<script>
import UiFormItem from "../ui/UiFormCell";
import UiFormRow from "../ui/UiFormRow";
import UiInput from "../ui/fields/UiInput";
import ValidationProvider from "../form-validation/ValidationProvider";

export default {
  name: "LatinFullNameForm",
  components: {
    UiFormItem,
    UiFormRow,
    UiInput,
    ValidationProvider,
  },
  props: {
    fName: {
      type: String,
      default: null,
    },
    lName: {
      type: String,
      default: null,
    },
  },
  methods: {
    _emitValue(key, value) {
      this.$emit(`update:${key}`, value);
    },
  },
};
</script>
