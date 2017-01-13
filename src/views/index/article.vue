<template>
    <div class="article">
        <header>
            <h2>{{ title }}</h2>
            <span>
                <span class="username">作者 : {{ username }}</span>
                <br>
                <span class="time">发布时间 : {{ time.day }}</span>
            </span>
        </header>       
        <div id="content" v-html="content"></div>
        <div class="title_comment">评论区</div>
        <hr>
        <ul>
            <li v-for="comment in comments">
                
                <span class="comment_username">{{ comment.username }}</span>
                <span class="comment_time">{{ comment.time | timeAgo}} ago</span>
                <br>
                <span v-html="comment.content"></span>
                
            </li>
        </ul>
        <hr>
        <div>
            发表评论 : <comment :articleId="this.$route.params._id" :type="this.$route.params.direction" v-on:pushComment="pushComment"></comment>
        </div>
    </div>   
</template>

<script>

    import comment from '../../components/comment'
    /*import '../../../node_modules/vue-awesome/icons'
    */

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
    padding: 20px;
    header{
        h2{
            text-align: center;
            font-weight: 700;
            font-style: normal;
            font-size: 2em;
            line-height: 1.1;
            padding-top: .5em;
               
        }
        span{
            
            margin:0 auto;
            .username{
                color: #7f8c8d;
                font-size: 1em;
                margin: 0 auto;
                font-weight: 700;
            }
            
            .time{
                margin: 0 auto;
                color: #7f8c8d;
                font-weight: 700;
            } 
            span img{
                    width: 0.8em;
                    height: 0.8em;
                    margin-right: .2em;
            }
        }
    }
    .title_comment{
        text-align: center;
        font-weight: 500;
        font-style: normal;
        font-size: 1.5em;
        line-height: 1.1;
        padding-top: .5em;
    }
    hr{
         -webkit-transition: .75s ease-in-out border-color;
                transition: .75s ease-in-out border-color;
                margin-top: 20px;
                margin-bottom: 20px;
                border: 0;
                border-top: 1px solid rgba(223, 223, 223, 0.8);
    }
    ul{
        padding-left: 0;
        li{
            list-style-type: none;
            background: #F0F0E3;
            padding: 15px 15px 15px 47px;
            color: #696A52;
            border-radius: 5px;
            box-shadow: 0 1px 2px rgba(0,0,0,.15), 0 1px 0 rgba(255,255,255,.75) inset;
            margin-bottom: 10px;
            hr{
                -webkit-transition: .75s ease-in-out border-color;
                transition: .75s ease-in-out border-color;
                margin-top: 20px;
                margin-bottom: 20px;
                border: 0;
                border-top: 1px solid rgba(223, 223, 223, 0.8);
            }
            .comment_username{
                color: #42b983;
                font-weight: 700;
            }
            .comment_time{
                font-size: 0.8em;
                color: #777;
                text-decoration: underline;
            }
        }
    }
}

#content{
    h3{
        font-size: 22px;
        position: relative;
        margin: 1em 0;
        &:before{
            content: "#";
            color: #42b983;
            position: absolute;
            left: -0.7em;
            top: -4px;
            font-size: 1.2em;
            font-weight: bold;
        }
    }
    code{
        font-size: 0.8em;
        background-color: #f8f8f8;
        margin: 0 2px;
        padding: 3px 5px;
        color: #e96900;
        border-radius: 2px;
        white-space: inherit;
    }
    a{
        color: #42b983;
        word-break: break-all;
        text-decoration: none;
        &:active{
            text-decoration: none;
        }
    }
    img{
        display: block;
        max-width: 100%;
        margin: 1em auto;
        border: 0;
    }
    h4{
        font-size: 18px;
        position: relative;
        margin: 1em 0;
    }

}
</style>