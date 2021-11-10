<template>
  <!--
    Обертка валидидируемой формы
    https://vee-validate.logaretm.com/v3/api/validation-observer.html
  -->
  <VeeValidationObserver
    ref="observer"
    #default="{ handleSubmit }"
    class="validation-observer"
    :tag="tag"
  >
    <slot v-bind="{ handleSubmit }"></slot>
  </VeeValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  name: "ValidationObserver",
  components: {
    VeeValidationObserver: ValidationObserver,
  },
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  methods: {
    reset() {
      this.$refs.observer.reset();
    },
  },
};
</script>
