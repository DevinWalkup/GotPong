<template>
  <div class='bg-gray-800 flex flex-col min-h-screen h-full'>
    <Alert />
    <div class='w-full' id='header-section'>
      <div class='block md:flex md:flex-1 justify-between space-x-0 md:space-x-3 ml-10 mx-5 mt-5'>
        <div @click='goHome' class='flex justify-center cursor-pointer'>
          <Logo />
        </div>
        <div class='block w-full'>
          <div class='flex justify-center md:justify-end mt-5 md:mt-0'>
            <slot name='headerBtn' v-if='$slots.headerBtn'>

            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class='max-w-xs md:max-w-2xl w-full my-5 h-screen mx-auto'>
      <main class='m-auto w-full h-full'>
        <Header v-if='$slots.pageSectionTitle'>
          <slot name='pageSectionTitle'></slot>
        </Header>
        <div class='bg-gray-700 rounded-sm shadow-lg p-4'>
          <slot name='page'></slot>
        </div>
      </main>
    </div>
    <div class='sticky bottom-0 bg-gray-900 w-full'>
      <div class='p-5 ml-5 flex flex-1 justify-start space-x-1 items-center'>
        <p class='text-white text-sm'>&copy;</p>
        <Logo variant='secondary' />
        <p class='text-white text-sm'>All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo'
import Alert from '~/components/alerts/Alert'
import Header from '~/components/layout/Header'

export default {
  name: 'BaseLayout',

  components: {
    Header,
    Alert,
    Logo
  },

  methods: {
    goHome() {
      this.$nuxt.$options.router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
