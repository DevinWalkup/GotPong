<template>
  <div :id='id'>
    <div class='flex flex-wrap justify-start md:justify-between items-center'>
      <div>
        <Header>{{ header }}</Header>
        <SubTitle>{{ subTitle }}</SubTitle>
      </div>
      <div v-if='$slots.additionalHeader' class='mt-5 md:mt-0'>
        <slot name='additionalHeader'></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import SubTitle from '~/components/layout/SubTitle'

export default {
  name: 'PageContent',

  components: {
    Header,
    SubTitle
  },

  props: {
    id: {
      type: String,
      required: true
    },

    header: {
      type: String,
      required: true
    },

    subTitle: {
      type: String,
      required: true
    }
  },

  methods: {
    onSubmit() {
      this.$emit('onSubmit')
    }
  }
}
</script>
