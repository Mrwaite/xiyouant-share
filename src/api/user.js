import Vue from 'vue'
import VueResource from 'vue-resource'

export default {
    login (info, callback) {
        Vue.http.post(
            'http://localhost:3000/login',
            info
        ).then((response) => {
            callback(response.body);
        });
    },

}