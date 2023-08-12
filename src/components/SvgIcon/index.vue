<script lang='ts' setup>

  import { computed } from 'vue'

  defineOptions({
    name: 'SvgIcon',
  })

  const props = defineProps({
    iconClass: String,
    className: String,
  })

  const iconName = computed(() => {
    return props.iconClass ? `#icon-${props.iconClass}` : `#icon`
  })

  const svgClass = computed(() => {
    return props.className ? `#icon-${props.className}` : `svg-icon`
  })
</script>

<template>
  <svg :class='svgClass' aria-haspopup='true'>
    <use :xlink:href='iconName'></use>
  </svg>
</template>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
