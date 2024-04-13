import { defineStore } from 'pinia';
import { ref } from 'vue';

// Setup Store方式
const useConfigStore = defineStore('app-config', () => {
  const defaultSetting = ref({
    layout: 'defaults',
    language: 'zh-cn',
  });

  const setSetting = (setting: any) => {
    defaultSetting.value = setting;
  };
  const setLanguage = (language: string) => {
    defaultSetting.value.language = language;
  };
  const getLanguage = () => {
    return defaultSetting.value.language;
  };

  const getSetting = () => {
    return defaultSetting.value;
  };

  return {
    getSetting,
    setSetting,
    setLanguage,
    getLanguage,
  };
});

export default useConfigStore;
