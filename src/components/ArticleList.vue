<template>
    <div class="news-view">
        <div class="news-list">
            <ul>
                <li v-for="item in articles" class="news-item">
                    <span class="score">{{ item.score }}</span>
                    <span class="title">
                    <template v-if="item.url">
                        <a :href="item.url" target="_blank">{{ item.title }}</a>
                        <span class="host">({{ item.url | host }})</span>
                    </template>
                    <template v-else>
                        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
                    </template>
                    </span>
                    <br>
                    <span class="meta">
                        <span class="time">
                            {{ item.time | timeAgo }} ago
                        </span>
                        <span v-if="item.type !== 'job'" class="comments-link">
                            | <router-link :to="'/item/' + item.id">{{ item.descendants }} comments</router-link>
                        </span>
                    </span>
                    <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
                </li>
            </ul>
        </div>   
    </div>
</template>

<script>
    export default {
        data () {
            return {
                articles : [{
                    id : null,
                    score : null,
                    url : null,
                    title : null,
                    time : null
                }]
            }
        },
        /*created () {
            this.$http.get('http://localhost:3000/articles/' + this.$route.params.direction)
                .then(function(ret) {
                    this.articles = ret.data;
            });  
        }*/
        beforeRouteEnter (to , from, next) {
            next(vm => {
                vm.articles = [{
                    id : '58401b8a747ab47118820af9',
                    score : '108',
                    url : 'http://baidu.com',
                    title : '前端',
                    time : '16年11月6日'
                }];
                /*vm.$http.get('http://localhost:3000/articles/' + vm.$route.params.direction)
                    .then(function(ret) {
                        vm.articles = ret.data;
                    });  */
            });
            /*to.$http.get('http://localhost:3000/articles/' + to.params.direction)
                .then(function(ret) {
                    next(vm => {
                        vm.articles = ret.data;
                    });
                    
            });  */
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
</style>