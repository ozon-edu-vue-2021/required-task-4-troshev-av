<template>
  <div
    class="ui-field"
    :class="{
      'ui-field_focused': isFocused,
      'ui-field_invalid': isInvalid,
    }"
    @mousedown.self="_onMousedown($event)"
    @click.self="_emitClick($event)"
  >
    <div class="ui-field__slot">
      <slot></slot>
    </div>

    <div v-if="hasSuffix" class="ui-field__suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiField",
  props: {
    isInvalid: {
      type: Boolean,
      default: false,
    },
    isFocused: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasSuffix() {
      return Boolean(this.$slots["suffix"]);
    },
  },
  methods: {
    _onMousedown(event) {
      if (this.isFocused) event.preventDefault();
    },
    _emitClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style>
.ui-field {
  --field-border-hsl: var(--silver-hsl);

  display: flex;
  gap: 0.5rem;
  border: 2px solid hsl(var(--field-border-hsl));
  border-radius: 0.25rem;
  padding: 0 var(--field-padding-x);
  width: 100%;
  min-height: 2.5rem;
  box-sizing: border-box;
  background-color: hsl(var(--white-hsl));
  cursor: text;
  transition: border-color 0.15s ease;
}

.ui-field_focused {
  --field-border-hsl: var(--primary-hsl);
}

.ui-field_invalid {
  --field-border-hsl: var(--danger-hsl);
}

.ui-field__slot {
  flex: 1 1 auto;
}

.ui-field__suffix {
  align-self: center;
  display: inline-flex;
  align-items: center;
}
</style>
