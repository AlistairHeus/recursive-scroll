import * as THREE from "three";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// init

import img1 from "../static/images/bordeaux.jpg";
import img2 from "../static/images/dune-du-pilat.jpg";
import img3 from "../static/images/geisha.jpg";
import img4 from "../static/images/okinawa-sea.jpg";
import img5 from "../static/images/pilat-beach.jpg";
import img6 from "../static/images/pilat-sand.jpg";
import disp from "../static/images/disp.png";

const images = [img1, img2, img3, img4, img5, img6];

const textures = images.map((img) => new THREE.TextureLoader().load(img));

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scroll = 0;
    this.scrollTarget = 0;
    this.currentScroll = 0;
    this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor(0x000000, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    // this.camera = new THREE.PerspectiveCamera(
    //   70,
    //   window.innerWidth / window.innerHeight,
    //   0.001,
    //   1000
    // );

    this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
      format: THREE.RGBAFormat,
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter,
    });

    this.renderTarget1 = new THREE.WebGLRenderTarget(this.width, this.height, {
      format: THREE.RGBAFormat,
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter,
    });

    let frustumSize = 4;

    let aspect = window.innerWidth / window.innerHeight;
    this.aspect = this.width / this.height;

    this.camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );

    this.camera.position.set(0, 0, 2);

    this.time = 0;

    this.backgroundQuad = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(4 * this.aspect, 4),
      new THREE.MeshBasicMaterial({
        // transparent: true,
      })
    );
    // this.backgroundQuad.position.y = 0.5;
    this.backgroundQuad.position.z = -0.5;
    this.scene.add(this.backgroundQuad);

    this.isPlaying = true;
    this.initQuad();
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.scrollEvent();
  }

  scrollEvent() {
    document.addEventListener("mousewheel", (e) => {
      this.scrollTarget = e.wheelDelta * 0.3;
    });
  }

  initQuad() {
    this.sceneQuad = new THREE.Scene();

    this.materialQuad = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        uTexture: { value: null },
        uDisp: { value: new THREE.TextureLoader().load(disp) },
        speed: { value: 0 },
        dir: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // this.materialQuad = new THREE.MeshBasicMaterial();

    this.quad = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(4 * this.aspect, 4),
      this.materialQuad
    );

    this.sceneQuad.add(this.quad);
  }

  // settings() {
  //   let that = this;
  //   this.settings = {
  //     progress: 0,
  //   }
  //   this.gui = new GUI();
  //   this.gui.add(this.settings, "progress", 0, 1, 0.01)
  // }

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
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    // let that = this;

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.meshes = [];
    this.n = 10;

    for (let i = 0; i < this.n; i++) {
      let mesh = new THREE.Mesh(
        this.geometry,
        new THREE.MeshBasicMaterial({
          map: textures[i % textures.length],
        })
      );
      this.meshes.push({
        mesh,
        index: i,
      });
      this.scene.add(mesh);
    }
  }

  // stop() {
  //   this.isPlaying = false;
  // }
  // play() {
  //   if (!this.isPlaying) {
  //     (this.isPlaying = true), this.render();
  //   }
  // }

  updateMeshes() {
    this.margin = 1.1;
    this.wholeWidth = this.n * this.margin;
    this.meshes.forEach((o) => {
      o.mesh.position.x =
        ((this.margin * o.index +
          this.currentScroll +
          42069 * this.wholeWidth) %
          this.wholeWidth) -
        this.margin * 2;
    });
  }

  // render() {
  //   if (!this.isPlaying) return;
  //   this.time += 0.05;
  //   this.scroll += (this.scrollTarget - this.scroll) * 0.1;
  //   this.scroll *= 0.9;
  //   this.scrollTarget *= 0.9;
  //   this.currentScroll += this.scroll * 0.01;
  //   this.updateMeshes();
  //   window.requestAnimationFrame(this.render.bind(this));

  //   // default texture
  //   this.renderer.setRenderTarget(this.renderTarget);
  //   this.renderer.render(this.scene, this.camera);

  //   // render distorted texture

  //   this.renderer.setRenderTarget(this.renderTarget1);
  //   this.materialQuad.uniforms.uTexture.value = this.renderTarget.texture;
  //   this.renderer.render(this.sceneQuad, this.camera);

  //   // // final scene
  //   this.renderer.setRenderTarget(null);
  //   this.backgroundQuad.material.map = this.renderTarget1.texture;
  //   this.renderer.render(this.scene, this.camera);
  // }

  render() {
    if (!this.isPlaying) return;

    this.time += 0.05;
    this.scroll += (this.scrollTarget - this.scroll) * 0.1;
    this.scroll *= 0.9;
    this.scrollTarget *= 0.9;
    this.currentScroll += this.scroll * 0.01;
    this.updateMeshes();
    // this.mesh.rotation.y += 0.02;

    requestAnimationFrame(this.render.bind(this));

    //default texture
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);

    //render distorted texture
    this.renderer.setRenderTarget(this.renderTarget1);
    this.materialQuad.uniforms.uTexture.value = this.renderTarget.texture;

    this.materialQuad.uniforms.speed.value = Math.min(
      0.3,
      Math.abs(this.scroll)
    );
    this.materialQuad.uniforms.dir.value = Math.sign(this.scroll);
    this.renderer.render(this.sceneQuad, this.camera);

    // render final scene
    this.renderer.setRenderTarget(null);
    this.backgroundQuad.material.map = this.renderTarget1.texture;
    this.renderer.render(this.scene, this.camera);
  }
}

new Sketch({
  dom: document.getElementById("container"),
});

// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animation);
