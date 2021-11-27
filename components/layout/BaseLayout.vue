<template>
  <div class='bg-gray-800 flex flex-col min-h-screen h-full'>
    <Alert />
    <div class='w-full bg-gray-900 pb-3' id='header-section'>
      <div class='block md:flex md:flex-1 justify-between space-x-0 md:space-x-3 ml-10 mx-5 mt-5 items-center'>
        <div @click='goHome' class='flex justify-center cursor-pointer'>
          <Logo />
        </div>
        <div class='flex flex-1 justify-between w-full items-center' v-if='!isMobile'>
          <div class='ml-3'>
            <nuxt-link to='/' class='text-white bg-gray-500 p-2 rounded-md hover:bg-gray-700' active-class='text-gray-200 bg-gray-700' exact>Join Game</nuxt-link>
            <nuxt-link to='/rules' class='text-white bg-gray-500 p-2 rounded-md hover:bg-gray-700' active-class='text-gray-200 bg-gray-700'>Rules</nuxt-link>
          </div>
          <div class='mt-5 md:mt-0'>
            <slot name='headerBtn' v-if='$slots.headerBtn'>

            </slot>
          </div>
        </div>
        <div class='mt-2' v-else>
          <div class='w-full flex flex-1 justify-center space-x-2'>
            <nuxt-link to='/' class='text-white bg-gray-500 p-2 rounded-md hover:bg-gray-700' active-class='text-gray-200 bg-gray-700' exact>Join Game</nuxt-link>
            <nuxt-link to='/rules' class='text-white bg-gray-500 p-2 rounded-md hover:bg-gray-700' active-class='text-gray-200 bg-gray-700'>Rules</nuxt-link>
          </div>
          <div class='mt-5 md:mt-0 flex flex-1 justify-center'>
            <slot name='headerBtn' v-if='$slots.headerBtn'>

            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class='max-w-xs md:max-w-2xl w-full mx-auto h-full mt-10 md:mt-24 mb-5'>
      <main class='m-auto w-full justify-center'>
        <Header v-if='$slots.pageSectionTitle'>
          <slot name='pageSectionTitle'></slot>
        </Header>
        <div v-if='$slots.sideView'>
          <div class='w-full space-y-3' v-if='isMobile'>
            <div class='block md:hidden bg-gray-700 rounded-sm shadow-lg p-4 h-full'>
              <slot name='sideView'></slot>
            </div>
            <div class='bg-gray-700 rounded-sm shadow-lg p-4 h-full'>
              <slot name='page'></slot>
            </div>
          </div>
          <div class='flex md:flex-1 md:justify-between md:space-x-3' v-else>
            <div class='bg-gray-700 rounded-sm shadow-lg p-4 h-full'>
              <slot name='page'></slot>
            </div>
            <div class='bg-gray-700 rounded-sm shadow-lg p-4 h-full sticky top-3'>
              <slot name='sideView'></slot>
            </div>
          </div>
        </div>
        <div class='bg-gray-700 rounded-sm shadow-lg p-4 h-full' v-else>
          <slot name='page'></slot>
        </div>
      </main>
    </div>
    <div class='flex flex-1 relative mt-20'>
      <div class='absolute bottom-0 bg-gray-900 w-full'>
        <div class='p-5 ml-5 flex flex-1 justify-start space-x-1 items-center'>
          <p class='text-white text-sm'>&copy;</p>
          <Logo variant='secondary' />
          <p class='text-white text-sm'>All rights reserved.</p>
        </div>
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
    },

    handleResize() {
      this.width = window.innerWidth;
    }
  },

  data() {
    return {
      width: 0
    }
  },

  mounted() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  computed: {
    isMobile() {
      return this.width <= 768;
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth !important;
}
</style>
