<template>
  <!--
    Обертка валидируемого поля
    https://vee-validate.logaretm.com/v3/api/validation-provider.html
  -->
  <ValidationProvider
    ref="validator"
    #default="{ invalid, failed, errors }"
    class="field-validation-provider"
    :rules="rules"
    :debounce="100"
    :mode="mode"
  >
    <slot v-bind="{ isInvalid: invalid, isFailed: failed }"></slot>

    <div v-if="failed" class="field-validation-provider__error">
      {{ errors[0] }}
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "FieldValidationProvider",
  components: {
    ValidationProvider,
  },
  props: {
    rules: {
      type: [String, Object],
      default: "",
    },
    mode: {
      type: String,
      default: "eager",
      validator(value) {
        return ["eager", "passive", "lazy", "aggressive"].includes(value);
      },
    },
  },
  methods: {
    resetErrors() {
      this.$refs.validator.reset();
    },
  },
};
</script>

<style>
.field-validation-provider__error {
  margin-top: 0.25rem;
  padding: 0 0.5rem;
  font-size: 0.8em;
  color: hsl(var(--danger-hsl));
}
</style>
