<template>
  <transition name="modal">
    <div class="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all overflow-auto">
      <div>
        <div class="w-3/4 md:w-1/2 m-auto p-10 bg-gray-800 rounded-md shadow-lg transition">
          <div class='relative'>
            <div class='absolute right-2 top-2 cursor-pointer' @click="$emit('close')">
              <XIcon class='text-gray-400 w-5 h-5'/>
            </div>
          </div>

          <Header>
            Rules
          </Header>

          <div class='my-2'>
            <hr class='bg-gray-900' />
          </div>

          <div class="h-full overflow-auto">
            <div class='space-y-4'>
            <json-content v-for='page in rulesContent' :key='page.title' :page='page' />
            </div>
          </div>

          <div class='my-2'>
            <hr class='bg-gray-900' />
          </div>

          <div class="mt-3">
            <vue-button id='close-modal' label='Close' name='closeModal' @click="$emit('close')" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Header from '~/components/layout/Header'
import JsonContent from '~/components/layout/JsonContent'
import VueButton from '~/components/fields/vueButton'
import XIcon from '~/components/Icons/XIcon'

export default {
  name: 'RulesModal',

  props: {
    rulesContent: {
      type: Array,
      required: true
    }
  },

  components: {
    XIcon,
    VueButton,
    JsonContent,
    Header }
}
</script>

<style scoped>

</style>
