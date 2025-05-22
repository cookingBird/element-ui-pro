<template>
  <el-upload
    ref="uploader"
    class="el-avatar-uploader"
    :show-file-list="showFileList"
    :auto-upload="autoUpload"
    :action="action"
    :disable="disable"
    :file-list="innerFileList"
    :list-type="listType"
    :on-change="onInputChange"
    :on-remove="onRemove"
    v-bind="omit($attrs, 'showFileList')"
    v-on="$listeners"
  >
    <img
      v-if="singleModeUrl && !showFileList"
      :src="singleModeUrl"
      class="el-upload-avatar"
      alt=""
    />
    <i v-else class="el-icon-plus el-avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import common from '../mixin/common'
import { fileToObjectUrl, revokeObjectURL } from '../utils/file'
import listenerInvoker from '../utils/listenerInvoker'

export default {
  name: 'ElUploadPro',
  mixins: [common],
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    value: {
      type: [Array, Object],
      default: null,
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: '',
    },
    listType: {
      /** @type { "text" | "picture" | "picture-card"  } */
      type: String,
      default: 'text',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerFileList: [],
    }
  },
  computed: {
    showFileList() {
      return !!Array.isArray(this.value)
    },
    singleMode() {
      return !this.showFileList
    },
    singleModeUrl() {
      return this.value?.url || this.value?.objectUrl
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        const { showFileList, value } = this
        if (showFileList) {
          this.innerFileList = value
        }
      },
    },
  },
  methods: {
    onRemove(file, fileList) {
      const doRemove = () => {
        if (this.singleMode) {
          this.$emit('update:value', null)
        } else {
          this.$emit('update:value', JSON.parse(JSON.stringify(fileList)))
        }
      }
      const { remove } = this.$listeners
      if (!remove) {
        doRemove()
        return
      }
      listenerInvoker(remove, removeCallback => {
        if (removeCallback.length === 0) {
          removeCallback(file)
          doRemove()
          return
        }
        if (removeCallback.length === 1) {
          removeCallback(file)
          doRemove()
          return
        }
        if (removeCallback.length === 2) {
          this.innerFileList = [...this.innerFileList]
          removeCallback(file, doRemove)
        }
      })
    },
    onInputChange(wFile, fileList) {
      const { raw: file } = wFile
      const { input } = this.$listeners
      const objURL = this.fileToObjectUrl(file)
      const doInput = (params = {}, updateValue = true) => {
        let payload
        if (this.singleMode) {
          payload = {
            name: file.name,
            url: undefined,
            objectUrl: objURL,
            file,
            ...params,
          }
        } else {
          payload = [...this.value]
          payload.unshift({
            name: file.name,
            url: undefined,
            objectUrl: objURL,
            file,
            ...params,
          })
        }
        updateValue && this.$emit('update:value', payload)
        return { single: this.singleMode, payload }
      }
      if (!input) {
        doInput()
        return
      }
      listenerInvoker(input, async inputCallback => {
        if (inputCallback.length === 0) {
          doInput()
          inputCallback()
          return
        }
        if (inputCallback.length === 1) {
          inputCallback(doInput().payload)
          return
        }
        if (inputCallback.length === 2) {
          fileList.pop()
          inputCallback(doInput({}, false).payload, p => doInput(p, true))
        }
      })
    },
    fileToObjectUrl(file) {
      const str = fileToObjectUrl(file)
      this.$once('hook:beforeDestroy', () => revokeObjectURL(str))
      return str
    },
  },
}
</script>

<style>
.el-avatar-uploader .el-upload-avatar {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-avatar-uploader[disabled] .el-upload {
  cursor: not-allowed;
}

.el-avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-upload-avatar,
.el-avatar-uploader-icon {
  width: 148px;
  height: 148px;
}

.el-avatar-uploader-icon {
  position: relative;
  @apply text-2.5xl;
  color: #8c939d;
  text-align: center;
}

.el-avatar-uploader-icon::before {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.el-upload-avatar {
  display: block;
}
</style>
