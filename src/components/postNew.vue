<template>
    <div id="post_new">
        <span id="tab_selector">选择版块：</span>
        <select name="tab" id="tab_value" v-model="topic.type">         
                <option value="fe">前端</option>             
                <option value="safe">安全</option>             
                <option value="net">网络</option>             
        </select>
        <textarea name="title" id="title_value" placeholder="填写标题" rows="1" v-model="topic.title"></textarea>
        <textarea name="tags" id="tags_value" placeholder="标签(多标签用,隔开)" rows="1" v-model="topic.tags"></textarea>
        <textarea name="content" id="content_value" cols="30" rows="10" v-model="topic.content" placeholder="允许使用markdwon语法"></textarea>
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

<style lang="scss">
#post_new{
    margin-top: 20px;
    padding: 20px;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    border-radius: 5px;
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
    }
}
#tab_selector{
    word-break: break-word;
    color: #333;
    line-height: 2em;
}
#tab_value{
    width: 220px;
    border: 1px solid #ccc;
    display: inline-block;
    height: 20px;
    padding: 4px 6px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    line-height: 20px;
    color: #555;
    vertical-align: middle;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;   
    cursor: pointer;    
    background-color: #fff;
    height: 30px;
    line-height: 30px;
}


#title_value,#tags_value,#content_value{
    width: 98%;
    border: none;
    resize: none;
    height: 2em;
    margin-bottom: 1em;
    box-shadow: 0 0 2px rgba(60,60,60,.8); 
    font-size: 14px;
    word-break: break-word;
    -webkit-transition: border linear .2s,box-shadow linear .2s;
    -moz-transition: border linear .2s,box-shadow linear .2s;
    -o-transition: border linear .2s,box-shadow linear .2s;
    transition: border linear .2s,box-shadow linear .2s;
    display: inline-block;
    height: 20px;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #555;
    vertical-align: middle;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
#content_value{
    height: 30em;
    box-shadow: 0 0 2px rgba(60,60,60,.8); ;    
}

@media (max-width: 860px) {

}
</style>