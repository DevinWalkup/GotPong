<template>
  <div id='landing-content'>
    <div class='w-full'>
      <Header>Join a Game</Header>
      <SubTitle>Input the game code below!</SubTitle>
    </div>
    <form @submit.prevent='onSubmit'>
      <div class='w-full mt-5'>
        <vue-input
          label='Games Code'
          name='game-code'
          id='gameCode'
          required
          v-model='gameCode'
          placeholder='Game Code...' />
      </div>
      <div class='sticky bottom-3 flex flex-1 justify-end mt-5'>
        <vue-button name='join-game' id='joinGame' label='Join Game' type='submit' />
      </div>
    </form>
  </div>
</template>

<script>
import Header from './layout/Header'
import SubTitle from '~/components/layout/SubTitle'
import vueInput from '~/components/fields/vueInput'
import vueButton from '~/components/fields/vueButton'

export default {
  name: 'Landing',

  components: {
    Header,
    SubTitle,
    vueInput,
    vueButton
  },

  data() {
    return {
      gameCode: ''
    }
  },

  methods: {
    onSubmit() {
      if (!this.gameCode) {
        this.$store.dispatch('alerts/error', 'The game code is required!');
        return;
      }

      this.$nuxt.$options.router.push(`/game/${this.gameCode}`);
    },
    onClick() {
      console.log('redirecting')
    }
  }
}
</script>
