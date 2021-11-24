<template>
  <BaseLayout>
    <template #headerBtn>
      <vue-button id='cancel' name='cancel' label='Cancel' @click='redirect' />
    </template>
    <template #page>
      <page-content
        sub-title='Input the additional player information that you would like to add to the game'
        header='Add Additional Players'
        id='participants'>
        <form @submit.prevent='onSubmit' class='mt-5'>
          <div class='w-full'>
            <div class='w-full mb-4' v-for='i in totalPlayers' :key='i'>
              <div class='flex flex-1 justify-start space-x-5 items-center' @mouseenter='setActivePlayer(i)'
                   @mouseleave='clearActivePlayer'>
                <div @click='removePlayer(i)' v-if='isActivePlayer(i)'>
                  <XIcon class='w-4 h-4 text-red-500' />
                </div>
                <vue-input
                  label='Player Name'
                  :name='`player-name-${i}`'
                  :id='`playerName${i}`'
                  required
                  placeholder='Player Name...'
                  @input='handleAddPlayer($event, i)' />
                <player-color-picker
                  v-if='currentPlayerNameSet(i)'
                  :player-name='getPlayerName(i)'
                  :color='getPlayerColor(i)'
                  :id='`player-color-${i}`'
                  @color='setPlayerColor($event, i)' />
              </div>
            </div>
            <vue-button name='add-player' id='addPlayer' label='Add Player' @click='addPlayer' />
          </div>
          <div class='sticky bottom-3 flex flex-1 justify-end space-x-4 mt-5'>
            <vue-button name='save-players' id='savePlayers' label='Save' type='submit' />
            <vue-button name='cancel' id='cancel' label='Cancel' type='button' variant='secondary' @click='redirect' />
          </div>
        </form>
      </page-content>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout'
import vueButton from '~/components/fields/vueButton'
import vueInput from '~/components/fields/vueInput'
import PlayerColorPicker from '~/components/fields/PlayerColorPicker'
import XIcon from '~/components/Icons/XIcon'
import PageContent from '~/components/layout/PageContent'

export default {
  async asyncData({ params }) {
    const code = params.code
    return { code }
  },

  name: 'AddPlayer_code',

  data() {
    return {
      totalPlayers: 1,
      activePlayerIndex: null,
      Players: []
    }
  },

  components: {
    BaseLayout,
    vueInput,
    vueButton,
    PlayerColorPicker,
    XIcon,
    PageContent
  },

  methods: {
    redirect() {
      this.$nuxt.$options.router.push(`/game/${this.code}`)
    },

    async onSubmit() {
        if (!this.Players.length) {
          this.$store.dispatch('alerts/error', "You must add a player to save!");
          return;
        }

        if (this.Players.some((player) => !player.PlayerName)) {
          this.$store.dispatch('alerts/error', "There were errors with the inputted player information!");
          return;
        }

        let resp = await this.$api.post('/newPlayer', {
          GameCode: this.code,
          Players: this.Players
        }).then((resp) => {
          if (!resp.data.success) {
            this.$store.dispatch('alerts/error', "There was an error adding the players!");
            this.redirect();
            return;
          }

          this.$store.dispatch('alerts/success', "Successfully added the new players!");
          this.redirect();
        }).catch((err) => {
          this.$store.dispatch('alerts/error', err.message);
          this.redirect();
          return;
        })
    },

    handleAddPlayer(name, index) {
      if (!name) {
        return
      }

      if (typeof name !== 'string') {
        return
      }

      let currentPlayer = this.getPlayer(index)

      if (!currentPlayer) {
        this.Players.push({
          Id: index,
          PlayerName: name,
          PlayerColor: 'red'
        })
      } else {
        currentPlayer.PlayerName = name
      }
    },

    getPlayer(index) {
      let currentPlayer = this.Players.find((player) => player.Id === index)

      return currentPlayer
    },

    addPlayer() {
      this.totalPlayers++
    },

    setActivePlayer(index) {
      if (index === 1) {
        return false
      }
      this.activePlayerIndex = index
    },

    clearActivePlayer() {
      this.activePlayerIndex = null
    },

    isActivePlayer(index) {
      return this.activePlayerIndex === index
    },

    removePlayer(index) {
      if (index === 1) {
        return
      }

      let currentPlayer = this.getPlayer(index)

      this.totalPlayers--
      if (!currentPlayer) {
        return
      }

      this.Players = this.Players.filter((player) => player.Id !== index)
    },

    currentPlayerNameSet(index) {
      let currentPlayer = this.getPlayer(index)

      if (!currentPlayer) {
        return false
      }

      return !!currentPlayer.PlayerName
    },

    getPlayerName(index) {
      let currentPlayer = this.getPlayer(index)

      if (!currentPlayer) {
        return ''
      }

      return currentPlayer.PlayerName
    },

    getPlayerColor(index) {
      let currentPlayer = this.getPlayer(index)

      if (!currentPlayer) {
        return 'red'
      }

      return currentPlayer.PlayerColor
    },

    setPlayerColor(color, index) {
      let currentPlayer = this.getPlayer(index)

      if (!currentPlayer) {
        return
      }

      currentPlayer.PlayerColor = color
    }
  }
}
</script>

<style scoped>

</style>
