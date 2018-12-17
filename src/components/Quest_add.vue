<template>
<div class="quest_add">
  <br><br>
  <h1 italic> 질문 등록 </h1>
  <br><br>
  <div>
    <div class="board-box container">
      <button type="button" class="btn btn-outline-primary" style="float:right" @click.prevent="submitLog">등록</button>
      <button type="button" class="btn btn-outline-primary" style="float:right" @click.prevent="goBack">뒤로가기</button>
      <br>
      <br>
      <form>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">내용</label>
          <textarea class="form-control" id="text_" rows="10"></textarea>

        </div>
      </form>
      <form>
        <div class="form-group">
          <wysiwyg v-model="content" />
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "quest_add",
  data() {
    return {
      text_: '',
      ID: this.$store.getters.getId
    }
  },
  computed: {
    isLogged () {
      console.log(this.$store.getters.isLogged)
      return this.$store.getters.isLogged
    },
    getID () {
      this.ID = this.$store.getters.getId
      return this.$store.getters.getId
    }
  },
  methods: {
    goBack: function() {
      this.$router.push("question")
    },
    submitLog: function() {
      if(text_.value=='') {
        alert("내용을 입력해주세요!")
        return;
      }
      var url = 'http://106.10.32.228:3000' + `/request/question?질문내용=${text_.value}&ID=${this.ID}`;
      console.log(url)
      this.$http.get(url)
        .then((result) => {
          if (result.data.status == 'success') {
            console.log('success')
            alert("등록 성공하였습니다")
            this.$router.push("question")
          } else {
            alert("등록 실패하였습니다")
            console.log('error')

          }

        })
        .catch((error) => {
          console.log('server error')
          console.log(error)
          this.$notice({
            type: 'alert',
            text: '서버에 오류가 있습니다.'
          })
        })
    }
  }

}
</script>

<style media="screen">
.quest_add {
  width: 100%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
