import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
    constructor(resizer, fov, useOrbitControls, scene, canvas) {
        this.resizer = resizer

        this.instance = new THREE.PerspectiveCamera(fov, resizer.width / resizer.height, 0.1, 100)
        scene.add(this.instance)
        if (useOrbitControls) {
            this.controls = new OrbitControls(this.instance, canvas)
            this.controls.enableDamping = true
        }
    }

    resize() {
        this.instance.aspect = this.resizer.width / this.resizer.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if (this.controls) {
            this.controls.update()
        }
    }
}