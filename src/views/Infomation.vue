<template>
  <div class="wrapper">
    <h1 class="h1">Информация ГИА 11</h1>
    <div v-for='(exam, index) in exams' :key='index'>
      <InfoSubject :exam="exam"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfoSubject from '../templates/InfoSubject.vue'

export default {
  name: 'AllInfo',
  computed: {
    ...mapGetters({
      exams: 'getAllExams'
    })
  },
  methods: {
    ...mapActions(['getAllExams'])
  },
  async created () {
    await this.getAllExams()
  },
  components: {
    InfoSubject
  }
}
</script>
