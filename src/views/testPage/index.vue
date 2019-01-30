<template>
  <div>
    <h1>Test</h1>
    <router-link to="test/1">带参</router-link>
    <el-input @input.native="inputChange"></el-input>
    <tree-table :data="data" :columns="columns" :expandAll="true">
      <el-table-column label="时间线">
        <template slot-scope="scope">
          {{scope.row.timeLine}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="message(scope.row)">点击</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>
<script>
import TreeTable from '@/components/TreeTable'
import { throttle } from '@/utils'
export default {
  name: 'Test',
  components: {
    TreeTable
  },
  data() {
    return {
      columns: [{
        text: '事件',
        value: 'event',
        width: 200
      }],
      data: [
        {
          id: 0,
          event: '事件1',
          timeLine: 50,
          comment: '无'
        },
        {
          id: 1,
          event: '事件1',
          timeLine: null,
          comment: '无',
          children: [
            {
              id: 2,
              event: '事件2',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 3,
              event: '事件3',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '事件4',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          event: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          event: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '事件8',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    console.log(this.$route.params)
  },
  methods: {
    inputChange: throttle(function(val) {
      console.log(val)
    }, 5000)
  }
}
</script>
<style lang="scss" scoped>

</style>
