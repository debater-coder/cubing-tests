import * as THREE from "three";

export default class Renderer {
    constructor(resizer, canvas) {
        this.resizer = resizer
        this.instance = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        })
        this.instance.setPixelRatio(Math.min(this.resizer.pixelRatio, 2))
        this.instance.setSize(this.resizer.width, this.resizer.height, false)
    }

    resize() {
        this.instance.setSize(this.resizer.width, this.resizer.height, false)
        this.instance.setPixelRatio(Math.min(this.resizer.pixelRatio, 2))
    }

    render(scene, camera) {
        this.instance.render(scene, camera)
    }
}