<template>
    <div>
        <div v-if="showComment" class="comment">
            <div>
                <textarea id="" v-model="content" rows="10" cols="30" placeholder="说点什么..."></textarea>
                
            </div>          
            <button @click="commentSave">发表评论</button>
        </div>
        <div class="contComment" v-else>
            <p>请先登录!</p>
        </div>
        
    </div>
    
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { COMMENT_SAVE } from '../store/mutations-types'

    export default {
        data () {
            return {
                content: '',
            }
        },
        props: ['articleId', 'type'],
        computed : mapState({
            showComment: state => state.user.loginStatus,
            username: state => state.user.username
        }),
        methods: {
            ...mapActions([COMMENT_SAVE]),
            commentSave () {
                console.log('start comment')
                if(!this.content) {return 0}
                this.COMMENT_SAVE({content: this.content, _id: this.articleId, type: this.type})
                this.$emit('pushComment', {username: this.$store.state.user.username, time: new Date(), content: this.content})
                this.content = ''
            }
        }

    }


</script>

<style lang="scss">
.contComment{
    p{
        text-align: center;
        margin-bottom: 50px;
    }
}
.comment{
    div{
        list-style-type: none;
        background: #F0F0E3;
        padding: 15px 15px 15px 15px;
        color: #696A52;
        border-radius: 5px;
        box-shadow: 0 1px 2px rgba(0,0,0,.15), 0 1px 0 rgba(255,255,255,.75) inset;
        margin-bottom: 10px;
        margin-top: 20px;
        textarea{
            width: 100%;
            border: none;
            background: rgba(0, 0, 0, 0);
            font-size: 18px;
            &:active,&:focus{
                outline: none;
            }
            &::-webkit-input-placeholder {
            color: #7f8c8d;
            }
            &:-ms-input-placeholder { 
            color: #7f8c8d;
            }
            
            &::-moz-placeholder { 
            color: #7f8c8d;
            opacity: 1;
            }
            &:-moz-placeholder { 
            color: #7f8c8d;
            opacity: 1;
            }


        }
        
    }
    button{
            text-rendering: auto;
        border: none;
        display: inline-block;
        float: none;
        padding: 3px 10px;
        margin: 0;
        font-size: 14px;
        transition: all .2s ease-in-out;
        letter-spacing: 2px;
        box-shadow: none;
        line-height: 2em;
        vertical-align: middle;
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
        background-color: #42b983;
        margin-bottom: 20px;
        }
}
</style>