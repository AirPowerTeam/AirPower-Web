<script lang="ts" setup>
import { ElEmpty } from 'element-plus'
import image from '../../assets/img/empty.svg'
</script>

<template>
  <ElEmpty
    :image="image"
    class="a-empty"
  >
    <slot name="footer" />
    <template #description>
      <p>
        <slot />
      </p>
    </template>
  </ElEmpty>
</template>

<style lang="scss" scoped>
.a-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  ::v-deep(.el-empty__image) {
    width: 80px;
    height: 80px;
  }
}
</style>
