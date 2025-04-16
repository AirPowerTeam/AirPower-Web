<script generic="E extends Entity" lang="ts" setup="props">
import type { Entity } from '@airpower/core'
import { Page, QueryPageResponse } from '@airpower/core'
import { ElButton, ElInput, ElPagination, ElPopover, ElRadioButton, ElRadioGroup } from 'element-plus'
import { computed, ref } from 'vue'
import { WebConfig } from '../../config'
import { WebI18n } from '../../i18n'

const props = defineProps({
  /**
   * # 响应对象
   */
  response: {
    type: QueryPageResponse<E>,
    required: true,
  },
})

const emits = defineEmits<{
  onChange: [page: Page]
  change: [page: Page]
}>()

/**
 * # 页码对象
 */
const page = ref(new Page())

/**
 * # 当前页码
 */
const currentPage = ref(page.value.pageNum)

/**
 * # 抛出数据
 */
function emitChange() {
  currentPage.value = page.value.pageNum
  emits('change', page.value)
}

/**
 * # 页码变更
 */
function pageChanged(num: string | number): void {
  page.value.pageNum = Number.parseInt(num.toString(), 10)
  page.value.pageSize = props.response.page.pageSize
  emitChange()
}

/**
 * # 每页数量变更
 */
function sizeChanged(size: number): void {
  page.value.pageNum = 1
  page.value.pageSize = size
  emitChange()
}

/**
 * # 禁用页码标签
 */
const disablePageLabel = '...'

/**
 * # 快捷页码列表
 */
const pageCountList = computed(() => {
  const showPageCount = 15
  const endSecondPage = showPageCount - 1
  const mid = Number.parseInt((showPageCount / 2).toString(), 10) + 1

  const list: string[] = []
  if (props.response.pageCount <= showPageCount) {
    for (let i = 1; i <= props.response.pageCount; i += 1) {
      list.push(i.toString())
    }
    return list
  }
  for (let i = 1; i <= showPageCount; i += 1) {
    if (i === 1) {
      // 第一页
      list.push(i.toString())
      continue
    }
    if (i === showPageCount) {
      list.push(props.response.pageCount.toString())
      continue
    }
    if (page.value.pageNum > mid) {
      if (i === 2) {
        // 第二页
        list.push(disablePageLabel)
        continue
      }

      if (page.value.pageNum > props.response.pageCount - mid) {
        // 最后一页选中 前面的
        list.push(String(props.response.pageCount - mid + 1 + i - mid))
        continue
      }

      if (endSecondPage === i && page.value.pageNum <= props.response.pageCount - mid + 1) {
        list.push(disablePageLabel)
        continue
      }
      // 中间页码 两头禁用和起始
      list.push((page.value.pageNum - mid + i).toString())
      continue
    }

    if (endSecondPage === i) {
      // 倒数第二页
      list.push(disablePageLabel)
      continue
    }
    list.push(i.toString())
  }
  return list
})

/**
 * # 输入页码变更
 */
function currentPageChanged() {
  if (currentPage.value) {
    page.value.pageNum = Math.min(props.response.pageCount, Number.parseInt(currentPage.value.toString(), 10))
    page.value.pageNum = Math.max(page.value.pageNum, 1)
    emitChange()
  }
}

/**
 * # 页码宽度
 */
const pageItemWidth = [30, 30, 30, 30, 40, 52, 58, 64, 70]

/**
 * # 页码容器宽度
 */
const pageBoxWidth = [230, 230, 230, 230, 280, 340, 370, 400, 430]
</script>

<template>
  <div class="web-page">
    <ElPagination
      v-model:current-page="page.pageNum"
      v-model:page-size="page.pageSize"
      :page-sizes="WebConfig.pageSizes"
      :total="response.total"
      background
      class="web-page-bar"
      layout=" prev, next"
      size="small"
      @current-change="pageChanged($event)"
    />
    <ElPopover
      v-if="page.pageNum && response.pageCount"
      :width="pageBoxWidth[pageCountList[pageCountList.length - 1].length]"
      trigger="click"
      @hide="pageChanged(page.pageNum)"
    >
      <template #reference>
        <div class="web-page-count">
          <span>{{ page.pageNum }} / {{ response.pageCount }}</span>
        </div>
      </template>
      <template #default>
        <div class="web-page-panel-box">
          <div class="web-page-header">
            <div class="web-page-title">
              {{ WebI18n.get().PageSize }}
            </div>

            <ElRadioGroup
              v-model="page.pageSize"
              class="web-page-radio"
              size="small"
            >
              <ElRadioButton
                v-for="item in WebConfig.pageSizes"
                :key="item"
                :value="item"
                @click="sizeChanged(item)"
              >
                {{ item }}
              </ElRadioButton>
            </ElRadioGroup>
          </div>
          <div class="web-page-goto">
            <ElButton
              v-for="item in pageCountList"
              :key="item"
              :disabled="item === disablePageLabel"
              :style="{ width: `${pageItemWidth[pageCountList[pageCountList.length - 1].length]}px` }"
              :type="page.pageNum === parseInt(item, 10) ? 'primary' : 'default'"
              round
              @click="pageChanged(item)"
            >
              {{ item }}
            </ElButton>
          </div>
          <div class="web-page-jumper">
            <ElInput
              v-model="currentPage"
              :max="response.pageCount"
              :placeholder="WebI18n.get().InputPageNumber "
              min="1"
              type="number"
              @change="currentPageChanged"
            >
              <template #append>
                <ElButton
                  size="small"
                  @click="pageChanged(page.pageNum)"
                >
                  {{ WebI18n.get().Jump }}
                </ElButton>
              </template>
            </ElInput>
          </div>
        </div>
      </template>
    </ElPopover>
    <div
      v-if="response.total"
      class="web-page-total"
    >
      {{ WebI18n.get().TotalRow }}: <span>{{ response.total }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.web-page {
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;

  .web-page-bar {
    margin-right: 10px;
    color: #aaa;

    .btn-next,
    .btn-prev {
      color: #000;
      font-weight: bolder;
    }

    .btn-next:hover,
    .btn-prev:hover {
      background-color: var(--el-color-primary-light-9) !important;
      color: var(--el-color-primary);
    }
  }

  .web-page-count:hover {
    display: inline-block;
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);

    * {
      color: var(--el-color-primary);
    }
  }

  .web-page-count {
    border-radius: 3px;
  }

  .web-page-count,
  .web-page-total {
    color: #aaa;

    padding: 3px 8px;

    span {
      cursor: pointer;
      font-weight: bold;
      color: #666;
      margin: 0 3px;
    }
  }
}

.web-page-panel-box {
  display: flex;
  flex-direction: column;

  .web-page-header {
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;

    .web-page-title {
      font-size: 15px;
      flex: 1;
    }
  }

  .web-page-goto {
    display: flex;
    border-top: 1px solid #f8f8f8;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 0;
    overflow: hidden;
    overflow-y: auto;
    align-content: flex-start;

    .el-button {
      width: 50px;
      height: 30px;
      margin: 5px;
      padding: 0;
      font-size: 13px;
    }
  }

  .web-page-jumper {
    display: flex;
    flex-direction: row;
  }
}
</style>
