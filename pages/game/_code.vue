<template>
  <BaseLayout>
    <template #headerBtn>
      <vue-button id='cancel' name='cancel' label='Cancel' @click='redirect' />
    </template>
    <template #pageSectionTitle>
      <div v-if='!loading'>
        <div class='mb-5'>
          <WarningAlert :alert='saveAlert' :show-dismiss-button='false' />
        </div>
        <p>
          {{ gameName }}
        </p>
      </div>
    </template>
    <template #page>
      <Loader v-if='loading' />
      <div class='w-full' v-else>
        <Game :game='game' />
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout'
import VueButton from '~/components/fields/vueButton'
import Game from '~/components/game/Game'
import Loader from '~/components/layout/Loader'
import Header from '~/components/layout/Header'
import WarningAlert from '~/components/alerts/WarningAlert'

export default {
  async asyncData({ params }) {
    const code = params.code
    return { code }
  },

  name: 'Game_code',

  components: {
    WarningAlert,
    Header,
    Loader,
    VueButton,
    BaseLayout,
    Game
  },

  data() {
    return {
      loading: true,
      game: {}
    }
  },

  computed: {
    gameName() {
      if (!this.game.GameName) {
        return ''
      }

      return this.game.GameName
    },

    saveAlert() {
      return {
        Content: 'If you would like to save this game, copy the game code or click the box above the game code'
      }
    }
  },

  mounted() {
    this.loadGame()
  },

  methods: {
    redirect() {
      this.$nuxt.$options.router.push('/')
    },

    async loadGame() {
      if (!this.code) {
        this.$store.dispatch('alerts/error', 'The game code was not provided')
        return
      }

      try {
        let resp = await this.$api.get('/join', {
          params: {
            gameCode: this.code
          }
        })

        if (!resp) {
          this.$store.dispatch('alerts/error', 'Error getting the game')
          this.redirect()
          return
        }

        this.game = resp.data.game
        this.loading = false
      } catch (e) {
        this.$store.dispatch('alerts/error', e.message)
        this.redirect()
        return
      }
    }
  }
}
</script>
