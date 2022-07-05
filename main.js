import './style.css'
import Experience from "./Experience";
import * as THREE from 'three'
import RubiksCube from "./RubiksCube/RubiksCube";

class App extends Experience {

    constructor() {

        // Setup
        super({
            canvas: document.querySelector('canvas.webgl')
        });
        this.renderer.instance.setClearColor("#211d20")

        const cubeTextureLoader = new THREE.CubeTextureLoader()
        const environmentMap = cubeTextureLoader.load([
            '/textures/environmentMap/px.jpg',
            '/textures/environmentMap/nx.jpg',
            '/textures/environmentMap/py.jpg',
            '/textures/environmentMap/ny.jpg',
            '/textures/environmentMap/pz.jpg',
            '/textures/environmentMap/nz.jpg'
        ])
        this.scene.background = environmentMap
        this.scene.environment = environmentMap

        this.camera.position.set(6, 4, 8)

        this.ambientLight = new THREE.AmbientLight()
        this.ambientLight.intensity = 0.4
        this.scene.add(this.ambientLight)

        this.sun = new THREE.DirectionalLight('#ffffff', 3)
        this.sun.castShadow = true
        this.sun.shadow.camera.far = 15
        this.sun.shadow.mapSize.set(1024, 1024)
        this.sun.shadow.normalBias = 0.05
        this.sun.position.set(3.5, 2, -1.25)
        this.scene.add(this.sun)

        this.sunHelper = new THREE.DirectionalLightHelper(this.sun)
        this.scene.add(this.sunHelper)
        this.sunHelper.visible = false
        this.gui.add(this.sunHelper, "visible").name("Sun Helper")

        this.axes = new THREE.AxesHelper(100)
        this.scene.add(this.axes)

        this.rubiksCube = new RubiksCube(this.scene)

        window.app = this
    }

}

const app = new App()