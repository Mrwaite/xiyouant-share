<template>
    <div class="article">
       
        <h2>{{ title }}</h2>
        <span class="username">{{ username }}</span>
        <span v-for="tag in tags">{{ tag }}</span>
        <span></span>
        <span class="time">{{ time.date | timeAgo }} ago</span>
        <div>{{ content }}</div>
        <ul>
            <li v-for="comment in comments">
                <span>{{ comment.username }}</span>
                <span>{{ comment.time | timeAgo}} ago</span>
                <span>{{ comment.content }}</span>
            </li>
        </ul>
        <div>
            评论区:<comment :articleId="this.$route.params._id" :type="this.$route.params.direction" v-on:pushComment="pushComment"></comment>
        </div>
    </div>   
</template>

<script>

    import comment from '../../components/comment'

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
        created () {
            this.fetchArticle();
        },
       /* watch : {
            '$route' : 'fetchArticle'
        },*/
        beforeRouteEnter (to, from, next) {
            next(vm => {
                var _id = vm.$route.params._id
                var type = vm.$route.params.direction
                var articles = vm.$store.state.articles
                const dataName = ['username', 'time', 'title', 'content', 'comments', 'tags', 'pv', 'type']
                vm.$http.get('http://localhost:3000/article/' + type + '/' + _id)
                            .then((response) => {
                                if( response.body.err ){
                                    console.log(response.body.err)
                                } else {
                                    dataName.forEach((name, index) => {
                                        vm[name] = response.body.article[name]
                                    })
                                }
                            })
            })
            
        },
        methods : {
            fetchArticle () {
               

                
            },
            getArticle () {
                
            },
            pushComment (newComment) {
                this.comments.push(newComment)
            }
        },
        components : {
            comment
        }
    }

</script>

<style lang="scss">
.article{
    max-width: 800px;
    margin: 0 auto;
}








</style>