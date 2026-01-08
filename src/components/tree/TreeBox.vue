<script generic="T extends ITree & RootEntity" lang="ts" setup>
import type { TreeInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { ITree } from '../../interface/ITree'
import type { RootEntity } from '../../model/RootEntity'
import { ElInput, ElTree } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { WebConfig } from '../../config/WebConfig'
import { APanel } from '../index'

const props = defineProps({
  /**
   * ### 隐藏树
   */
  hideTree: {
    type: Boolean,
    default: false,
  },
  /**
   * ### 是否默认展开全部
   */
  defaultExpandAll: {
    type: Boolean,
    default: true,
  },

  /**
   * ### 是否显示树搜索
   */
  searchable: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 树搜索提示文案
   */
  placeholder: {
    type: String,
    default: '搜索...',
  },

  /**
   * ### 左侧树的数据
   */
  treeData: {
    type: Array<T>,
    required: true,
  },

  /**
   * ### 是否隐藏图标
   */
  hideIcon: {
    type: Boolean,
    default: true,
  },

  /**
   * ### 树是否正在加载
   */
  isTreeLoading: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 标题
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * ### 左侧树的宽度
   */
  width: {
    type: Number,
    default: 300,
  },

  /**
   * ### 是否可折叠
   */
  collapse: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 默认折叠状态
   */
  defaultCollapse: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  change: [data: T | undefined]
}>()

/**
 * ### 树的实例
 */
const treeRef = ref<TreeInstance>()

/**
 * ### 当前选中的数据
 */
const currentData: Ref<T | undefined> = ref()

/**
 * ### 当前搜索关键词
 */
const searchKeyword = ref('')

/**
 * ### 是否显示树
 */
const isShow = ref(!props.defaultCollapse)

/**
 * ### 关键词变更事件
 */
watch(searchKeyword, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val)
  }
})

const showWidth = computed(() => (isShow.value ? `${props.width}px` : 'auto'))

/**
 * ### 树节点选中事件
 * @param row
 */
function treeSelectChanged(row: T) {
  if (currentData.value && row.id === currentData.value.id) {
    currentData.value = undefined
    if (treeRef.value) {
      treeRef.value.setCurrentKey(undefined)
    }
  }
  else {
    currentData.value = row
  }
  emits('change', currentData.value)
}

/**
 * ### 节点过滤
 * @param value 输入的内容
 * @param node 节点
 */
function filterNode(value: any, node: any): boolean {
  if (!value)
    return true
  return (node as T).name?.indexOf(value as string) !== -1
}
</script>

<template>
  <div class="a-tree-box">
    <div
      v-if="!hideTree"
      :style="{ width: showWidth }"
      class="a-tree-box-left"
    >
      <APanel
        v-show="isShow"
        :hide-icon="hideIcon"
        :show-title="!!title"
        :title="title"
        class="a-tree-box-panel"
        hide-footer
      >
        <template #icon>
          <slot name="icon" />
        </template>
        <slot name="beforeSearch" />
        <div
          v-if="searchable"
          class="search-box"
        >
          <ElInput
            v-model="searchKeyword"
            :placeholder="placeholder"
            clearable
          />
        </div>
        <slot name="afterSearch" />
        <ElTree
          ref="treeRef"
          v-loading="isTreeLoading"
          :current-node-key="currentData ? currentData.id : 0"
          :data="treeData"
          :default-expand-all="defaultExpandAll"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :props="WebConfig.treeProps"
          highlight-current
          node-key="id"
          @node-click="treeSelectChanged"
        />
        <slot name="afterTree" />
      </APanel>
      <div
        v-if="collapse"
        :style="{ marginLeft: isShow ? '5px' : '0px' }"
        class="collapse-bar"
        @click="isShow = !isShow"
      />
    </div>
    <div class="a-tree-box-right">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.a-tree-box {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 0;
  overflow: hidden;
  position: relative;

  &-left {
    width: 300px;
    display: flex;
    flex-direction: row;
    margin-right: 5px;

    .collapse-bar {
      background-color: white;
      width: 5px;
      margin-left: 5px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 3px;
    }

    .collapse-bar:hover {
      background-color: var(--el-color-primary-light-3);
    }
  }

  &-panel {
    height: 100% !important;

    .panel-body {
      padding: 10px !important;
      padding-right: 0 !important;

      .search-box {
        padding-right: 10px;
      }

      .el-tree {
        padding-top: 10px;
        height: 0;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        padding-right: 5px;
      }
    }
  }

  &-right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
  }

  .el-tree-node__label {
    flex: 1;
    width: 0;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }

  .el-tree-node.is-current > .el-tree-node__content > .el-tree-node__label {
    color: white;
  }

}
</style>
