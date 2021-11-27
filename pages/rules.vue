<template>
  <BaseLayout>
    <template #page>
      <page-content
        sub-title='The rules of beer pong'
        header='Beer Pong Rules'
        id='beer-pong-rules'>
        <div class='my-2'>
          <hr class='bg-gray-900' />
        </div>

        <div class='space-y-4' v-if='ready'>
          <json-content v-for='page in generalContent' :key='page.title' :page='page' />
          <json-content v-for='page in rulesContent' :key='page.title' :page='page' />
        </div>
      </page-content>
    </template>
    <template #headerBtn>
      <vue-button name='create-game' id='createGame' label='Create Game' @click='onClick' />
    </template>
    <template #sideView>
      <page-content sub-title='Go To Section' header='Directory' id='directory-overview'>
        <div class='my-2'>
          <hr class='bg-gray-900' />
        </div>
        <div class='w-full space-y-3'>
          <a v-for='(link, idx) in directory'
             :key='idx'
             :href='link.id'
             class='block text-sm text-white hover:text-gray-200 cursor-pointer'
          >{{link.title}}</a>
        </div>
      </page-content>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout'
import PageContent from '~/components/layout/PageContent'
import JsonContent from '~/components/layout/JsonContent'
import vueButton from '~/components/fields/vueButton'
import slugIt from '~/includes/functions'

export default {
  async asyncData({$content}) {
    let ready = false;
    const general = await $content('general').only(['page']).fetch();
    const rules = await $content('rules').only(['page']).fetch();

    let generalContent = general.page;
    let rulesContent = rules.page;

    ready = true;
    return {
      generalContent,
      rulesContent,
      ready
    }
  },

  name: 'rules',

  components: {
    JsonContent,
    PageContent,
    BaseLayout,
    vueButton
  },

  computed: {
    directory() {
      let allContent = [...this.generalContent, ...this.rulesContent]
      return allContent.map((page) => {
        return {
          id: `#${slugIt(page.title)}`,
          title: page.title
        }
      });
    }
  },

  methods: {
    onClick() {
      this.$nuxt.$options.router.push('/createGame');
    },

    goTo(id) {
      let ele = document.getElementById(id);

      if (!ele) {
        return;
      }

      console.log(ele);

      console.log(ele.getBoundingClientRect());

      ele.scrollIntoView({behavior: 'smooth'});
    }
  }
}
</script>
