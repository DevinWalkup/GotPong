<template>
  <p class="font-bold" :class='headerClass'>
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'Header',

  props: {
    variant: {
      type: String,
      default: "default"
    },
    color: {
      type: String,
      default: "text-red-500"
    }
  },

  computed: {
    textSize() {
      if (this.variant === 'default') {
        return 'text-3xl';
      }

      return 'text-2xl';
    },

    headerClass() {
      return [this.textSize, this.color].join(" ");
    }
  }
}
</script>
