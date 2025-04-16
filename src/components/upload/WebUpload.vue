<script generic="F extends IFile & Entity" lang="ts" setup>
import type { ClassConstructor, Entity, IJson } from '@airpower/core'
import type { PropType } from 'vue'
import type { IFile } from '../../util'
import { ClassTransformer, FileUtil, HttpConfig } from '@airpower/core'
import { ref } from 'vue'
import { WebConfig } from '../../config'
import { WebI18n } from '../../i18n'
import { FeedbackUtil, WebAccessTokenUtil } from '../../util'
import { WebDialog } from '../dialog'

const props = defineProps({
  /**
   * # 标准确认返回
   */
  onConfirm: {
    type: Function as PropType<(file: F | null) => void>,
    default: () => null,
  },

  /**
   * # 自定义确认按钮事件
   */
  onCustomConfirm: {
    type: Function,
    default: () => null,
  },

  /**
   * # 自定义上传成功回调
   */
  onCustomSuccess: {
    type: Function,
    default: null,
  },

  /**
   * # 标准取消返回
   */
  onCancel: {
    type: Function,
    default: () => null,
  },

  /**
   * # 上传弹窗中的标题
   */
  title: {
    type: String,
    default: '文件上传',
  },

  /**
   * # 确认按钮的文字
   */
  confirmText: {
    type: String,
    default: undefined,
  },

  /**
   * # 上传允许的最大文件大小
   * 默认 `10m`
   */
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },

  /**
   * # 上传文件使用的`name`属性
   */
  uploadName: {
    type: String,
    default: WebConfig.uploadFileName,
  },

  /**
   * # 上传成功的文案提示
   */
  uploadSuccess: {
    type: String,
    default: WebI18n.get().UploadSuccess,
  },

  /**
   * # 手动指定的上传路径
   */
  uploadUrl: {
    type: String,
    default: WebConfig.uploadUrl,
  },

  /**
   * # 允许上传的后缀
   */
  extensions: {
    type: Array<string>,
    default: () => ['jpg', 'jpeg', 'png'],
  },

  /**
   * # 接收文件的实体类
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<F>>,
    required: true,
  },

  /**
   * # 上传文件同时发送的数据
   */
  data: {
    type: Object as PropType<IJson>,
    default: () => null,
  },

  /**
   * # 上传文件同时发送的 `header`
   */
  header: {
    type: Object as PropType<IJson>,
    default: () => null,
  },

  /**
   * 显示的提示文字
   */
  tips: {
    type: String,
    default: '',
  },
})

/**
 * # Loading状态
 */
const loading = ref(false)

/**
 * # 上传的header
 */
const uploadHeader = ref({
  Authorization: WebAccessTokenUtil.getAccessToken(),
} as IJson)

if (props.header) {
  Object.assign(uploadHeader.value, props.header)
}

/**
 * # 上传验证
 */
function uploadReady(file: { name: string, size: number }): boolean {
  // 文件类型验证
  if (!props.extensions.includes('*')) {
    const arr = file.name.split('.')
    const fileExt = arr && arr.length > 1 ? arr[arr.length - 1] : ''
    const isFileTypeAllowed = props.extensions.includes(fileExt.toLowerCase())
    if (!isFileTypeAllowed) {
      FeedbackUtil.alertError(WebI18n.get().FileTypeNotSupported, WebI18n.get().UploadError)
      return false
    }
  }
  const isFileSizeAllowed = file.size <= props.maxSize
  // 文件大小验证
  if (!isFileSizeAllowed) {
    FeedbackUtil.alertError(WebI18n.get().FileSizeLimited, WebI18n.get().UploadError)
    return false
  }

  loading.value = true
  return true
}

/**
 * # 上传失败
 */
function onUploadError() {
  loading.value = false
  FeedbackUtil.alertError(WebI18n.get().FileUploadErrorAndRetryPlease, WebI18n.get().UploadError)
  props.onCancel()
}

/**
 * # 上传成功
 */
function onUploadSuccess(result: IJson) {
  loading.value = false
  if (props.onCustomSuccess) {
    props.onCustomSuccess(result)
    props.onConfirm(null)
    return
  }
  if (result.code === undefined || result.code === null) {
    onUploadError()
    return
  }
  if (result.code === HttpConfig.successCode) {
    FeedbackUtil.toastSuccess(props.uploadSuccess)

    const entity = ClassTransformer.parse(result.data as IJson, props.entity)
    props.onConfirm(entity)
  }
  else {
    FeedbackUtil.alertError(
      (result.message as string) || '好家伙,后端的拉垮哥们连Message都没返回???',
      WebI18n.get().UploadError,
    )
    props.onCancel()
  }
}
</script>

<template>
  <WebDialog
    :allow-fullscreen="false"
    :confirm-text="confirmText"
    :hide-footer="!confirmText"
    :title="title"
    class="upload-dialog"
    hide-cancel
    min-height="220px"
    @on-cancel="onCancel()"
    @on-confirm="onCustomConfirm()"
  >
    <div
      v-loading="loading"
      class="file-upload-pack"
    >
      <el-upload
        v-if="entity"
        :action="uploadUrl"
        :before-upload="uploadReady"
        :data="data"
        :headers="uploadHeader"
        :name="uploadName"
        :on-error="onUploadError"
        :on-success="onUploadSuccess"
        :show-file-list="false"
        class="upload"
        drag
      >
        <div class="el-upload__text">
          <b>{{ WebI18n.get().ClickHereToUpload }}</b>
          <span>
            {{ WebI18n.get().FileSize }}
            <b>{{ FileUtil.getFileSizeFriendly(props.maxSize) }}</b>
            {{ WebI18n.get().FileExtension }}
            <template v-if="!extensions.includes('*')">
              <b>{{ extensions.join('/') }}</b>
            </template>
          </span>
          <div
            v-if="tips"
            class="tips"
          >
            {{ tips }}
          </div>
        </div>
      </el-upload>
    </div>
  </WebDialog>
</template>

<style lang="scss">
.upload-dialog {
  .body {
    padding-bottom: 0 !important;
  }

  .main {
    min-width: 500px !important;
  }

  .file-upload-pack {
    display: flex;
    flex-direction: column;
    align-items: center;

    .upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .el-upload {
        width: 100%;

        .el-upload__text {
          display: flex;
          flex-direction: column;

          > b {
            font-size: 18px;
          }

          span {
            font-size: 12px;
            margin-top: 10px;
            color: #ccc;

            b {
              color: #999;
              margin: 0 3px;
            }
          }

          .tips {
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            color: orangered;
            font-size: 14px;
          }
        }

        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
}

::v-deep(.air-dialog) {
  .main {
    min-height: 200px !important;
  }
}
</style>
