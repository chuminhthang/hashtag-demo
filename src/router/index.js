import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/components/Upload'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
