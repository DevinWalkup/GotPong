<template>
  <page-content
    sub-title='The game participants and their wins'
    header='Game Participants'
    id='participants'>
    <template #additionalHeader>
      <div class='flex flex-1 bg-gray-900 text-gray-400 hover:text-white rounded-md text-sm p-2 items-center space-x-3'
           @click='copyUrl'>
        <ClipboardCopyIcon class='w-4 h-4' v-if='!copying' />
        <ClipboardCheckIcon class='w-4 h-4 text-green-500' v-if='copying' />
        <p class='w-36 truncate'>{{ url }}</p>
      </div>
      <div class='flex flex-1 space-x-2 items-center mt-3 md:mt-0'>
        <p class='text-red-500 font-bold text-sm'>Game Code:</p>
        <p class='text-white text-sm'>{{ localGame.GameCode }}</p>
      </div>
    </template>
    <template>
      <div class='mt-2'>
        <hr class='bg-gray-900' />
      </div>

      <div class='w-full mt-5'>
        <div class='flex flex-wrap justify-start md:justify-between items-center'>
          <div>
            <Header>Currently Playing</Header>
            <SubTitle>The players that are currently playing</SubTitle>
          </div>
          <div class='w-full items-center mt-2 md:mt-0' v-if='showCompleteRound'>
            <vue-button name='completeRound' id='complete-round' label='Complete Round' @click='completeRound' />
          </div>
        </div>
        <div class='my-2'>
          <hr class='bg-gray-900' />
        </div>
        <div class='grid grid-cols-12 gap-5'>
          <div class='col-span-12 md:col-span-6' v-for='player in currentlyPlaying' :key='player.PlayerId'>
            <player :player='player'
                    :roman-numerals='localGame.ViewWinsAsRomanNumerals'
                    :show-add-win-button='true' />
          </div>
        </div>
      </div>

      <div class='w-full mt-5' v-if='upNextPlayers'>
        <Header>Up Next</Header>
        <SubTitle>The players that will be playing next</SubTitle>
        <div class='my-2'>
          <hr class='bg-gray-900' />
        </div>
        <div class='grid grid-cols-12 gap-5'>
          <div class='col-span-12 md:col-span-6' v-for='player in upNextPlayers' :key='player.PlayerId'>
            <player :player='player'
                    :roman-numerals='localGame.ViewWinsAsRomanNumerals' />
          </div>
        </div>
      </div>

      <div class='w-full mt-5'>
        <Header>All Game Players</Header>
        <SubTitle>All the players that are in the game</SubTitle>
        <div class='my-2'>
          <hr class='bg-gray-900' />
        </div>
        <div class='grid grid-cols-12 gap-5'>
          <div class='col-span-12 md:col-span-6' v-for='player in localGame.Players' :key='player.PlayerId'>
            <player :player='player'
                    :roman-numerals='localGame.ViewWinsAsRomanNumerals' />
          </div>
        </div>
      </div>

      <div class='w-full mt-5'>
        <Header>Game Settings</Header>
        <SubTitle>The game settings</SubTitle>
        <div class='my-2'>
          <hr class='bg-gray-900' />
        </div>
        <vue-input
          label='View Wins as Roman Numerals'
          name='view-as-roman'
          id='romanNumerals'
          type='checkbox'
          v-model='localGame.ViewWinsAsRomanNumerals'
        />
      </div>

      <div class='bottom-0 mt-10'>
        <div class='mb-2'>
          <hr class='bg-gray-900' />
        </div>
        <div class='flex flex-1 justify-between items-center'>
          <vue-button name='add-player' id='addPlayer' label='Add Player' @click='addPlayer' />
        </div>
      </div>
    </template>
  </page-content>
</template>

<script>
import PageContent from '~/components/layout/PageContent'
import Player from '~/components/game/Player'
import vueInput from '~/components/fields/vueInput'
import vueButton from '~/components/fields/vueButton'
import ClipboardCopyIcon from '~/components/Icons/ClipboardCopyIcon'
import ClipboardCheckIcon from '~/components/Icons/ClipboardCheckIcon'
import Header from '~/components/layout/Header'
import SubTitle from '~/components/layout/SubTitle'
import XIcon from '~/components/Icons/XIcon'

export default {
  name: 'Game',

  components: {
    XIcon,
    SubTitle,
    Header,
    ClipboardCheckIcon,
    ClipboardCopyIcon,
    PageContent,
    Player,
    vueInput,
    vueButton
  },

  props: {
    game: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      localGame: {},
      copying: false,
    }
  },

  beforeMount() {
    this.localGame = JSON.parse(JSON.stringify(this.game))
    this.playersPerRound = this.localGame.PlayersPerRound
  },

  methods: {
    addPlayer() {
      this.$nuxt.$options.router.push(`/addPlayer/${this.localGame.GameCode}`)
    },

    //TODO: Use navigator.clipboard.writeText if we go to paid dyno
    copyUrl() {
      let tempInput = document.createElement('input')
      tempInput.value = window.location.href
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)

      this.copying = true
      setTimeout(() => {
        this.copying = false
      }, 2000)
    },

    async completeRound() {
      let resp = await this.$api.patch('/setNextRound', {
        GameId: this.localGame.GameId
      })

      if (resp.status !== 200) {
        this.$store.dispatch('alerts/error', 'There was an error completing the round!')
      }

      this.localGame = resp.data.game;
    }
  },

  computed: {
    url() {
      return window.location.host + window.location.pathname
    },

    currentlyPlaying() {
      return this.localGame.Players?.filter((player) => player.IsPlaying)
    },

    upNextPlayers() {
      let upNextUsers = this.localGame.Players?.filter((player) => player.IsUpNext)

      return !upNextUsers.length ? null : upNextUsers
    },

    showCompleteRound() {
      return this.upNextPlayers !== null;
    }
  },

  watch: {
    'localGame.ViewWinsAsRomanNumerals'(newVal, oldVal) {
      if (newVal === oldVal || oldVal === undefined) {
        return
      }

      this.$api.patch('setWinDisplay', {
        GameId: this.localGame.GameId,
        ViewWinsAsRomanNumerals: this.localGame.ViewWinsAsRomanNumerals
      }).catch(() => {
        this.$store.dispatch('alerts/error', 'Error updating the game!')
      })
    },

    'localGame.PlayersPerRound'(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }

      this.playersPerRound = newVal
    }
  }
}
</script>
