<template>
  <div
    class="ui-select"
    @keydown.down.prevent="showDropdown()"
    @keydown.escape="hideDropdown()"
  >
    <div class="ui-select__inner">
      <UiInput
        ref="field"
        class="ui-select__field"
        :placeholder="fieldPlaceholder"
        :value="fieldValue"
        :is-invalid="isInvalid"
        :is-readonly="fieldReadOnly"
        v-on="fieldListeners"
      >
        <template #suffix>
          <DropDownIcon
            class="ui-select__arrow"
            :class="{ 'ui-select__arrow_inverted': isVisibleDropdown }"
            @mousedown.native.prevent
          />
        </template>
      </UiInput>
    </div>

    <UiDropdown :is-visible="isVisibleDropdown" @mousedown.native.prevent>
      <template #dropdown>
        <div class="ui-select__dropdown">
          <div v-if="isEmptyOptions" class="ui-select__dropdown-placeholder">
            Нет доступных значений
          </div>

          <ul v-else class="ui-select__options-list">
            <li
              v-for="option in formattedOptions"
              :key="`${option.label}-${option.value}`"
              class="ui-select__options-item"
              :class="{ 'ui-select__options-item_selected': option.isSelected }"
              @click="_selectOption(option.value)"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </template>
    </UiDropdown>
  </div>
</template>

<script>
import DropDownIcon from "../../icons/DropDownIcon";
import UiDropdown from "../UiDropdown";
import UiInput from "./UiInput";

import { ARRAY_PROP_DEFAULT, OPTIONS_PROP_VALIDATOR } from "@/utils/consts";

export default {
  name: "UiSelect",
  components: {
    DropDownIcon,
    UiDropdown,
    UiInput,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
      validator: OPTIONS_PROP_VALIDATOR,
    },
    placeholder: {
      type: String,
      default: null,
    },
    searchQuery: {
      type: String,
      default: null,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
    isSearchable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFieldFocused: false,
      isVisibleDropdown: false,
    };
  },
  computed: {
    fieldListeners() {
      return {
        click: () => {
          if (!this.isVisibleDropdown) this.showDropdown();
        },
        input: (value) => {
          this._emitSearchQuery(value);
        },
        focus: (event) => {
          this.showDropdown();
          this.$emit("focus", event);
        },
        blur: (event) => {
          this.hideDropdown();
          this.$emit("blur", event);
        },
      };
    },
    formattedOptions() {
      const selectedValue = this.value;

      return this.options.map(({ label, value }) => {
        return { label, value, isSelected: value === selectedValue };
      }, []);
    },
    isEmptyOptions() {
      return this.formattedOptions.length === 0;
    },
    selectedOption() {
      const EMPTY_VALUE = null;

      if (!this.value) return EMPTY_VALUE;
      return (
        this.formattedOptions.find(({ isSelected }) => isSelected) ||
        EMPTY_VALUE
      );
    },
    selectedLabel() {
      if (!this.selectedOption) return null;
      return this.selectedOption.label;
    },
    fieldValue() {
      if (!this.isSearchable) return this.selectedLabel;
      return this.isVisibleDropdown ? this.searchQuery : this.selectedLabel;
    },
    fieldPlaceholder() {
      return this.isSearchable
        ? this.selectedLabel || this.placeholder
        : this.placeholder;
    },
    fieldReadOnly() {
      return !this.isVisibleDropdown || !this.isSearchable;
    },
  },
  methods: {
    _setDropdownVisibility(value) {
      if (this.isVisibleDropdown === value) return;
      this.isVisibleDropdown = value;
    },
    _emitValue(value) {
      this.$emit("change", value);
    },
    _emitSearchQuery(value) {
      this.$emit("update:search-query", value);
    },
    _selectOption(value) {
      this.select(value);
      this.focus();
      this.hideDropdown();
    },

    showDropdown() {
      this._setDropdownVisibility(true);
    },
    hideDropdown() {
      this._setDropdownVisibility(false);
      this._emitSearchQuery("");
    },
    focus() {
      this.$refs.field.focus();
    },
    select(value) {
      this._emitValue(value);
    },
  },
};
</script>

<style>
.ui-select__field {
  cursor: pointer;
}

.ui-select__options-item {
}

.ui-select__dropdown-placeholder {
  padding: 0.5rem;
  color: hsl(var(--gray-hsl));
  font-size: 0.8em;
  text-align: center;
}

.ui-select__arrow {
  --select-arrow-rotate: 0deg;

  color: hsl(var(--gray-hsl));
  transform: rotate(var(--select-arrow-rotate));
  transition: transform 0.2s ease;
}

.ui-select__arrow_inverted {
  --select-arrow-rotate: 180deg;
}

.ui-select__options-list {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  max-height: 200px;
}

.ui-select__options-item {
  --select-option-background: transparent;

  display: flex;
  align-items: center;
  padding-left: var(--field-padding-x);
  padding-right: var(--field-padding-x);
  min-height: 2.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  background-color: var(--select-option-background);
  overflow: hidden;
  cursor: pointer;
}

.ui-select__options-item:hover,
.ui-select__options-item:focus-visible {
  --select-option-background: hsla(var(--primary-hsl), 0.08);
}

.ui-select__options-item_selected {
  color: hsl(var(--primary-hsl));
}
</style>
