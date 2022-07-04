import './style.css'
import Experience from "./Experience";
import * as THREE from 'three'

class App extends Experience {

    constructor() {
        // Setup
        super({
            canvas: document.querySelector('canvas.webgl')
        });
        this.renderer.instance.setClearColor("#211d20")

        this.camera.position.set(6, 4, 8)

        this.sun = new THREE.DirectionalLight('#ffffff', 1)
        this.sun.castShadow = true
        this.sun.shadow.camera.far = 15
        this.sun.shadow.mapSize.set(1024, 1024)
        this.sun.shadow.normalBias = 0.05
        this.sun.position.set(3.5, 2, - 1.25)
        this.sun.position.set(3.5, 2, -1.25)
        this.scene.add(this.sun)

        this.floor = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )
        this.floor.rotation.x = -Math.PI / 2
        this.scene.add(this.floor)
    }

}

const app = new App()