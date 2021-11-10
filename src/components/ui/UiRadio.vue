<template>
  <label
    class="ui-radio"
    :class="{ 'ui-radio_checked': isChecked, 'ui-radio_unchecked': !isChecked }"
  >
    <span class="ui-radio__indicator">
      <input
        class="ui-radio__field"
        type="radio"
        :name="name"
        :checked="isChecked"
        v-on="radioListeners"
      />
    </span>

    <span class="ui-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "UiRadio",
  model: {
    prop: "stateValue",
    event: "change",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    // Выбранное значение родителем
    stateValue: {
      type: [String, Number, Boolean, Array],
      default: null,
    },
    value: {
      type: [String, Number, Boolean, Array],
      default: "",
    },
    name: {
      type: String,
      default: null,
    },
  },
  computed: {
    radioListeners() {
      return {
        change: () => {
          this.select();
        },
      };
    },
    isChecked() {
      return this.stateValue === this.value;
    },
  },
  methods: {
    select() {
      this.$emit("change", this.value);
    },
  },
};
</script>

<style>
.ui-radio {
  --radio-background: hsl(var(--silver-hsl));
  --radio-indicator-dot-size: 1;

  display: inline-flex;
  align-items: center;
  font-weight: 500;
  vertical-align: middle;
  cursor: pointer;
}

.ui-radio:hover,
.ui-radio:focus-within {
  --radio-background: hsla(var(--primary-light-hsl));
}

.ui-radio_checked {
  --radio-background: hsl(var(--primary-hsl));
  --radio-indicator-dot-size: 0.5;
}

.ui-radio__field {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  opacity: 0;
  z-index: -1;
}

.ui-radio__indicator {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  vertical-align: middle;
  background-color: var(--radio-background);
  user-select: none;
  transition: background-color 0.2s;
}

.ui-radio__indicator::before {
  content: "";
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  right: 2px;
  border-radius: 50%;
  background-color: hsl(var(--white-hsl));
  transform: scale(var(--radio-indicator-dot-size));
  transition: transform 0.2s;
}

.ui-radio__label {
  margin-left: 1rem;
}
</style>
