<template>
  <div class="textbox">
    <input
      :type="type"
      :value="value"
      v-bind="$attrs"
      @input="$emit('input', $event)"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text'
    }
  }
};
</script>

<style lang="scss" scoped>
  .textbox {
    background: #fff;
    border: 2px solid $surface-3;
    border-radius: 0.5rem;
    height: 2.5rem;
    width: max(350px, 100%);
    padding: 0 1rem;
    transition: border-color 200ms ease;

    @include shadow;

    &:focus-within {
      border-color: $color;
    }

    input {
      font: inherit;
      background: none;
      border: none;
      outline: none;
      height: inherit;
    }
  }
</style>
