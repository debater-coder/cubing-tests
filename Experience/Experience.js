import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'lil-gui'
import Stats from 'stats.js'

import Resizer from "./Resizer";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Time";

export default class Experience {
    constructor({ canvas, fov=35, useOrbitControls=true }) {
        // Options
        this.canvas = canvas
        this.fov = fov
        this.useOrbitControls = useOrbitControls

        // Binding
        this.resize = this.resize.bind(this)
        this.update = this.update.bind(this)

        // Stats
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)

        // Sizing
        this.resizer = new Resizer(this.resize, canvas)

        // Time
        this.time = new Time(this.update)

        // Scene
        this.scene = new THREE.Scene()

        // Camera
        this._camera = new Camera(this.resizer, this.fov, this.useOrbitControls, this.scene, this.canvas)
        this.camera = this._camera.instance

        // Renderer
        this.renderer = new Renderer(this.resizer, this.canvas)

        // Debug
        this.gui = new dat.GUI()
    }

    resize() {
        this.resizer.resize()
        this._camera.resize()
        this.renderer.resize()
    }

    update() {
        // Start stats monitoring
        this.stats.begin()

        this.time.update()
        this._camera.update()
        this.renderer.render(this.scene, this.camera)

        // End stats monitoring
        this.stats.end()
    }
}