<template>
  <div class="textbox">
    <input
      :type="type"
      :value="value"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    >
    <div v-if="!!$slots.default" class="addon">
      <slot />
    </div>
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
    background: $surface-1;
    border: 2px solid $surface-2;
    border-radius: 0.5rem;
    height: 2.5rem;
    width: max(350px, 100%);
    padding: 0 1rem;
    transition: border-color 200ms ease;
    display: flex;

    &:focus-within {
      border-color: $color;
    }

    input {
      font: inherit;
      background: none;
      border: none;
      outline: none;
      height: inherit;
      color: inherit;
      width: 100%;
    }

    .addon {
      margin-right: -1rem;
      margin-left: 1rem;
      max-height: 100%;
    }
  }
</style>
