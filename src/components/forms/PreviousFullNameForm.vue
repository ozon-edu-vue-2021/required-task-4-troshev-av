<template>
  <div class="previous-full-name-form">
    <UiFormRow>
      <UiFormItem label="Меняли ли фамилию или имя?">
        <UiRadio
          class="previous-full-name-form__radio-item"
          v-for="option in nameChangedOptions"
          :key="option.value"
          :state-value="nameChanged"
          :value="option.value"
          :label="option.label"
          @change="_emitValue('name-changed', $event)"
        />
      </UiFormItem>
    </UiFormRow>

    <UiFormRow v-if="nameChanged">
      <UiFormItem label="Предыдущая Фамилия">
        <ValidationProvider rules="required|сyrillic" #default="{ isFailed }">
          <UiInput
            :value="lName"
            :is-invalid="isFailed"
            @input="_emitValue('l-name', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Предыдущее Имя">
        <ValidationProvider rules="required|сyrillic" #default="{ isFailed }">
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
import UiRadio from "../ui/UiRadio";
import ValidationProvider from "../form-validation/ValidationProvider";

export default {
  name: "PreviousFullNameForm",
  components: {
    UiFormItem,
    UiFormRow,
    UiInput,
    UiRadio,
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
    nameChanged: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    nameChangedOptions() {
      return [
        { label: "Нет", value: false },
        { label: "Да", value: true },
      ];
    },
  },
  methods: {
    _emitValue(key, value) {
      this.$emit(`update:${key}`, value);
    },
  },
};
</script>

<style>
.previous-full-name-form__radio-item:nth-child(1n + 2) {
  margin-left: 2rem;
}
</style>
