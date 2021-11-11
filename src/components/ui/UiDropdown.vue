<template>
  <div ref="dropdown" class="ui-dropdown">
    <slot></slot>

    <transition name="drop-up">
      <div v-if="isVisible" class="ui-dropdown__inner">
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UiDropdown",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.ui-dropdown {
  position: relative;
}

.ui-dropdown__inner {
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  padding: 0.5rem 0;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: hsl(var(--white-hsl));
  box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: var(--dropdown-zindex);
}
</style>
