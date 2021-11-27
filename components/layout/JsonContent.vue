<template>
  <div :id='id' class='w-full h-full'>
    <Header :variant='headerVariant'>
      {{title}}
    </Header>
    <SubTitle v-if='subHeader'>
      {{subHeader}}
    </SubTitle>
    <div class='mt-2' v-if='isSection'>
      <hr class='bg-gray-900' />
    </div>
    <div v-if='content' v-html='content' class='text-gray-200 text-sm mt-2 space-y-2' />
  </div>
</template>

<script>
import slugIt from '~/includes/functions'
import Header from '~/components/layout/Header'
import SubTitle from '~/components/layout/SubTitle'

export default {
  name: 'JsonContent',
  components: { SubTitle, Header },
  props: {
    page: {
      type: Object,
      required: true
    }
  },

  computed: {
    isSection() {
      return this.page.isSection;
    },

    id() {
      return slugIt(this.title);
    },

    title() {
      return this.page.title;
    },

    subHeader() {
      return this.page.subHeader;
    },

    content() {
      return this.page.content;
    },

    headerVariant() {
      return this.isSection ? 'default' : 'secondary';
    }
  }
}
</script>

<style scoped>

</style>
