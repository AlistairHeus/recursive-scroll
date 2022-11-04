// import './style.css'

// import * as THREE from 'three'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import fragment from './shader/fragment.glsl'
// import fragment1 from './shader/fragment1.glsl'
// import vertex from './shader/vertex.glsl'

// // three/examples/jsm/postprocessing/EffectComposer

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
// import { PostProcessing } from './postprocessing'

// import gsap from 'gsap'
// import * as dat from 'dat.gui'

// /**
//  * Base
//  */
// const parameters = {}
// parameters.radius = 1
// parameters.detail = 1
// parameters.wireframe = false
// parameters.mouse = true
// parameters.images = 'dune-du-pilat'
// parameters.howmuchrgbshifticanhaz = 1

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Object
//  */
// let geometry = null
// let geometry1 = null
// let material = null
// let material1 = null
// let icosahedron = null
// let icosahedronLines = null

// const generateIcosahedron = () => {
//   if (icosahedron !== null) {
//     geometry.dispose()
//     material.dispose()

//     geometry1.dispose()
//     material1.dispose()

//     scene.remove(icosahedron)
//     scene.remove(icosahedronLines)
//   }

//   /**
//    * GEOMETRIES
//    */
//   geometry = new THREE.IcosahedronGeometry(parameters.radius, parameters.detail)

//   geometry1 = new THREE.IcosahedronBufferGeometry(
//     parameters.radius,
//     parameters.detail
//   ) //(1.001, 1)

//   let length = geometry1.attributes.position.array.length
//   let bary = []

//   for (let i = 0; i < length / 3; i++) {
//     // xyz, xyz, xyz
//     bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0)
//   }

//   let aBary = new Float32Array(bary)
//   geometry1.setAttribute('aBary', new THREE.BufferAttribute(aBary, 3))

//   let t = new THREE.TextureLoader().load(`images/${parameters.images}.jpg`)
//   t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping

//   /**
//    * MATERIALS
//    */
//   material = new THREE.ShaderMaterial({
//     extensions: {
//       derivatives: '#extension GL_OES_standard_derivatives : enable',
//     },
//     side: THREE.DoubleSide,
//     uniforms: {
//       time: { type: 'f', value: 0 },
//       mouse: { value: 0 },
//       landscape: {
//         value: t,
//       },
//       resolution: { type: 'v4', value: new THREE.Vector4() },
//       uvRate1: {
//         value: new THREE.Vector2(1, 1),
//       },
//     },
//     wireframe: parameters.wireframe,
//     // transparent: true,
//     vertexShader: vertex,
//     fragmentShader: fragment,
//   })

//   material1 = new THREE.ShaderMaterial({
//     extensions: {
//       derivatives: '#extension GL_OES_standard_derivatives : enable',
//     },
//     side: THREE.DoubleSide,
//     uniforms: {
//       time: { type: 'f', value: 0 },
//       mouse: { value: 0 },
//       landscape: {
//         value: t,
//       },
//       resolution: { type: 'v4', value: new THREE.Vector4() },
//       uvRate1: {
//         value: new THREE.Vector2(1, 1),
//       },
//     },
//     wireframe: parameters.wireframe,
//     // transparent: true,
//     vertexShader: vertex,
//     fragmentShader: fragment1,
//   })

//   /**
//    * MESHES
//    */
//   icosahedron = new THREE.Mesh(geometry1, material)
//   icosahedronLines = new THREE.Mesh(geometry1, material1)

//   //   scene.add(icosahedron, icosahedronLines)
//   scene.add(icosahedron)
//   scene.add(icosahedronLines)
// }

// generateIcosahedron()

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// }

// // Handle window resize
// window.addEventListener('resize', () => {
//   // update sizes
//   sizes.width = window.innerWidth
//   sizes.height = window.innerHeight

//   // update camera
//   camera.aspect = sizes.width / sizes.height
//   camera.updateProjectionMatrix()

//   // update renderer
//   renderer.setSize(sizes.width, sizes.height)
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// window.addEventListener('dblclick', () => {
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullscreenElement

//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen()
//     } else if (canvas.webkitRequestFullscreen) {
//       canvas.webkitRequestFullscreen()
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen()
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen()
//     }
//   }
// })

// let mouse = 0
// let lastX = 0
// let lastY = 0
// let speed = 0
// window.addEventListener('mousemove', (e) => {
//   //   speed = (e.pageX - lastX) * 0.1
//   speed = Math.sqrt((e.pageX - lastX) ** 2 + (e.pageY - lastY) ** 2) * 0.1

//   lastX = e.pageX
//   lastY = e.pageY
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//   70,
//   sizes.width / sizes.height,
//   0.001,
//   1000
// )

// camera.position.x = 0
// camera.position.y = 0
// camera.position.z = 2

// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   alpha: true,
// })

// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setSize(sizes.width, sizes.height)
// // renderer.setClearColor(0x111111, 1)
// renderer.outputEncoding = THREE.sRGBEncoding

// /**
//  * Effect Composer
//  */
// let composer = new EffectComposer(renderer)
// composer.setSize(sizes.width, sizes.height)
// composer.addPass(new RenderPass(scene, camera))

// let customPass = new ShaderPass(PostProcessing)
// customPass.uniforms['resolution'].value = new THREE.Vector2(
//   window.innerWidth,
//   window.innerHeight
// )
// customPass.uniforms['resolution'].value.multiplyScalar(window.devicePixelRatio)
// composer.addPass(customPass)

// /**
//  * Debug
//  */
// const gui = new dat.GUI({
//   //   closed: true,
//   width: 250,
// })
// // gui.hide()

// gui
//   .add(parameters, 'radius')
//   .min(1)
//   .max(20)
//   .step(1)
//   .onFinishChange(generateIcosahedron)
// gui
//   .add(parameters, 'detail')
//   .min(1)
//   .max(20)
//   .step(1)
//   .onFinishChange(generateIcosahedron)
// gui.add(parameters, 'wireframe').onChange(generateIcosahedron)

// gui
//   .add(parameters, 'mouse')
//   .onChange((val) => {
//     console.log({ val, mouse: parameters.mouse })
//   })
//   .name('mouse tracking')

// gui
//   .add(parameters, 'images', [
//     'dune-du-pilat',
//     'pilat-beach',
//     'pilat-sand',
//     'bordeaux',
//     'sand',
//     'okinawa-sea',
//     'sakura',
//     'geisha',
//   ])
//   .onFinishChange(generateIcosahedron)

// // gui
// //   .add(parameters, 'howmuchrgbshifticanhaz')
// //   .min(0)
// //   .max(1)
// //   .step(0.01)
// //   .name('RGB shift')

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () => {
//   const isMouseEnabled = parameters.mouse
//   const elapsedTime = clock.getElapsedTime()

//   mouse -= (mouse - speed) * 0.05
//   // mouse *= 0.99
//   speed *= 0.99

//   icosahedron.rotation.x = elapsedTime * 0.04
//   icosahedron.rotation.y = elapsedTime * 0.04

//   icosahedronLines.rotation.x = elapsedTime * 0.04
//   icosahedronLines.rotation.y = elapsedTime * 0.04

//   customPass.uniforms.time.value = elapsedTime
//   customPass.uniforms.howmuchrgbshifticanhaz.value = isMouseEnabled
//     ? mouse / 5
//     : 0.3 //parameters.howmuchrgbshifticanhaz

//   material.uniforms.time.value = elapsedTime
//   material1.uniforms.time.value = elapsedTime

//   if (isMouseEnabled) {
//     material.uniforms.mouse.value = mouse
//     material1.uniforms.mouse.value = mouse
//   } else {
//     material.uniforms.mouse.value = 0
//     material1.uniforms.mouse.value = 0
//   }

//   // Update controls
//   controls.update()

//   // Render
//   // renderer.render(scene, camera)
//   composer.render()

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick)
// }

// tick()

import * as THREE from "three";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// init

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.scroll = 0;
    this.scrollTarget = 0;
    this.currentScroll = 0;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    this.isPlaying = true;
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.scrollEvent();
    //  this.container = options.dom;

    //   this.renderer = new THREE.WebGLRenderer({ antialias: true });
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   document.getElementById("container").appendChild(this.renderer.domElement);

    //   this.camera = new THREE.PerspectiveCamera(
    //     70,
    //     window.innerWidth / window.innerHeight,
    //     0.01,
    //     10
    //   );
    //   this.camera.position.z = 1;
    //   this.scene = new THREE.Scene();
    //   this.addMesh();
    //   this.time = 0;
    //   this.render();
  }

  scrollEvent() {
    document.addEventListener("mousewheel", (e) => {
      this.scrollTarget = e.wheelDelta * 0.3;
    });
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.imageAspect = 853 / 1280;
    let a1;
    let a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }

    this.material.uniforms.resolutions.value.x = this.width;
    this.material.uniforms.resolutions.value.y = this.height;
    this.material.uniforms.resolutions.value.z = a1;
    this.material.uniforms.resolutions.value.w = a2;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    // this.geometry = new THREE.PlaneBufferGeometry(1, 1);
    // this.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        // progress: { type: "f", value: 0 },

        time: { value: 0 },
        resolutions: { value: new THREE.Vector4() },
      },
      side: THREE.DoubleSide,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.meshes = [];

    for (let i = 0; i < 10; i++) {
      let mesh = new THREE.Mesh(this.geometry, this.material);

      this.meshes.push({
        mesh,
        index: i,
      });
      this.scene.add(mesh);
    }

    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.plane);

    // this.mesh = new THREE.Points(this.geometry, this.material);
    // this.scene.add(this.mesh);
  }

  stop() {
    this.isPlaying = false;
  }
  play() {
    if (!this.isPlaying) {
      (this.isPlaying = true), this.render();
    }
  }

  updateMeshes() {
    this.meshes.forEach((o) => {
      o.mesh.position.x = 1.1 * o.index + this.currentScroll;
    });
  }

  render() {
    if (!this.isPlaying) return;

    this.time += 0.05;
    this.scroll += (this.scrollTarget - this.scroll) * 0.1;
    this.scroll += 0.9;
    this.scrollTarget += 0.9;
    console.log(this.scroll);

    this.currentScroll += this.scroll * 0.01;

    this.updateMeshes();
    // this.mesh.rotation.y += 0.02;
    this.material.uniforms.time.value = this.time;
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.getElementById("container"),
});

// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animation);
