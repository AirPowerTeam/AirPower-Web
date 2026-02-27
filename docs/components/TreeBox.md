# TreeBox 树形容器

树形布局容器组件，包含左侧树和右侧内容区。

## 引入

```typescript
import { ATreeBox } from '@airpower/web'
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| hideTree | 隐藏树 | `boolean` | `false` | 否 |
| defaultExpandAll | 默认展开全部 | `boolean` | `true` | 否 |
| searchable | 显示树搜索 | `boolean` | `false` | 否 |
| placeholder | 树搜索提示文案 | `string` | `'搜索...'` | 否 |
| treeData | 左侧树的数据 | `ITree[]` | - | 是 |
| hideIcon | 隐藏图标 | `boolean` | `true` | 否 |
| isTreeLoading | 树加载中 | `boolean` | `false` | 否 |
| title | 标题 | `string` | `''` | 否 |
| width | 左侧树宽度 | `number` | `300` | 否 |
| collapse | 是否可折叠 | `boolean` | `false` | 否 |
| defaultCollapse | 默认折叠状态 | `boolean` | `false` | 否 |

## Emits

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| change | 树节点选择变化 | `(data: T \| undefined) => void` |

## Slots

| 插槽名 | 说明 | 作用域参数 |
| ------ | ---- | ---------- |
| default | 右侧内容区 | - |
| icon | 树标题图标 | - |
| beforeSearch | 搜索前区域 | - |
| afterSearch | 搜索后区域 | - |
| afterTree | 树后区域 | - |

## 示例

```vue
<template>
  <!-- 基础用法 -->
  <ATreeBox
    :tree-data="treeData"
    @change="handleTreeChange"
  >
    <div>右侧内容</div>
  </ATreeBox>

  <!-- 带搜索 -->
  <ATreeBox
    :tree-data="treeData"
    searchable
    @change="handleTreeChange"
  >
    <div>右侧内容</div>
  </ATreeBox>

  <!-- 可折叠 -->
  <ATreeBox
    :tree-data="treeData"
    :width="250"
    collapse
    @change="handleTreeChange"
  >
    <div>右侧内容</div>
  </ATreeBox>

  <!-- 自定义插槽 -->
  <ATreeBox
    :tree-data="treeData"
    searchable
    title="部门树"
  >
    <template #icon>
      <ElIcon><Folder /></ElIcon>
    </template>
    <template #beforeSearch>
      <AButton size="small" @click="handleAdd">
        添加
      </AButton>
    </template>
    <div>右侧内容</div>
  </ATreeBox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    name: '根节点',
    children: []
  }
])

function handleTreeChange(data: any) {
  console.log('选中节点:', data)
}

function handleAdd() {
  // 添加逻辑
}
</script>
```

## 注意事项

- 树数据需实现 `ITree` 接口
- 支持节点过滤搜索
- 点击已选中的节点可取消选中
- 可折叠模式下有折叠条用于展开/收起
- 树组件会自动填充父容器高度
