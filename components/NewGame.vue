<template>
  <page-content
    sub-title='Input the name of the game and the participants below!'
    header='Create a New Game'
    id='new-game'>
    <form @submit.prevent='onSubmit'>
      <div class='w-full mt-5 space-y-3'>
        <vue-input
          label='Game Name'
          name='game-name'
          id='gameName'
          required
          v-model='model.GameName'
          placeholder='Game Name...' />
        <vue-input
          label='View Wins as Roman Numerals'
          name='view-as-roman'
          id='romanNumerals'
          type='checkbox'
          v-model='model.ViewWinsAsRomanNumerals'
        />
        <vue-input
          label='Number of players per round'
          name='playersPerRound'
          id='players-per-round'
          type='number'
          required
          v-model='model.PlayersPerRound'
          placeholder='2'
          min='2'/>
        <Header>
          Players
        </Header>
        <div class='w-full' v-for='i in totalPlayers' :key='i'>
          <div class='flex flex-1 justify-start space-x-5 items-center' @mouseenter='setActivePlayer(i)'
               @mouseleave='clearActivePlayer'>
            <player-color-picker
              v-if='currentPlayerNameSet(i)'
              :player-name='getPlayerName(i)'
              :color='getPlayerColor(i)'
              :id='`player-color-${i}`'
              @color='setPlayerColor($event, i)' />
            <vue-input
              label='Player Name'
              :name='`player-name-${i}`'
              :id='`playerName${i}`'
              required
              placeholder='Player Name...'
              @input='handleAddPlayer($event, i)' />
            <div @click='removePlayer(i)' v-if='isActivePlayer(i)'>
              <XIcon class='w-6 h-6 text-red-500' />
            </div>
          </div>
        </div>
        <vue-button name='add-player' id='addPlayer' label='Add Player' @click='addPlayer' />
      </div>
      <div class='bottom-3 flex flex-1 justify-end space-x-4 mt-5'>
        <vue-button name='create-game' id='createGame' label='Create Game' type='submit' />
        <vue-button name='cancel' id='cancel' label='Cancel' type='button' variant='secondary' @click='cancel' />
      </div>
    </form>
  </page-content>
</template>

<script>
import PageContent from '~/components/layout/PageContent'
import vueInput from '~/components/fields/vueInput'
import vueButton from '~/components/fields/vueButton'
import Header from '~/components/layout/Header'
import PlayerColorPicker from '~/components/fields/PlayerColorPicker'
import XIcon from '~/components/Icons/XIcon'

export default {
  name: 'NewGame',

  components: {
    PlayerColorPicker,
    Header,
    PageContent,
    vueInput,
    vueButton,
    XIcon
  },

  data() {
    return {
      totalPlayers: 2,
      model: {
        GameName: '',
        Players: [],
        ViewWinsAsRomanNumerals: false,
        PlayersPerRound: 2
      },
      activePlayerIndex: null
    }
  },

  methods: {
    validateModel() {
      let errors = [];

      if (!this.model.GameName) {
        errors.push('The Game Name is required!');
      }

      if (!this.model.Players.length) {
        errors.push('There must be at least one player for the game!')
      }

      if (this.model.Players.some((player) => !player.PlayerName)) {
        errors.push("The players name is required!");
      }

      if (this.model.PlayersPerRound < 2) {
        errors.push("The minimum players per round is 2!");
      }

      if (errors.length) {
        this.$store.dispatch('alerts/error', {message: 'There were errors in the form!', fields: errors});
      }

      return errors.length === 0;
    },

    onSubmit() {
      if (!this.validateModel()) {
        return;
      }

      this.$api.post('/create', this.model).then((resp) => {
        this.$store.dispatch('alerts/success', "Game successfully created!");
        this.$nuxt.$options.router.push(`/game/${resp.data.game.GameCode}`)
        return;
      }).catch((err) => {
        this.$store.dispatch('alerts/error', err.response.data.message);
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
        this.model.Players.push({
          Id: index,
          PlayerName: name,
          PlayerColor: 'red'
        })
      } else {
        currentPlayer.PlayerName = name
      }
    },

    getPlayer(index) {
      let currentPlayer = this.model.Players.find((player) => player.Id === index)

      return currentPlayer
    },

    addPlayer() {
      this.totalPlayers++
    },

    setActivePlayer(index) {
      if (index <= 2) {
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
      if (index <= 2) {
        return
      }

      let currentPlayer = this.getPlayer(index)

      this.totalPlayers--
      if (!currentPlayer) {
        return
      }

      this.model.Players = this.model.Players.filter((player) => player.Id !== index)
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
    },

    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
