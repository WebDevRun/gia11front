<template >
  <div>
    <h1 class="h1">Загрузка файлов</h1>
    <div>
      <div class="wrapperUpload">
        <input
          id="input-file"
          type="file"
          name="fileUpload"
          class="wrapperUpload__input-file"
          multiple
          @change="uploadFilesHandler"
        />
        <label
          for="input-file"
          class="wrapperUpload__file-wrapper file-wrapper"
        >
          <div class="file-wrapper__status">{{ message }}</div>
          <div class="file-wrapper__button">Выбрать</div>
        </label>
      </div>
      <div v-if="exams.length">
        <div v-for="(exam, index) in exams" :key="index">
          <div v-if="exam.participants.length">
            <InfoSubject :exam="exam" />
          </div>
          <p v-else class="notFound">Не верный шаблон или нет данных...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InfoSubject from "../templates/InfoSubject";

export default {
  name: "UploadFiles",
  components: {
    InfoSubject,
  },
  data() {
    return {
      fileSelect: [],
    };
  },
  computed: {
    message() {
      if (this.fileSelect.length) {
        return `Файлов загружено: ${this.fileSelect.length}`;
      } else {
        return "Выберите файл(ы)";
      }
    },

    ...mapGetters({
      exams: "getUploadExams",
    }),
  },
  methods: {
    ...mapActions(["sendExams"]),

    async uploadFilesHandler(e) {
      this.fileSelect = e.target.files;
      const formData = new FormData();
      this.fileSelect.forEach((element) => {
        formData.append("file", element);
      });

      await this.sendExams(formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapperUpload {
  width: 300px;
  margin: 0 auto;
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
    background: #15816b;
    color: #eee;
    font-size: 1.2rem;
    border-radius: 3px;
    font-family: inherit;
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

.notFound {
  text-align: center;
  font-size: 2em;
  color: #9a9a9a;
}
</style>
