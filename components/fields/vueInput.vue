<template>
  <div>
    <label :for='id' class='text-red-500' v-if='!isCheckbox'>
      <span :class="{'sr-only' : srOnly, '' : !srOnly }">{{ label }}</span> <span v-if="required">*</span>
      <input
        :id='id'
        :type='type'
        :name='name'
        :autocomplete='autocomplete'
        :placeholder="placeholder"
        class='mt-1 w-full bg-gray-400 text-white p-2 rounded-md placeholder-gray-300'
        v-model='inputValue'
      >
    </label>
    <label :for='id' class='text-red-500' v-else>
      <input
        :id='id'
        :type='type'
        :name='name'
        :autocomplete='autocomplete'
        class='mt-1 w-4 bg-gray-400 text-white p-2 rounded-md'
        v-model='inputValue'>
      <span :class="{'sr-only' : srOnly, '' : !srOnly }">{{ label }}</span> <span v-if="required">*</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'vueInput',

  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    srOnly: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    placeholder: {
      type: String
    },
    value: {
      type: String | Boolean | Number,
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    }
  },

  computed: {
    isCheckbox() {
     return this.type === "checkbox";
    }
  },

  data() {
    return {
      inputValue: null
    }
  },

  mounted() {
    if (this.value !== null) {
      this.inputValue = this.value
    }
  },

  watch: {
    inputValue(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }

      let value = typeof newVal === 'string' ? newVal.trim() : newVal;
      this.$emit('input', value);
    },
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }

        let value = typeof newVal === 'string' ? newVal.trim() : newVal;

        this.inputValue = value;
      }
    }
  }
}
</script>

<style scoped>

</style>
