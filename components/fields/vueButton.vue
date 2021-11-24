<template>
  <button
    :id='id'
    :name='name'
    :type='type'
    :class='btnClass'
    @click='onClick'>
    {{label}}
  </button>
</template>

<script>
export default {
  name: 'vueButton',

  props: {
    type: {
      type: String,
      default: "button"
    },

    label: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    variant: {
      type: String,
      default: "default"
    },

    color: {
      type: String,
      default: null
    }
  },

  computed: {
    btnClass() {
      let baseClass = "justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:col-start-2 sm:text-sm text-base font-medium ";

      if (this.color) {
        let colorParts = this.color.split('-');
        let hoverClass = `hover:bg-${colorParts[1]}-600`;
        return baseClass += ` bg-${colorParts[1]}-500 ${hoverClass} text-white`;
      }
      if (this.variant === "default") {
        return baseClass += " bg-red-500 hover:bg-red-600 text-white";
      } else {
        return baseClass += " bg-gray-50 hover:bg-gray-100 text-black"
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>
