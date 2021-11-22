<template>
  <page-content
    sub-title='Input the name of the game and the participants below!'
    header='Create a New Game'
    id='new-game'
    @submit='onSubmit'>
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
      <Header>
        Players
      </Header>
      <div class='w-full' v-for='i in totalPlayers' :key='i'>
        <div class='flex flex-1 justify-start space-x-5 items-center' @mouseenter='setActivePlayer(i)' @mouseleave='clearActivePlayer'>
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
            @color='setPlayerColor($event, i)'/>
        </div>
      </div>
      <vue-button name='add-player' id='addPlayer' label='Add Player' @click='addPlayer' />
    </div>
    <div class='sticky bottom-3 flex flex-1 justify-start space-x-4 mt-5'>
      <vue-button name='create-game' id='createGame' label='Create Game' type='submit' />
      <vue-button name='cancel' id='cancel' label='Cancel' type='button' variant='secondary' @click='cancel' />
    </div>
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
      totalPlayers: 1,
      model: {
        GameName: '',
        Players: [],
        ViewWinsAsRomanNumerals: false
      },
      activePlayerIndex: null
    }
  },

  methods: {
    onSubmit() {
      console.log('Submitting')
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
      if (index === 1) {
        return false;
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
      console.log(index);
      if (index === 1) {
        return;
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
      let currentPlayer = this.getPlayer(index);

      if (!currentPlayer) {
        return;
      }

      currentPlayer.PlayerColor = color;
    },

    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>
