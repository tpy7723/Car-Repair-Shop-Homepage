<template>
<div class="pluscomment">
  댓글 다는 곳

    <br><br><br>
      <div class="card" style="width: 50rem;" >
        <div class="card-body">
          <h1 class="card-title"><{{this.num}}번 질문게시글></h1>
        </div>
        <ul class="list-group list-group-flush text-left" >
          <li class="list-group-item"><h4>작성시간</h4>  {{this.time}}</li>
          <li class="list-group-item"><h4>질문내용</h4>  {{this.context}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
          <li class="list-group-item"><h4>질문작성자</h4>  {{this.id}}</li><!--직원과 join해서 직원의 이름을 보여줘야 한다.-->
          <li class="list-group-item">
          <li class="list-group-item">
          <li class="list-group-item"><h4>댓글</h4>  {{ this.list[0].내용  }}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
          <li class="list-group-item"><h4>댓글작성시간</h4>  {{ this.list[0].작성시간  }}</li>
          <li class="list-group-item"><h4>댓글작성자</h4>  {{ this.list[0].이름  }}</li>

        </ul>
      </div>
      <br><br><br>
            <button type="button" class="btn btn-outline-primary" @click.prevent="goBack()">뒤로가기</button>
      <div >
  </div>

</div>
</template>

<script>
  export default {
    name: "pluscomment",
    data() {
      return {
        msg: '게시판',
        list: [],
        num: '',
        context: '',
        내용:''
      }
    },
    computed: {
      isLogged () {
        console.log(this.$store.getters.isLogged)
        return this.$store.getters.isLogged
      },
      user_id() {
        return this.$store.getters.getId
      }
    },
    mounted: function() {
      this.msg = ''
      console.log('질문게시판')
      this.getData()
    },
    methods: {
      goBack: function() {
        this.$router.push("question")
      },
      getData: function() {
        this.num = this.$route.query.num
        this.id = this.$route.query.id
        this.context = this.$route.query.context
        this.time = this.$route.query.time
        console.log(this.num)
        var url = 'http://106.10.32.228:3000'+`/call/comment?질문번호=${this.num}`;
        console.log(url)
        this.$http.get(url)
          .then(result => {
            console.log(result)
            console.log(result.data.status)
            this.list = result.data.result
          })
          .catch(error => {
            console.log('서버에러')
            console.log(error)
          })

      },
    }
  }
  </script>


  <style media="screen">
  .card {
    padding: 80px;
    margin-left: auto;
    margin-right: auto;
    text-ailgn : 'left';
  }
  </style>
