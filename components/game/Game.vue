<template>
  <page-content
    sub-title='The game participants and their wins'
    header='Game Participants'
    id='participants'>
    <template #additionalHeader>
      <div class='flex flex-1 space-x-2 items-center'>
        <p class='text-red-500 font-bold text-sm'>Game Code:</p>
        <p class='text-white text-sm'>{{ localGame.GameCode }}</p>
      </div>
    </template>
    <template>
      <div class='mt-2'>
        <hr class='bg-gray-900' />
      </div>
      <div class='w-full mt-5'>
        <div class='grid grid-cols-12 gap-5'>
          <div class='col-span-12 md:col-span-6' v-for='player in localGame.Players' :key='player.PlayerId'>
            <player :player='player'
                    :roman-numerals='localGame.ViewWinsAsRomanNumerals' />
          </div>
        </div>
      </div>
      <div class='bottom-0 mt-10'>
        <div class='mb-2'>
          <hr class='bg-gray-900' />
        </div>
        <div class='flex flex-1 justify-between items-center'>
          <vue-input
            label='View Wins as Roman Numerals'
            name='view-as-roman'
            id='romanNumerals'
            type='checkbox'
            v-model='localGame.ViewWinsAsRomanNumerals'
          />
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

export default {
  name: 'Game',

  components: {
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
      localGame: {}
    }
  },

  mounted() {
    this.localGame = JSON.parse(JSON.stringify(this.game))
  },

  methods: {
    addPlayer() {
      this.$nuxt.$options.router.push(`/addPlayer/${this.localGame.GameCode}`);
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
      }).then(() => {
        this.$store.dispatch('alerts/success', "Updated the game!");
      }).catch(() => {
        this.$store.dispatch('alerts/error', "Error updating the game!");
      })
    }
  }
}
</script>
