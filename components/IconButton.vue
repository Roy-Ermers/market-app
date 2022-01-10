<template>
  <button @click="$emit('click')">
    <component :is="require(`@/assets/icons/${icon}.svg?inline`)" />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'crosshair'
    }
  }
};
</script>

<style lang="scss" scoped>
  button {
    background: none;
    padding: 0.25rem;
    color: $surface-4;

    &:focus-visible,
    &:active {
      color: $color;
    }
  }
</style>
