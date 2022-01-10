<template>
  <div class="panel-layout" :class="{ open, overlay }">
    <main>
      <slot />
    </main>
    <transition>
      <div v-if="open" class="panel">
        <slot name="panel" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },

    overlay: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
  .panel-layout {
    display: flex;
    overflow-x: hidden;
    z-index: 0;
    height: 100vh;

    main {
      flex: 1;
      z-index: 0;
      transition: filter 500ms ease-in-out;
    }

    @include mobile {
      &.open > .panel {
        right: 0;
      }
    }

    .panel {
      z-index: 1;
      background-color: $surface-1;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      width: 20vw;
      overflow-y: auto;
      overflow-x: clip;
      scrollbar-gutter: stable;

      @include shadow;

      ::v-deep > hr {
        margin: 1.5rem -1rem;
        width: calc(100% + 2rem);
      }

      @include mobile {
        position: fixed;
        right: -100vw;
        width: 100vw;
        height: 100vh;
        top: 0;

        &.v-leave-active {
          transition: right 500ms ease-in;
        }

        &.v-enter-active {
          transition: right 500ms ease-out;
        }

        &.v-enter-to,
        &.v-leave {
          right: 0;
        }

        &.v-enter,
        &.v-leave-to {
          right: -100vw;
        }
      }

      @include desktop {
        &.v-leave-active {
          transition: margin-right 500ms ease-in, margin-left 500ms ease-in;
        }

        &.v-enter-active {
          transition: margin-right 500ms ease-out, margin-left 500ms ease-out;
        }

        &.v-enter-to,
        &.v-leave {
          margin-right: 0;
          margin-left: 0;
        }

        &.v-enter,
        &.v-leave-to {
          margin-right: -100%;
          margin-left: 100%;
        }
      }
    }
  }
</style>
