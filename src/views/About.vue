<template>
  <div class="wrapper">
    <h1 class="h1">О проекте</h1>
    <TextEditor />
  </div>
</template>

<script>
import TextEditor from '../templates/TextEditor'

export default {
  name: 'About',
  components: {
    TextEditor
  }
}
</script>
