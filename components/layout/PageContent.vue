<template>
  <div :id='id'>
    <div class='w-full'>
      <Header>{{ header }}</Header>
      <SubTitle>{{subTitle}}</SubTitle>
    </div>
    <form @submit.prevent='onSubmit'>
      <slot></slot>
    </form>
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
