<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      {{msg}}
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import {localStorage} from 'common/storage'

  export default{
    data(){
      return {
        msg: 'home page',
        //left_menu_data: [],
      }
    },
    components: {
      panelTitle
    },
    created(){
      this.get_left_menu_data()
    },
    methods: {
      //获取数据
      get_left_menu_data(){
        this.$fetch.api_leftmenu.get()
          .then(({data, msg}) => {
//            console.log(msg);
//            console.log(data);
            //this.left_menu_data = data;
            localStorage.set('current_left_menu', data.home);
            localStorage.set('left_menu', data);
          })
          .catch((error) => {
            console.log(error);
          })
      },
    },
  }
</script>
