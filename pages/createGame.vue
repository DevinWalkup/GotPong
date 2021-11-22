<template>
  <BaseLayout>
    <template #headerBtn>
      <vue-button id='cancel' name='cancel' label='Cancel' @click='redirect' />
    </template>
    <template #page>
      <NewGame @cancel='redirect'/>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout'
import VueButton from '~/components/fields/vueButton'
import NewGame from '~/components/NewGame'
export default {
  name: 'createGame',

  components: {
    VueButton,
    BaseLayout,
    NewGame
  },

  methods: {
    redirect() {
      this.$nuxt.$options.router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
