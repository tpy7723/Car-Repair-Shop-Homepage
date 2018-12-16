<template>
<div class="quest_add">
  후기등록
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
      num: '',
      id: ''
    }
  },
  mounted: function() {
    console.log('후기 등록')
    this.getData()
  },
  computed: {
    getData: function(){
      console.log('in review_add')
      this.num = this.$route.query.num
      this.id = this.$route.query.id
      console.log(this.num);
      console.log(this.num);
    },
    getNum() {
      console.log(this.$route.query.num)
      return this.$route.query.num
    },
    getID () {
      return this.$store.getters.getId
    }
  },
  methods: {
    goBack: function() {
      this.$router.push("log")
    },
    submitLog: function() {
      if(text_.value=='') {
        alert("내용을 입력해주세요!")
        return;
      }
      console.log(this.id)

      var url = 'http://106.10.32.228:3000' + `/request/review?내용=${text_.value}&ID=${this.getID}&접수번호=${this.num}`;

      console.log(url)
      this.$http.get(url)
        .then((result) => {
          if (result.data.status == 'success') {
            console.log('success')
            this.$router.push("review")
          } else {
            console.log('error')
            alert("후기는 한 번만 가능합니다!")
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
