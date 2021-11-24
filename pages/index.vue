<template>
  <BaseLayout>
    <template #headerBtn>
      <vue-button name='create-game' id='createGame' label='Create Games' @click='onClick' />
    </template>
    <template #page>
      <Landing />
    </template>
  </BaseLayout>
</template>

<script>
import Landing from '~/components/Landing'
import BaseLayout from '~/components/layout/BaseLayout'
import vueButton from '~/components/fields/vueButton'

export default {
  name: "Index",

  components: {
    BaseLayout,
    Landing,
    vueButton
  },

  methods: {
    onClick() {
      this.$nuxt.$options.router.push('/createGame')
    }
  }
}
</script>
