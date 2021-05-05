<template>
  <div v-if='exams.length'>
    <h1 class="h1">Информация ГИА 11</h1>
    <div class="tools">
      <div class="tools__attributes attributes">
        <div class="attributes__year">
          <span>Год: </span>
          <select name="year" id="year" v-model='selectYear'>
            <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="attributes__school">
          <span>Школа: </span>
          <select name="school" id="school" v-model='selectSchool'>
            <option v-for="(school, index) in schools" :key="index" :value="school">{{ createNameSchool(school) }}</option>
          </select>
        </div>
        <div class="attributes__text">
          <span>Найти: </span>
          <input type="text" name="subname" id="subname" placeholder="Фамилия" v-model="searchParams.searchSubname">
          <input type="text" name="name" id="name" placeholder="Имя" v-model="searchParams.searchName">
        </div>
        <div class="attributes__checkbox checkbox">
          <input type="checkbox" name="openAllInfo" id="openAllInfo" v-model="checked">
          <label for="openAllInfo" class="checkbox__label">{{ checkedMessage }}</label>
        </div>
      </div>
    </div>
    <div>
      <p v-if='!filteredExams.length' class="notFound">По данному запросу ничего не найдено...</p>
      <div v-else v-for='(exam, index) in filteredExams' :key='index'>
        <InfoSubject :exam="exam" :openAllTables="checked" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfoSubject from '../templates/InfoSubject'
import schoolName from '../plugin/schoolName.js'

export default {
  name: 'AllInfo',
  data () {
    return {
      checked: false,
      searchParams: {
        searchSubname: '',
        searchName: ''
      },
      selectYear: (new Date().getFullYear() - 1).toString(),
      selectSchool: 'Все школы'
    }
  },
  computed: {
    ...mapGetters({
      exams: 'getAllExams',
      years: 'getAllYears',
      schools: 'getAllSchools',
      error: 'getError'
    }),
    checkedMessage () {
      if (this.checked) {
        return 'Скрыть все данные'
      } else {
        return 'Показать все данные'
      }
    },
    filteredExams () {
      const filteredExams = []
      this.exams.forEach(item => {
        const exam = {}
        const newParticipants = item.participants.filter(item => {
          return item.subname.toLowerCase().includes(this.searchParams.searchSubname.toLowerCase()) &&
          item.name.toLowerCase().includes(this.searchParams.searchName.toLowerCase()) &&
          ((this.selectSchool === 'Все школы') ? item.schoolCode : item.schoolCode === this.selectSchool)
        })
        if (newParticipants.length !== 0) {
          exam.examCode = item.examCode
          exam.examName = item.examName
          exam.examDate = item.examDate
          exam.participants = newParticipants
        }
        if (Object.keys(exam).length) {
          filteredExams.push(exam)
        }
      })
      return filteredExams
    }
  },
  methods: {
    ...mapActions(['getAllExams', 'getAllYears', 'getAllSchools']),
    createNameSchool (selectSchool) {
      if (selectSchool === 'Все школы') {
        return selectSchool
      }
      for (const key in schoolName) {
        if (+key === selectSchool) {
          return `${key} - ${schoolName[key]}`
        }
      }
    }
  },
  async created () {
    if (this.$route.query.year) {
      this.selectYear = this.$route.query.year
    }

    if (this.$route.query.school) {
      this.selectSchool = this.$route.query.school === 'Все школы' ? this.$route.query.school : +this.$route.query.school
    }

    if (this.$route.query.subname) {
      this.searchParams.searchSubname = this.$route.query.subname
    }

    if (this.$route.query.name) {
      this.searchParams.searchName = this.$route.query.name
    }

    this.$router.push({ query: { year: this.selectYear } })

    await this.getAllYears()
    await this.getAllSchools()
    await this.getAllExams(this.selectYear)
  },
  watch: {
    'searchParams.searchSubname' () {
      this.$router.push({ query: { year: this.selectYear, school: this.selectSchool, subname: this.searchParams.searchSubname, name: this.searchParams.searchName } })
    },
    'searchParams.searchName' () {
      this.$router.push({ query: { year: this.selectYear, school: this.selectSchool, subname: this.searchParams.searchSubname, name: this.searchParams.searchName } })
    },
    selectSchool () {
      this.$router.push({ query: { year: this.selectYear, school: this.selectSchool, subname: this.searchParams.searchSubname, name: this.searchParams.searchName } })
    },
    async selectYear () {
      this.$router.push({ query: { year: this.selectYear } })
      await this.getAllExams(this.selectYear)
    },
    error (error) {
      throw error
    }
  },
  components: {
    InfoSubject
  }
}
</script>

<style lang="scss" scoped>
.tools {
  background-color: #fff;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  border-radius: .25rem;
  font-size: 1.2em;
  padding: 5px;
}

.attributes {
  display: grid;
  grid-template-columns: 1fr 1.6fr 1.4fr 1fr;
  gap: 10px;
  grid-template-areas:"year school school school text text checkbox";
  align-items: center;
  margin: 10px;
  &__checkbox {
    grid-area: checkbox;
    & input {
      margin-right: 5px;
      border: 1px solid #15816b;
    }
  }
  &__text {
    grid-area: text;
    & input[type=text] {
    margin-right: 3px;
    padding: 3px;
    border: 1px solid #15816b;
    }
  }
  &__year,
  &__school {
    & select {
    padding: 3px;
    border: 1px solid #15816b;
    }
  }
  &__year {
    grid-area: year;
    & select {
      width: 60px;
    }
  }
  &__school {
    grid-area: school;
    & select {
      width: 370px;
    }
  }
}

.notFound {
  text-align: center;
  font-size: 2em;
  color: #9a9a9a;
}

@media (max-width: 1200px) {
  .attributes {
    width: 700px;
    margin: 0 auto;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr .4fr;
    grid-template-areas:
      "school year"
      "text checkbox";
  }
}

@media (max-width: 711px) {
  .attributes {
    width: 460px;
    margin: 0 auto;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: .7fr 1.3fr;
    grid-template-areas:
      "year checkbox"
      "school school"
      "text text";
  }
}
</style>
