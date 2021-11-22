<template>
  <div class='flex'>
    <p class="text-red-500 font-bold" :class='size'>Got</p>
    <p class="text-white font-bold" :class='size'>Pong</p>
  </div>
</template>

<script>
export default {
  name: 'Logo',

  props: {
    variant: {
      type: String,
      default: "base"
    }
  },

  computed: {
    size() {
      return this.variant === "base" ? "text-6xl" : "text-xl"
    }
  }
}
</script>
