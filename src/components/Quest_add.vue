<template>
<div class="quest_add">
  <div>
    <div class="board-box container">
      <button type="button" class="btn btn-outline-primary" style="float:right" @click.prevent="submitLog">{{mode=='create'?'등록':'수정'}}</button>
      <button type="button" class="btn btn-outline-secondary" style="float:right" @click="$router.go(-1)">뒤로가기</button>
      <form>
        <div class="form-group">
          <input type="file" ref="file" id="files" class="form-control-file" @change="fileChanges">
        </div>
      </form>
      <form>
        <div class="form-group">
          <wysiwyg v-model="content"/>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:"addquestion",
  data(){
    return{
        내용:'',
        고객ID:'fjasl'
    }
  },
  methods:{
        submitLog: function(){
          if(this.mode == 'create'){
            var url = this.$config.targetURL+'/resources/mlog/';

            var json = {
              content: this.content,
              writerID: this.getId
            }
            console.log(this.boardId)
            var formData = new FormData()
            formData.append('information', JSON.stringify(json))
            formData.append('userfile', this.file1)

            this.$http.post(url, formData)
            .then(result=>{
              console.log('success!')
              this.$notice({
                type: 'success',
                text: '글 등록이 성공적으로 완료되었습니다.'
              })
              this.$router.go(-1)
            })
            .catch(error=>{
                console.log('서버에러')
                this.$router.push({
                  name: 'Board'
                })
              })
          }
        },
        goBack: function(){
          this.$router.push({
            name: "Question"
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
