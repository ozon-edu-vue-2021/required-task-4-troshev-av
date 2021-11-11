<template>
  <div class="russian-passport-form">
    <UiFormRow>
      <UiFormItem label="Серия паспорта">
        <ValidationProvider rules="required|digits:4" #default="{ isFailed }">
          <UiInput
            :value="series"
            :is-invalid="isFailed"
            @input="_emitValue('series', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Номер паспорта">
        <ValidationProvider rules="required|digits:6" #default="{ isFailed }">
          <UiInput
            :value="number"
            :is-invalid="isFailed"
            @input="_emitValue('number', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Дата выдачи" span="6">
        <ValidationProvider rules="required|past-date" #default="{ isFailed }">
          <UiInput
            :value="issueDate"
            type="date"
            :is-invalid="isFailed"
            @input="_emitValue('issueDate', $event)"
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
  name: "RussianPassportForm",
  components: {
    UiFormItem,
    UiFormRow,
    UiInput,
    ValidationProvider,
  },
  props: {
    series: {
      type: String,
      default: null,
    },
    number: {
      type: String,
      default: null,
    },
    issueDate: {
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
