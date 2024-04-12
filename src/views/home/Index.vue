<template>
  <div class="container">
    {{ t('title') }}
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<i18n>
  zh-CN:
    title: 菜单管理
  en:
    title: Menu Management
</i18n>
