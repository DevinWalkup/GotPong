<template>
  <div class='bg-gray-800 flex flex-col min-h-screen h-full'>
    <div class='w-full' id='header-section'>
      <div class='flex flex-1 justify-between space-x-3 ml-10 mx-5 mt-5'>
        <div>
          <Logo />
        </div>
        <slot name='headerBtn' v-if='$slots.headerBtn'>

        </slot>
      </div>
    </div>
    <div class='max-w-sm md:max-w-2xl w-full m-auto'>
      <div class='bg-gray-700 rounded-sm shadow-lg p-4'>
        <main>
          <slot name='page'></slot>
        </main>
      </div>
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

export default {
  name: 'BaseLayout',

  components: {
    Logo
  }
}
</script>

<style scoped>

</style>
