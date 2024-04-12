<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in list" :key="item.key">{{
      t(item.meta.title)
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style></style>
