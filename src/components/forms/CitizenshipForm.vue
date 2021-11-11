<template>
  <div class="citizenship-form">
    <UiFormRow>
      <UiFormItem label="Гражданство" span="6">
        <UiSelect
          :value="citizenship"
          :options="citizenshipOptions"
          :search-query.sync="searchQuery"
          is-searchable
          @update:search-query="_emitSearchRequest($event)"
          @change="_emitValue('citizenship', $event)"
        />
      </UiFormItem>
    </UiFormRow>
  </div>
</template>

<script>
import UiFormItem from "../ui/UiFormCell";
import UiFormRow from "../ui/UiFormRow";
import UiSelect from "../ui/fields/UiSelect";

import { ARRAY_PROP_DEFAULT, OPTIONS_PROP_VALIDATOR } from "@/utils/consts";

export default {
  name: "CitizenshipForm",
  components: {
    UiFormItem,
    UiFormRow,
    UiSelect,
  },
  props: {
    citizenship: {
      type: String,
      default: null,
    },
    citizenshipOptions: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
      validator: OPTIONS_PROP_VALIDATOR,
    },
  },
  data() {
    return {
      searchQuery: null,
    };
  },
  methods: {
    _emitValue(key, value) {
      this.$emit(`update:${key}`, value);
    },
    _emitSearchRequest(value) {
      this.$emit("citizenship-search-request", value);
    },
  },
};
</script>
