<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import SignInLayout from './layouts/SignInLayout'
import MainLayout from './layouts/MainLayout'

export default {
  components: {
    SignInLayout,
    MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'signin') + '-layout'
    },
  },
}
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}
</style>
