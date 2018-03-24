<template>
  <section class="global-background">
    <section class="app-main" style="overflow: hidden">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </section>

</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      page() {
        const route = this.$route
        switch (route.fullPath) {
          case '/workbench':
            return {
              title: this.$t('p.project.header.title[2]'),
              description: this.$t('p.project.header.description[2]'),
              placeholder: this.$t('p.project.placeholder[2]'),
              icon: 'code-working',
              type: 2 // 0.个人项目 1.团队项目 2.工作台
            }
          case '/':
            return {
              title: this.$t('p.project.header.title[0]'),
              description: this.$t('p.project.header.description[0]'),
              placeholder: this.$t('p.project.placeholder[0]'),
              icon: 'person',
              type: 0
            }
          default:
            const groupName = (route.query && route.query.name) || ''
            return {
              title: this.$t('p.project.header.title[1]', {groupName}),
              description: this.$t('p.project.header.description[1]', {groupName}),
              placeholder: this.$t('p.project.placeholder[1]'),
              icon: 'person-stalker',
              type: 1
            }
        }
      },
      projects() {
        return this.$store.state.project.list
      },
      user() {
        return this.$store.state.user
      },
      keywords() {
        return this.$store.state.project.keywords
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews.join();
      },
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
  }
</script>

<style>
</style>
