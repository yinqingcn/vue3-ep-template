import { defineStore } from 'pinia'
import { ref } from 'vue'

const useConfigStore = defineStore('app-config', () => {
  const defaultSetting = ref({
    layout: 'defaults',
    showSidebarLogo: false,
    showBreadcrumb: false,
    showBreadcrumbIcon: false,
    showTagsview: false,
    showTagsviewIcon: false,
    showWatermark: false,
    watermarkText: 'z-app-admin'
  });

  const setSetting = (setting: any) => {
    defaultSetting.value = setting
  }
  const getSetting = () => {
    return defaultSetting.value
  }

  return {
    getSetting,
    setSetting
  }
})

export default useConfigStore
