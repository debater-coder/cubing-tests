import './style.css'
import Experience from "./Experience";
import * as THREE from 'three'
import RubiksCube from "./RubiksCube/RubiksCube";

THREE.Object3D.prototype.rotateAroundWorldAxis = function() {

    // rotate object around axis in world space (the axis passes through point)
    // axis is assumed to be normalized
    // assumes object does not have a rotated parent

    let q = new THREE.Quaternion();

    return function rotateAroundWorldAxis( point, axis, angle ) {

        q.setFromAxisAngle( axis, angle );

        this.applyQuaternion( q );

        this.position.sub( point );
        this.position.applyQuaternion( q );
        this.position.add( point );

        return this;

    }

}();

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
        environmentMap.encoding = THREE.sRGBEncoding
        // this.scene.background = environmentMap
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

        this.rubiksCube = new RubiksCube(this.scene, 3, true)

        window.app = this
        window.THREE = THREE

        this.updateAllMaterials()
    }

    updateAllMaterials() {
        this.scene.traverse((child) => {
            console.log(child)
        })
    }

}

const app = new App()