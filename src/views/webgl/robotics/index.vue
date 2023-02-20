<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import website from '@/config/website'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入gltf载入库
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//导入解压库
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { onMounted, ref, onUnmounted } from 'vue'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
//场景初始化
const scene = new THREE.Scene()
//初始化相机
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 232) / (window.innerHeight - 92), 0.1, 1000)
//设置位置
camera.position.set(0, 1.5, 6)
//初始化渲染器
const renderer = new THREE.WebGLRenderer({
  //设置抗锯齿
  antialias: true
  //对数深度缓冲区
  //logarithmicDepthBuffer: true,
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
// const axes = new THREE.AxesHelper();
// scene.add(axes);
const hdrLoader = new RGBELoader()
hdrLoader.load(website.resource + '/three/robotics/sky12.hdr', texture => {
  texture.mapping = THREE.EquirectangularRefractionMapping
  scene.background = texture
  scene.environment = texture
})
//添加机器人
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath(website.resource + '/three/draco/')
loader.setDRACOLoader(dracoLoader)
loader.load(website.resource + '/three/robotics/robot.glb', gltf => {
  scene.add(gltf.scene)
})
//添加直线光源
const light1 = new THREE.DirectionalLight(0xffffff, 0.3)
light1.position.set(0, 10, 10)
const light2 = new THREE.DirectionalLight(0xffffff, 0.3)
light2.position.set(0, 10, -10)
const light3 = new THREE.DirectionalLight(0xffffff, 0.8)
light3.position.set(10, 10, 10)
scene.add(light1, light2, light3)
//添加视频
let video = document.createElement('video')
video.src = website.resource + '/three/robotics/zp2.mp4'
video.loop = true
video.muted = true
video.crossOrigin = '*'
video.play()
const videoTexture = new THREE.VideoTexture(video)
const videoGeometry = new THREE.PlaneGeometry(8, 4.5)
const videoMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  transparent: true,
  side: THREE.DoubleSide,
  alphaMap: videoTexture
})
const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial)
videoMesh.position.set(0, 0.2, 0)
videoMesh.rotation.set(-Math.PI / 2, 0, 0)
scene.add(videoMesh)
//添加镜面反射
const reflectorGeometry = new THREE.PlaneGeometry(100, 100)
const reflectorPlane = new Reflector(reflectorGeometry, {
  textureHeight: window.innerHeight,
  textureWidth: window.innerWidth,
  color: 0x332222
})
reflectorPlane.rotation.x = -Math.PI / 2
scene.add(reflectorPlane)
</script>
