<template>
    <div class="news-view view">
        <div class="news-list-nav">
            <router-link v-if="page > 1" :to="'/path/' + type + '/' + (page - 1)">&lt; prev</router-link>
            <a v-else class="disabled">&lt; prev</a>
            <span>{{ page }}/{{ maxPage }}</span>
            <router-link v-if="page < maxPage" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
            <a v-else class="disabled">more &gt;</a>
        </div>
        <div class="news-list">
            <ul>
                <li v-for="article in articles" class="news-item">
                    <span class="score" title="点击量">{{ article.pv }}</span>
                    <span class="title">
                        <template v-if="article.url"><!--转载-->
                            <a :href="article.url" target="_blank">{{ article.title }}</a>
                            <span class="host">({{ article.url | host }})</span>
                        </template>
                        <template v-else><!--原创-->
                            <router-link :to="'/article/' + article.type + '/' + article._id">{{ article.title }}</router-link>
                        </template>
                    </span>
                    <span class="author" titile="作者">
                           @ {{ article.username }} 
                        </span>
                    <br>
                    <span class="meta">
                        <span class="time" title="发表时间">
                            {{ article.time.date | timeAgo }} ago
                        </span>
                         • 
                        <span class="comment" title="评论"><span>{{ article.comments.length }}</span> comments</span>                        
                    </span>
                    <span v-for="tag in article.tags" class="tags">{{ tag }}</span>
                </li>
            </ul>
        </div>   
    </div>
</template>

<script>

    import { mapActions } from 'vuex'
    import { ARTICLES_SAVE } from '../store/mutations-types'

    export default {
        data () {
            return {
                page: 0,
                maxPage: 0,
                type: this.$route.params.direction,
                articles : [{
                    _id : '',
                    comments : [],
                    content: '',
                    pv : 0,
                    tags: [],
                    time: '',
                    title: '',
                    type: '',
                    username: ''
                }]
            }
        },
        created () {
            //组件穿件完成后获取数据
            //此时data已被observed了
            this.fetchData();
        },
        watch : {
            //如果路由有变化,会再次执行该函数
            '$route' : 'fetchData'
        },
        methods : {
            ...mapActions([ARTICLES_SAVE]),
            fetchData () {
                this.$http.get('http://localhost:3000/articles/' + this.$route.params.direction + '/' + this.$route.params.page)
                    .then(function(response) {
                        /*this.type = this.$route.params.direction;*/
                        this.articles = response.body.posts;
                        this.ARTICLES_SAVE(this.articles);
                        this.page = Number(response.body.page);
                        this.maxPage = Number(response.body.maxPage);
                        this.type = response.body.direction;
                    });  
            }
        }
    }
</script>

<style lang="scss">
.news-view{
    padding-top : 45px;
}

.news-list-nav, .news-list{
    background-color: #fff;
    border-radius: 2px;
}

.view{
    max-width: 800px;
    margin: 0 auto;
    position: relative;
}

.news-list-nav{
    padding: 15px 30px;
    position: fixed;
    text-align: center;
    top: 55px;
    left: 0;
    right: 0;
    z-index: 998;
    box-shadow: 0 1px 2px rgab(0,0,0,.1);
    a{
        margin: 0 1em;
    }
    .disabled{
        color: #ccc;
    }
}

.news-list{
    position: absolute;
    margin: 30px 0;
    width: 100%;
    transition: all 0.5x cubic-bezier(0.55, 0, 0.1, 1);
    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
}

.slide-left-enter, .slide-right-leave-active{
    opacity: 0;
    transform: translate(30px, 0);
}

.slide-left-leave-active, .slide-right-enter{
    opacity: 0;
    transform: translate(30px, 0);
}

.item-move, .item-enter-active, .item-leave-active{
    transition: all 0.5s cubic-bezier(0.55,0,0.1,1);
}

.item-enter{
    opacity: 0;
    transform: translate(30px, 0);
}

.item-leave-active{
    position: absolute;
    opacity: 0;
    transform: translate(30px, 0);
}

@media (max-width : 600px){
    .new-list{
        margin: 10px 0;
    }
}


/*items*/

.news-item{
    background-color: #fff;
    padding: 20px 30px 20px 80px;
    border-bottom: 1px solid #eee;
    position: relative;
    line-height: 20px;
    .score{
        color: #42b983;
        font-size: 1.1em;
        font-weight: 700;
        position: absolute;
        top: 50%;
        left: 0;
        width: 80px;
        text-align: center;
        margin-top: -10px;
    }
    .meta, .host{
        font-size: 0.85em;
        color: #999;
        a{
            color: #999;
            text-decoration: underline;
            &:hover{
                color: #42b983;
            }
        }
    }
}

.author{
    float: right;
    font-size: 10px;
    color: #42b983;
}

.comment{
    align-items: center;
    margin: 0 .25em;
    padding: 0em .5em;
    /* height: 15px; */
    font-size: 10px;
    letter-spacing: .01em;
    border-radius: 1px;
    background-color: #f2f3f5;
    transition: all .3s;
}

.tags{
    float: right;
    font-size: 10px;
    align-items: center;
    margin: 0 .25em;
    margin-top: .3sem;
    padding: 0em .5em;
    background-color: #f2f3f5;
}
</style>