<template>
  <div
    class="ui-form-cell"
    :class="{ [`ui-form-cell_fluid`]: isFluid }"
    :data-span="span"
    :style="{ '--form-cell-width': width }"
  >
    <div class="ui-form-cell__label">
      <slot name="label">{{ label }}</slot>
    </div>

    <div class="ui-form-cell__slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiFormCell",
  props: {
    label: {
      type: String,
      default: null,
    },
    span: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    isFluid() {
      return !this.span;
    },
    width() {
      const COLUMNS_LENGTH = 12;
      const span = this.span || 12;
      return `${(span / COLUMNS_LENGTH) * 100}%`;
    },
  },
};
</script>

<style>
.ui-form-cell {
  --form-cell-width: 100%;
  --form-cell-basis: auto;
  --form-cell-space: calc(var(--gutter) / 2);

  flex: 1 0 var(--form-cell-basis);
  padding-left: var(--form-cell-space);
  padding-right: var(--form-cell-space);
  max-width: var(--form-cell-width);
  width: var(--form-cell-width);
  box-sizing: border-box;
}

.ui-form-cell_fluid {
  --form-cell-basis: 0;
}

.ui-form-cell__label {
  margin-bottom: 0.5rem;
  color: hsl(var(--gray-dark-hsl));
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
