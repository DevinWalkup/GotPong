<template>
  <div :id='id'>
    <div class='w-full items-center'>
      <label :for='id' class='text-red-500'>
        Player Color
      </label>
      <div class='flex flex-1 justify-center'>
        <div class='rounded-full h-10 w-10 border border-white' :class='pickerColor' @click='togglePicker'>
        </div>
      </div>
      <div class='block'>
        <div class='relative'>
          <div id='color-picker' class='absolute z-10 bg-gray-400 rounded-md p-5 shadow-md' v-if='showPicker'
               @blur='hidePicker' tabindex='1'>
            <div class='flex flex-1 space-x-4'>
              <div v-for='color in colors'
                   :id='color'
                   :key='color'
                   class='rounded-full p-4 border'
                   :class='getPickerColorClass(color)'
                   @click='setCurrentColor(color)' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerColorPicker',

  props: {
    id: {
      type: String,
      required: true
    },

    playerName: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: true
    }
  },

  computed: {
    colors() {
      return ['red', 'blue', 'green', 'yellow', 'purple', 'pink']
    },

    pickerColor() {
      return this.getColorClass(this.currentColor)
    }
  },

  data() {
    return {
      currentColor: 'red',
      showPicker: false
    }
  },

  mounted() {
    if (!this.color) {
      return
    }

    this.currentColor = this.color
  },

  methods: {
    setCurrentColor(color) {
      if (this.currentColor === color) {
        return
      }

      this.currentColor = color
      this.$emit('color', this.currentColor)
      this.togglePicker();
    },

    getPickerColorClass(color) {
      return `${this.getColorClass(color)} ${this.isColorActive(color) ? 'border-white' : 'border-black'}`
    },

    getColorClass(color) {
      return `bg-${color}-500`
    },

    hidePicker() {
      this.showPicker = false;
    },

    togglePicker() {
      this.showPicker = !this.showPicker

      if (!this.showPicker) {
        let ele = document.getElementById('color-picker')

        if (ele) {
          ele.blur();
        }

        return
      }

      this.$nextTick(() => {
        let ele = document.getElementById('color-picker')

        if (ele) {
          ele.focus()
        }
      })
    },

    isColorActive(color) {
      return this.currentColor === color
    }
  }
}
</script>
