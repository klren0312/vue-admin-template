<template>
  <div class="home">
    <el-table :data="testData" row-key="t1">
      <el-table-column label="t1" prop="t1"></el-table-column>
      <el-table-column label="t2" prop="t2"></el-table-column>
      <el-table-column label="t3" prop="t3"></el-table-column>
      <el-table-column label="t4" prop="t4"></el-table-column>
      <el-table-column label="t5" prop="t5"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'Home',
  data() {
    return {
      testData: [{ t1: 1 }, { t1: 2 }, { t1: 3 }],
      sortable: null
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.setSort()
    })
  },
  methods: {
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.testData.splice(evt.oldIndex, 1)[0]
          this.testData.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }

}
</script>
