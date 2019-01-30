<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
    <!-- 没配置column -->
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <!-- 空格 用于树形展示 -->
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
        <!-- 树形操作按钮 -->
        <span v-if="iconShow(0, scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        <!-- 递增序号 -->
        {{ scope.$index }}
      </template>
    </el-table-column>
    <!-- 配置了column -->
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- 空格 用于树形展示 -->
        <!-- eslint-disable-next-line -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space" />
        <!-- 树形操作按钮 -->
        <span v-if="iconShow(index, scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <!-- 插槽 -->
    <slot />
  </el-table>
</template>
<script>
import treeToArray from './eval'
export default {
  name: 'TreeTable',
  props: {
    data: { // 数据
      type: [Array, Object],
      required: true
    },
    columns: { // 表头
      type: Array,
      default: () => [] // 防止报错
    },
    evalFunc: Function, // 格式化函数
    evalArgs: Array, // 格式化函数的参数
    expandAll: { // 是否全部展开, 默认关闭
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      // 格式化函数, 没提供则用默认的
      // 需要三个参数
      // data(需要格式化的数据, 必须)
      // expendAll(是否需要全部展开, 必须)
      // evalArgs(格式化函数需要的其他参数, 不必须)
      const func = this.evalFunc || treeToArray
      // 拼接格式化函数的参数
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    /**
     * 显示叶子节点
     */
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    /**
     * 切换叶子节点的展开收缩
     */
    toggleExpanded: function(trIndex) {
      // 通过序号找到父节点
      const record = this.formatData[trIndex]
      // 设置展开属性
      record._expended = !record._expended
    },
    /**
     * 图标显示
     */
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    }
  }
}
</script>
<style lang="scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
