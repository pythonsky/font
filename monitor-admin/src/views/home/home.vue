<template>
<div class="home-main">
  <warningList></warningList>
</div>
</template>

<script>
import warningList from "@/views/charts/warningList.vue"


export default {
  name: 'home',
  components: {
    warningList
  },
  data() {
    return {
      msg: "这是首页",
      columns1: [{
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [{
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],

    };
  },

};
</script>
