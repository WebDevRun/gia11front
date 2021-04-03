<template>
  <div>
    <h1 class="h1">Загрузка файлов</h1>
    <div class="wrapper">
      <div class="wrapperUpload">
        <input
          type="file"
          name="fileUpload"
          id="input-file"
          class="wrapperUpload__input-file"
          @change="uploadFilesHandler"
          multiple
        />
        <label
          for="input-file"
          class="wrapperUpload__file-wrapper file-wrapper"
        >
          <div class="file-wrapper__status">{{ message }}</div>
          <div class="file-wrapper__button">Выбрать</div>
        </label>
      </div>
        <div v-for='(exam, index) in exams' :key='index'>
          <InfoSubject :exam='exam'/>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfoSubject from '../templates/InfoSubject.vue'

export default {
  name: 'UploadFiles',
  data () {
    return {
      fileSelect: []
    }
  },
  computed: {
    message () {
      if (this.fileSelect.length) {
        return `Файлов загружено: ${this.fileSelect.length}`
      } else {
        return 'Выберите файл(ы)'
      }
    },

    ...mapGetters({
      exams: 'getUploadExams'
    })
  },
  methods: {
    ...mapActions(['sendExams']),

    async uploadFilesHandler (e) {
      this.fileSelect = e.target.files
      const formData = new FormData()
      this.fileSelect.forEach(element => {
        formData.append('file', element)
      })

      await this.sendExams(formData)
    }
  },
  components: {
    InfoSubject
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 1320px;
  margin: auto;
}

.wrapperUpload {
  width: 300px;
  margin: auto;
  text-align: center;
  &__input-file {
    display: none;
  }
  &__file-wrapper {
    width: 100%;
  }
}

.file-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__status,
  &__button {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
  }
  &__status {
    width: calc(100% - 100px);
    border: 1px solid #c7c7c7;
    border-radius: 3px 0 0 3px;
    border-right: none;
  }
  &__button {
    width: 100px;
    background: #1bbc9b;
    color: #eee;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 0 3px 3px 0;
    cursor: pointer;
  }
}

.h2 {
  font-size: 1.2em;
  padding-left: 20px;
}

.head th {
  border: 1px solid black;
  padding: 5px 20px;
}

.content td {
  border: 1px solid black;
  padding: 5px 20px;
  text-align: center;
}
</style>
