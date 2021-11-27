<template>
  <div :id='`player-${localPlayer.PlayerId}`'>
    <div class='w-full'>
      <Header variant='large' :color='playerColor'>
        {{ localPlayer.PlayerName }}
      </Header>
    </div>
    <div class='flex flex-1 w-full space-x-1 items-center'>
      <p :class='playerColor' class='font-bold'>Wins:</p>
      <p class='text-white'>{{ wins }}</p>
    </div>
    <form @submit.prevent='addWin' class='mt-3' v-if='showAddWinButton'>
      <vue-button name='add-win' id='addWin' label='Add Win' type='submit' :color='playerColor' />
    </form>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import vueButton from '~/components/fields/vueButton'

export default {
  name: 'Player',

  components: {
    Header,
    vueButton
  },

  props: {
    player: {
      type: Object,
      required: true
    },
    romanNumerals: {
      type: Boolean,
      default: true
    },
    showAddWinButton: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localPlayer: {}
    }
  },

  beforeMount() {
    this.localPlayer = JSON.parse(JSON.stringify(this.player))
  },

  computed: {
    playerColor() {
      if (!this.localPlayer.PlayerColor) {
        return `text-red-500`
      }
      return `text-${this.localPlayer.PlayerColor}-500`
    },

    wins() {
      if (!this.romanNumerals) {
        return this.localPlayer.Wins
      }

      let romanized = this.romanize(this.localPlayer.Wins);

      if (!romanized) {
        return 0;
      }

      return romanized;
    }
  },

  methods: {
    async addWin() {
      if (!this.showAddWinButton) {
        return;
      }

      let resp = null;

      try {
       resp = await this.$api.patch('addWin', {PlayerId: this.localPlayer.PlayerId});
      }
      catch {
        this.$store.dispatch('alerts/error', "There was an error trying to update the players wins!");
      }

      if (resp.data) {
        this.localPlayer = resp.data.player;
      } else {
        this.$store.dispatch('alerts/error', "Error adding player win!");
      }
    },

    romanize(num) {
      if (isNaN(num))
        return NaN
      var digits = String(+num).split(''),
        key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
          '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
          '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        roman = '',
        i = 3
      while (i--)
        roman = (key[+digits.pop() + (i * 10)] || '') + roman
      return Array(+digits.join('') + 1).join('M') + roman
    }
  }
}
</script>
