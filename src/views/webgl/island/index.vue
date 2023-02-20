<template>
  <div class="container" ref="container"></div>
</template>
<script setup lang="ts">
import website from '@/config/website'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Water } from 'three/examples/jsm/objects/Water2'
// 导入gltf载入库
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//导入解压库
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { onMounted, ref, onUnmounted } from 'vue'
//场景初始化
const scene = new THREE.Scene()
//初始化相机
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 232) / (window.innerHeight - 92), 0.1, 2000)
//设置位置
camera.position.set(-50, 50, 200)
//初始化渲染器
const renderer = new THREE.WebGLRenderer({
  //设置抗锯齿
  antialias: true,
  //对数深度缓冲区
  logarithmicDepthBuffer: true
})
renderer.setSize(window.innerWidth - 232, window.innerHeight - 92)
renderer.outputEncoding = THREE.sRGBEncoding
const container = ref<HTMLElement | null>(null)
//添加控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
const render = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
onMounted(() => {
  container.value?.appendChild(renderer.domElement)
  render()
  window.addEventListener('resize', () => {
    camera.aspect = (window.innerWidth - 232) / (window.innerHeight - 92)
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth - 232, window.innerHeight - 92)
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
//添加天空球
const skyGeometry = new THREE.SphereGeometry(1000, 60, 60)
const skyMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(website.resource + '/three/small-Island/sky.jpg')
})
const sky = new THREE.Mesh(skyGeometry, skyMaterial)
sky.geometry.scale(1, 1, -1)
scene.add(sky)
//创建视频纹理
const video = document.createElement('video')
video.src = website.resource + '/three/small-Island/sky.mp4'
video.loop = true
video.crossOrigin = '*'
window.addEventListener('click', () => {
  if (video.paused) {
    video.play()
    skyMaterial.map = new THREE.VideoTexture(video)
    skyMaterial.map.needsUpdate = true
  }
})
//载入环境纹理
const hdrLoader = new RGBELoader()
hdrLoader.loadAsync(website.resource + '/three/small-Island/050.hdr').then(texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})
//添加灯光
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-100, 100, 10)
scene.add(light)
//创建水面 几何体球面
const waterGeometry = new THREE.CircleGeometry(300, 64)
const water = new Water(waterGeometry, {
  textureWidth: 1024,
  textureHeight: 1024,
  color: 0xeeeeff,
  flowDirection: new THREE.Vector2(1, 1),
  scale: 1,
  normalMap0: new THREE.TextureLoader().load(website.resource + '/three/small-Island/water/Water_1_M_Normal.jpg'),
  normalMap1: new THREE.TextureLoader().load(website.resource + '/three/small-Island/water/Water_2_M_Normal.jpg')
})
water.rotation.x = -Math.PI / 2
water.position.y = 3
scene.add(water)
//添加小岛模型
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath(website.resource + '/three/draco/')
loader.setDRACOLoader(dracoLoader)
loader.load(website.resource + '/three/small-Island/model/island2.glb', gltf => {
  scene.add(gltf.scene)
})
</script>
