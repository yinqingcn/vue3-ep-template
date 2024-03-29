<template>
  <div v-if="isShowIconImg" :style="getIconImgOutStyle">
    <img :src="type" :style="getIconSvgInsStyle" />
  </div>
  <icon-park
    v-else-if="!isShowIconImg && iconType"
    :type="iconType"
    :theme="theme"
    :size="size"
    v-bind="$attrs"
  />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import * as IconData from '@icon-park/vue-next/icons.json'
/**
 * 配置项说明：https://www.npmjs.com/package/@icon-park/vue
 */
export default defineComponent({
  name: 'CustomIcon',
  components: { IconPark },
  props: {
    type: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'outline',
    },
    size: {
      type: [String, Number],
      default: '1em',
    },
  },
  setup(props) {
    const isNumber = (obj: any) => {
      return (typeof obj === 'number' && isFinite(obj)) || /\d*/g.test(obj)
    }
    // 在线链接、本地引入地址前缀
    const linesString = [
      'https',
      'http',
      '/src',
      '/assets',
      'data:image',
      import.meta.env.VITE_PUBLIC_PATH,
    ]
    const regexIP =
      /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
    // 用于判断在线链接、本地引入等图标显示、隐藏
    const isShowIconImg = computed(() => {
      return linesString.some((str) => props.type?.startsWith(str)) || regexIP.test(props.type)
    })
    // 设置图片样式
    const getIconImgOutStyle = computed(() => {
      let size = props.size
      if (isNumber(props.size)) {
        size = `${size}px`
      }
      return `width: ${size};height: ${size};display: inline-block;overflow: hidden;`
    })
    const getIconSvgInsStyle = computed(() => {
      let size = props.size
      if (isNumber(props.size)) {
        size = `${size}px`
      }
      return `width: ${size};height: ${size};position: relative;}`
    })

    const toPascalCase = (value: any) => {
      return value.replace(/(^\w|-\w)/g, (item: string) => {
        return item.slice(-1).toUpperCase()
      })
    }
    const iconType = computed(() => {
      const type = toPascalCase(props.type)
      if (IconData.default.some((item: any) => toPascalCase(item.name) === type)) {
        return type
      }
      return ''
    })
    return {
      iconType,
      isShowIconImg,
      getIconImgOutStyle,
      getIconSvgInsStyle,
    }
  },
})
</script>
