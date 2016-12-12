import Vue from 'vue'
import VueResource from 'vue-resource'

export default {
    login (info, callback) {
        Vue.http.post(
            'http://localhost:3000/login',
            info
        ).then((response) => {
            /*console.log(response.body);*/
            callback(response.body);
        });
    },
    signup (info, callback) {
        /*console.log(info);*/
        Vue.http.post(
            'http://localhost:3000/signup',
            info
        ).then((response) => {
            /*console.log(response.body);*/
            callback(response.body);
        })
    }
}