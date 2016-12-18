<template>
    <div>
        <div v-if="showComment">
            姓名：{{ username }}<br />
            评论：<textarea id="" v-model="content" rows="10" cols="30"></textarea>
        </div>
        <div v-else>
            <p>请先登录</p>
        </div>
        <button @click="commentSave">发表评论</button>
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

<stype lang="scss">

</stype>