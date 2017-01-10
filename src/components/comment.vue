<template>
    <div>
        <div v-if="showComment" class="comment">
            <div>
                <textarea id="" v-model="content" rows="10" cols="30" placeholder="说点什么..."></textarea>
                <button @click="commentSave">发表评论</button>
            </div>          
            
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
        width: 50%;
        margin: 0 auto;
        background: #F0F0E3;
        padding: 25px 20px 25px 20px;
        color: #696A52;
        border-radius: 5px;
        box-shadow: 0 1px 2px rgba(0,0,0,.15), 0 1px 0 rgba(255,255,255,.75) inset;
        margin-bottom: 50px;
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
        button{
            display: inline-block;
            position: relative;
            height: 37px;
            padding: 0 16px;
            color: #7f8c8d;
            background: #fff;
            font-size: 14px;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            border: 1px solid rgba(0,0,0,.15);
            vertical-align: bottom;
            white-space: nowrap;

            box-sizing: border-box;
            border-radius: 999em;
            letter-spacing: 0;
            font-weight: 400;
            font-style: normal;
        }
    }
}
</style>