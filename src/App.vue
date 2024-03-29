<template>
  <el-config-provider :locale="locale">
    <keep-alive :include="keepAliveList">
      <router-view></router-view>
    </keep-alive>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider,
  },
  setup() {
    // TODO 这里配置需要缓存的页面
    const keepAliveList = ref([])
    return {
      locale: zhCn,
      keepAliveList,
    }
  },
})
</script>

<style scoped></style>
