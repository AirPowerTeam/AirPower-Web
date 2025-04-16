<script lang="ts" setup>
import { WebDateTime, WebDesensitize, WebMoney, WebPanel, WebPermissionUtil } from '../src'
import { WebConfig } from '../src/config'
import { User } from './User'

WebConfig.autoPermissionPrefix = true

async function init() {
  console.log(WebPermissionUtil.get(User, 'add'))
}

init()
</script>

<template>
  <WebPanel title="车上">
    <WebDateTime :milli-second="new Date().valueOf() - 961238200" is-friendly />
    <WebDesensitize :head="2" :tail="6" content="17666666666" />
    <WebMoney :money="1234.5678" />
  </WebPanel>
</template>

<style lang="scss" scoped>

</style>
