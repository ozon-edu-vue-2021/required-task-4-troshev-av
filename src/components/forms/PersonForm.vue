<template>
  <div class="person-form">
    <UiFormRow>
      <UiFormItem label="Фамилия">
        <ValidationProvider rules="required|сyrillic" #default="{ isFailed }">
          <UiInput
            :value="lName"
            :is-invalid="isFailed"
            @input="_emitValue('lName', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Имя">
        <ValidationProvider rules="required|сyrillic" #default="{ isFailed }">
          <UiInput
            :value="fName"
            :is-invalid="isFailed"
            @input="_emitValue('fName', $event)"
          />
        </ValidationProvider>
      </UiFormItem>

      <UiFormItem label="Отчество">
        <ValidationProvider rules="required|сyrillic" #default="{ isFailed }">
          <UiInput
            :value="mName"
            :is-invalid="isFailed"
            @input="_emitValue('mName', $event)"
          />
        </ValidationProvider>
      </UiFormItem>
    </UiFormRow>

    <UiFormRow>
      <UiFormItem class="person-form__birthday" label="Дата рождения" span="6">
        <ValidationProvider rules="required|past-date" #default="{ isFailed }">
          <UiInput
            :value="birthday"
            type="date"
            :is-invalid="isFailed"
            @input="_emitValue('birthday', $event)"
          />
        </ValidationProvider>
      </UiFormItem>
    </UiFormRow>

    <UiFormRow>
      <UiFormItem label="E-mail">
        <ValidationProvider rules="required|email" #default="{ isFailed }">
          <UiInput
            :value="email"
            type="email"
            :is-invalid="isFailed"
            @input="_emitValue('email', $event)"
          />
        </ValidationProvider>
      </UiFormItem>
    </UiFormRow>

    <UiFormRow>
      <UiFormItem label="Пол">
        <UiRadio
          class="person-form__radio-item"
          v-for="option in genderOptions"
          :key="option.value"
          :state-value="gender"
          :value="option.value"
          :label="option.label"
          @change="_emitValue('gender', $event)"
        />
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

import {
  GENDER_OPTIONS,
  GENDER_PROP_DEFAULT,
  GENDER_PROP_VALIDATOR,
} from "@/utils/consts";

export default {
  name: "PersonForm",
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
    mName: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: GENDER_PROP_DEFAULT,
      validator: GENDER_PROP_VALIDATOR,
    },
  },
  computed: {
    genderOptions() {
      return GENDER_OPTIONS;
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
.person-form__radio-item:nth-child(1n + 2) {
  margin-left: 2rem;
}
</style>
