<template>
  <div class="ui-form-row">
    <div class="ui-form-row__inner">
      <div class="ui-form-row__slot">
        <slot></slot>
      </div>

      <div class="ui-form-row__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiFormRow",
  props: {
    description: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
.ui-form-row {
  --form-row-space: calc(var(--gutter) / 2);
  --form-row-negative-offset: calc(0 - (var(--gutter) / 2));
}

.ui-form-row__inner {
  margin-left: var(--form-row-negative-offset);
  margin-right: var(--form-row-negative-offset);
  padding-top: var(--form-row-space);
  padding-bottom: var(--form-row-space);
}

.ui-form-row__slot {
  display: flex;
}

.ui-form-row__description {
  margin-top: 0.25rem;
  padding-left: var(--form-row-space);
  padding-right: var(--form-row-space);
  color: hsl(var(--gray-hsl));
}
</style>
