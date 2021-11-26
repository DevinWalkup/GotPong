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
        <div class='flex flex-1 justify-center md:justify-between mb-3 space-x-4'>
          <p>
            {{ gameName }}
          </p>
          <vue-button name='delete' id='delete-game' label='Delete Game' type='button' @click='deleteGame' />
        </div>
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

  head() {
    return {
      title: `GotPong - ${this.game.GameName}`,
      meta: [
        {
          name: 'description',
          content: `${this.game.GameName} GotPong game`
        }
      ]
    }
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
    },

    async deleteGame() {
      if (!this.game || !this.game.GameId) {
        return
      }

      let resp = await this.$api.delete('/deleteGame', {
        params: {
          gameId: this.game.GameId
        }
      }).then((res) => {
        if (res.data.success) {
          this.$store.dispatch('alerts/success', 'Deleted the game!')
          this.redirect()
          return
        } else {
          this.$store.dispatch('alerts/error', 'There was an error deleting the game!')
        }
      }).catch(() => {
        this.$store.dispatch('alerts/error', 'There was an error deleting the game!')
      })
    }
  }
}
</script>
