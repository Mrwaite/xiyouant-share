<template>
    <div class="article">
        <h2>{{ title }}</h2>
        <lable class="username">{{ username }}</lable>
        <lable v-for=""></lable>
        <lable class="time">{{ time }}</lable>
        <div>{{ content }}</div>
        <lable v-for="comment in comments">{{ comment }}</lable>
        
    </div>
</template>

<script>

    export default {
        data () {
            return {
                    username: '',
                    time: '',
                    title: '',
                    content: '',
                    comments: [],
                    tags: [],
                    pv: 0,
                    type: ''                              
            }
        },
        create () {
            this.fetchArticle();
        },
        watch : {
            '$route' : 'fetchArticle'
        },
        methods : {
            fetchArticle () {
                var _id = this.$route.params._id
                var type = this.$route.params.direction
                var articles = this.$store.state.articles
                articles.forEach((article, index) => {
                    if(_id === article._id) { 
                        return  this.$data = article                        
                    } 
                })
                this.$http.get('http://localhost:3000/article/' + type + '/' + _id)
                    .then((response) => {
                        if( response.body.err ){
                            console.log(response.body.err)
                        } else {
                            this.$data = response.body.article
                        }
                    })
            }
        }
    }

</script>

<style lang="scss">
.article{
    width: 1160px;
    margin: 0 auto;
}


</style>