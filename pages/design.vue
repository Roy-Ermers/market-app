<template>
  <main>
    <h1>Colors</h1>
    <div class="brand swatch">
      Brand
    </div>
    <div class="surface-1 swatch">
      surface-1
    </div>
    <div class="surface-2 swatch">
      surface-2
    </div>
    <div class="surface-3 swatch">
      surface-3
    </div>
    <div class="surface-4 swatch">
      surface-4
    </div>
    <div class="text swatch">
      text
    </div>
    <div class="text-shade swatch">
      text-shade
    </div>
  </main>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
  .swatch {
    display: inline-block;
    margin: 1rem;
    aspect-ratio: 1 / 1;
    width: 6rem;
    line-height: 6rem;
    text-align: center;
    border-radius: 0.25rem;

    @include shadow;

    &.brand {
      background-color: $color;
    }

    &.surface-1 {
      background-color: $surface-1;
    }

    &.surface-2 {
      background-color: $surface-2;
    }

    &.surface-3 {
      background-color: $surface-3;
    }

    &.surface-4 {
      background-color: $surface-4;
    }

    &.text {
      background-color: $text-color;
      color: #fff;
    }

    &.text-shade {
      color: #fff;
      background-color: $text-shade;
    }
  }
</style>
