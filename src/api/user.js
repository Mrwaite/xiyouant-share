import Vue from 'vue'
import VueResource from 'vue-resource'



export default {
    login (info, callback) {
        Vue.http.post(
            'http://localhost:3000/login',
            info/*,
            {Credentials: true}  */ 
        ).then((response) => {
            /*console.log(response.body);*/
            callback(response.body);
        });
    },
    signup (info, callback) {
        /*console.log(info);*/
        Vue.http.post(
            'http://localhost:3000/signup',
            info/*,
            {withCredentials: true}*/
        ).then((response) => {
            /*console.log(response.body);*/
            callback(response.body);
        })
    },
    signout (callback) {
        Vue.http.get(
            'http://localhost:3000/singout'
        ).then((response) => {
            callback();
        })
    },
    check (callback) {
        Vue.http.get(
            'http://localhost:3000/check'
        ).then((response) => {
            callback(response.body)
        })
    }
}