<template>
  <button class="ui-button" :type="type">
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].includes(value);
      },
    },
  },
};
</script>

<style>
.ui-button {
  --button-background-hsl: var(--primary-hsl);

  padding: 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.2em;
  color: hsl(var(--white-hsl));
  background-color: hsl(var(--button-background-hsl));
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease;
}

.ui-button:hover,
.ui-button:focus-visible {
  --button-background-hsl: var(--primary-dark-hsl);
}

.ui-button:active {
  --button-background-hsl: var(--primary-extra-dark-hsl);
}
</style>
