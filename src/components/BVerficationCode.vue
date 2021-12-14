<script setup lang="ts">
import { emit } from 'process'
import { onMounted, watch } from 'vue'

interface ComponentsProps {
  height?: number
  width?: number
  verfication: string
}

const props = withDefaults(defineProps<ComponentsProps>(), {
  height: 40,
  width: 140,
  verfication: ''
})

const emits = defineEmits(['refreshCanvas'])

let refreshCanvas = () => {
  emits('refreshCanvas')
}

onMounted(() => {
  refreshCanvas()
})

// 监听verfication变化，刷新canvas
watch(
  () => props.verfication,
  (newVal) => {
    draw(newVal)
  }
)

// 随机颜色背景
const ranbColor = (min: number, max: number) => {
  let r = Math.floor(Math.random() * (max - min + 1) + min)
  let g = Math.floor(Math.random() * (max - min + 1) + min)
  let b = Math.floor(Math.random() * (max - min + 1) + min)
  return `rgb(${r},${g},${b})`
}

// 随机范围数
const ranbNum = (min: number, max: number) => {
  var num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}

// 绘制验证码
const draw = (verficationCode: string) => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const canvasHeight = canvas.clientHeight
  const canvasWidth = canvas.clientWidth

  //清空之前的矩形,释放空间
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  // 绘制矩形
  ctx.fillStyle = ranbColor(170, 250)
  ctx.rect(0, 0, canvasWidth, canvasHeight)
  ctx.fill()

  // 绘制后端返回验证码
  const smscode = verficationCode.split('')
  smscode.forEach((el: any, index: number) => {
    ctx.fillStyle = ranbColor(70, 150)
    ctx.font = ranbNum(30, 35) + 'px SimHei'
    ctx.fillText(el, ranbNum(17, 25) + index * 20, ranbNum(20, 30)) //字体填充(字内容,x轴,y轴)位置都是随机
  })

  // 绘制干扰线
  for (let i = 0; i < 7; i++) {
    ctx.beginPath() //路径开始,子路经的集合
    ctx.moveTo(ranbNum(0, canvasWidth), ranbNum(0, canvasHeight)) //起始点(x,y),都随机
    ctx.lineTo(ranbNum(0, canvasWidth), ranbNum(0, canvasHeight)) //终止点(x,y)
    ctx.strokeStyle = ranbColor(60, 160) //路径的颜色
    ctx.stroke() //将上面的两个点连接起来
  }

  // 绘制干扰点
  for (let i = 0; i < 40; i++) {
    ctx.beginPath() //路径开始
    ctx.arc(
      ranbNum(0, canvasWidth),
      ranbNum(0, canvasHeight),
      1,
      0,
      6 * Math.PI
    ) //画圆(x,y,z,0,2*Math.PI) x坐标,y坐标,半径,完整圆
    ctx.strokeStyle = ranbColor(60, 160)
    ctx.stroke()
  }
}

defineExpose({
  draw
})
</script>

<script lang="ts">
export default {
  name: 'BVerficationCode',
  inheritAttrs: false
}
</script>

<template>
  <canvas
    id="canvas"
    class="canvas-container"
    :height="height"
    :width="width"
    @click="refreshCanvas"
  ></canvas>
</template>
<style lang="scss" scoped>
.canvas-container {
  padding: 0 10px;
  cursor: pointer;
}
</style>
