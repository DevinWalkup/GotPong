<template>
  <div>
    <rules-modal :rules-content='rulesContent' v-show='showRules' @close='showRules = false' />
    <BaseLayout>
      <template #headerBtn>
        <vue-button id='cancel' name='cancel' label='Cancel' @click='redirect' />
      </template>
      <template #pageSectionTitle>
        <div v-if='!loading'>
          <div class='mb-5'>
            <WarningAlert :alert='saveAlert' :show-dismiss-button='false' />
          </div>
          <div class='hidden md:flex flex-1 justify-center md:justify-between mb-3 space-x-4'>
            <p>
              {{ gameName }}
            </p>
            <div class='flex flex-1 space-x-2 justify-end'>
              <vue-button name='showRules' variant='secondary' id='show-rules' label='Show Rules' type='button'
                          @click='showRules = true' />
              <vue-button name='delete' id='delete-game' label='Delete Game' type='button' @click='deleteGame' />
            </div>
          </div>
          <div class='block md:hidden'>
            <div class='w-full text-center'>
              <p>
                {{ gameName }}
              </p>
            </div>
            <div class='flex flex-1 justify-between my-3'>
              <vue-button name='showRules' variant='secondary' id='show-rules' label='Show Rules' type='button'
                          @click='showRules = true' />
              <vue-button name='delete' id='delete-game' label='Delete Game' type='button' @click='deleteGame' />
            </div>
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
  </div>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout'
import VueButton from '~/components/fields/vueButton'
import Game from '~/components/game/Game'
import Loader from '~/components/layout/Loader'
import Header from '~/components/layout/Header'
import WarningAlert from '~/components/alerts/WarningAlert'
import RulesModal from '~/components/game/RulesModal'

export default {
  async asyncData({ params, $content }) {
    const code = params.code
    const rules = await $content('rules').only(['page']).fetch()

    let rulesContent = rules.page
    return { code, rulesContent }
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
    Game,
    RulesModal
  },

  data() {
    return {
      loading: true,
      game: {},
      showRules: false
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
