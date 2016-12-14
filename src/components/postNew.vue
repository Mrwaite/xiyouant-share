<template>
    <div>
        <span class="tab-selector">选择版块：</span>
        <select name="tab" id="tab-value" v-model="topic.type">         
                <option value="fe">前端</option>             
                <option value="safe">安全</option>             
                <option value="net">网络</option>             
        </select>
        <textarea name="title" id="" placeholder="填写标题" rows="1" v-model="topic.title"></textarea>
        <textarea name="tags" id="" placeholder="标签(多标签用,隔开)" rows="1" v-model="topic.tags"></textarea>
        <textarea name="content" id="" cols="30" rows="10" v-model="topic.content" placeholder="允许使用markdwon语法"></textarea>
        <button @click="submit">发布</button>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { USER_POSTNEW } from '../store/mutations-types'

export default {
    data () {
        return {
            topic : {
                type : 'fe',
                title : '',
                content : '',
                tags : ''
            }
        }
    },
    methods : {
        ...mapActions([USER_POSTNEW]),
        submit () {
            if (!this.topic.type || !this.topic.title || !this.topic.content) return
            this.USER_POSTNEW(this.topic)
            this.$router.replace({ path : '/' })
        }
    }

}

</script>

<stype lang="scss">

</stype>