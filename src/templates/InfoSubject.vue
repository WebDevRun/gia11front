<template>
  <details class="detailsWrapper">
    <summary class="detailsWrapper__h2 h2">
      <div class="h2__info">
        <div>{{ exam.examCode }}</div>
        <div>{{ exam.examName }}</div>
        <div>{{ exam.examDate }}</div>
      </div>
      <div class="h2__statistic statistic">
        <div class="statistic__numberOfParticipants">{{ countParticipants }}</div>
        <div class="statistic__maxScore">{{ maxScore }}</div>
        <div class="statistic__averageScore">{{ averageScore }}</div>
        <div class="statistic__minScore">{{ minScore }}</div>
      </div>
    </summary>
    <table class="detailsWrapper__table table">
      <tr class="table__head">
        <th>МСУ</th>
        <th @click="sortHandler(exam.participants, 'schoolCode')" :class="sortData.schoolCode">Код школы</th>
        <th>Класс</th>
        <th>Код ППЭ</th>
        <th>Номер аудитории</th>
        <th @click="sortHandler(exam.participants, 'subname')" :class="sortData.subname">Фамилия</th>
        <th @click="sortHandler(exam.participants, 'name')" :class="sortData.name">Имя</th>
        <th @click="sortHandler(exam.participants, 'lastname')" :class="sortData.lastname">Отчетсво</th>
        <th>Задания с кратким ответом</th>
        <th>Задания с развёрнутым ответом</th>
        <th>Первичный балл</th>
        <th @click="sortHandler(exam.participants, 'score')" :class="sortData.score">Балл</th>
      </tr>
      <tr v-for='(participant, index) in exam.participants' :key='index' class="table__content">
        <td>{{ participant.MSY }}</td>
        <td>{{ participant.schoolCode }}</td>
        <td>{{ participant.class }}</td>
        <td>{{ participant.PPACode }}</td>
        <td>{{ participant.classroom }}</td>
        <td>{{ participant.subname }}</td>
        <td>{{ participant.name }}</td>
        <td>{{ participant.lastname }}</td>
        <td>{{ participant.shortTask }}</td>
        <td>{{ participant.detailedTask }}</td>
        <td>{{ participant.baseScore }}</td>
        <td>{{ participant.score }}</td>
      </tr>
    </table>
  </details>
</template>

<script>
export default {
  name: 'InfoSubject',
  props: ['exam'],
  data () {
    return {
      sortData: {
        schoolCode: 'none',
        subname: 'none',
        name: 'none',
        lastname: 'none',
        score: 'none'
      }
    }
  },
  computed: {
    countParticipants () {
      return this.exam.participants.length
    },
    maxScore () {
      let max = 0
      this.exam.participants.forEach(item => {
        if (item.score > max) {
          max = item.score
        }
      })
      return max
    },
    minScore () {
      let min = 100
      this.exam.participants.forEach(item => {
        if (item.score < min) {
          min = item.score
        }
      })
      return min
    },
    averageScore () {
      let sum = 0
      this.exam.participants.forEach(item => {
        sum += item.score
      })
      return (sum / this.countParticipants).toFixed(0)
    }
  },
  methods: {
    sortHandler (participants, sortField) {
      switch (this.sortData[sortField]) {
        case 'none':
        case 'descendingOrder': participants.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1
          }
          if (a[sortField] < b[sortField]) {
            return -1
          }
          return 0
        })
          this.updateSortStatus(sortField, 'ascendingOrder')
          break
        case 'ascendingOrder': participants.sort((a, b) => {
          if (a[`${sortField}`] < b[`${sortField}`]) {
            return 1
          }
          if (a[`${sortField}`] > b[`${sortField}`]) {
            return -1
          }
          return 0
        })
          this.updateSortStatus(sortField, 'descendingOrder')
          break
      }
    },
    updateSortStatus (sortField, sort) {
      for (const key in this.sortData) {
        if (key === sortField) {
          this.sortData[key] = sort
        } else {
          this.sortData[key] = 'none'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsWrapper {
  background-color: #fff;
  margin: 10px 0;
  &__h2 {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    border-radius: .25rem;
    cursor: pointer;
    font-size: 1.2em;
  }
}

.h2 {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  &__info {
    width: 350px;
    display: flex;
    justify-content: space-between;
  }
}

.table {
  width: 100%;
  &__head th,
  &__content td {
    border: 1px solid #ccc;
    padding: 15px 3px;
  }
  &__content td {
    text-align: center;
  }
}

.none {
  cursor: pointer;
  &::after {
    margin-left: 3px;
    content: '';
    display: inline-block;
    vertical-align: middle;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 7px solid #000;
    border-top: 7px solid #000;
  }
}
.descendingOrder {
  cursor: pointer;
  &::after {
    content: '';
    margin-left: 3px;
    display: inline-block;
    vertical-align: middle;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 7px solid #000;
  }
}

.ascendingOrder {
  cursor: pointer;
  &::after {
    margin-left: 3px;
    content: '';
    display: inline-block;
    vertical-align: middle;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 7px solid #000;
  }
}

.statistic {
  display: flex;
  width: 250px;
  justify-content: space-between;
  &__numberOfParticipants:before,
  &__maxScore:before,
  &__averageScore:before,
  &__minScore::before {
    content: "";
    background-repeat: no-repeat;
    height: 23px;
    width: 23px;
    margin-right: 6px;
    background-size: cover;
    display: inline-block;
    vertical-align: bottom;
  }
  &__numberOfParticipants::before {
    background-image: url(../../src/assets/numberOfParticipants.svg);
  }
  &__maxScore:before {
    background-image: url(../../src/assets/maxScore.svg);
  }
  &__averageScore:before {
    background-image: url(../../src/assets/averageScore.svg);
  }
  &__minScore:before {
    background-image: url(../../src/assets/minScore.svg);
  }
}
</style>
