<template>
  <UiField
    class="ui-input"
    :is-focused="isFocused"
    :is-invalid="isInvalid"
    @click="_onWrapperClick()"
  >
    <input
      ref="field"
      class="ui-input__field"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :readonly="isReadonly"
      v-on="fieldListeners"
    />

    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </UiField>
</template>

<script>
import UiField from "./UiField";

export default {
  name: "UiInput",
  components: {
    UiField,
  },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    fieldListeners() {
      return {
        click: (event) => {
          this.$emit("click", event);
        },
        input: (event) => {
          this.$emit("input", event.target.value);
        },
        focus: (event) => {
          this._setFocusState(true);
          this.$emit("focus", event);
        },
        blur: (event) => {
          this._setFocusState(false);
          this.$emit("blur", event);
        },
      };
    },
  },
  methods: {
    _setFocusState(value) {
      this.isFocused = value;
    },
    _onWrapperClick(event) {
      this.$emit("click", event);
      this.focus();
    },

    focus() {
      this.$refs.field.focus();
    },
  },
};
</script>

<style>
.ui-input__field {
  height: 100%;
  width: 100%;
  padding: 0;
  border: 0;
  background-color: transparent;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  cursor: inherit;
}
</style>
