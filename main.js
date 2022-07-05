import './style.css'
import Experience from "./Experience";
import * as THREE from 'three'
import {Mesh} from "three";

class App extends Experience {

    constructor() {
        // Setup
        super({
            canvas: document.querySelector('canvas.webgl')
        });
        this.renderer.instance.setClearColor("#211d20")

        this.camera.position.set(6, 4, 8)

        this.ambientLight = new THREE.AmbientLight()
        this.scene.add(this.ambientLight)

        // this.sun = new THREE.DirectionalLight('#ffffff', 1)
        // this.sun.castShadow = true
        // this.sun.shadow.camera.far = 15
        // this.sun.shadow.mapSize.set(1024, 1024)
        // this.sun.shadow.normalBias = 0.05
        // this.sun.position.set(3.5, 2, -1.25)
        // this.scene.add(this.sun)

        this.axes = new THREE.AxesHelper(5)
        this.scene.add(this.axes)

        this.stickerGeometry = new THREE.PlaneGeometry()
        this.stickerMaterialWhite = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "#e5e1e0" })
        this.stickerMaterialGreen = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "#7dfe7b" })
        this.stickerMaterialYellow = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "#e9f03d" })
        this.stickerMaterialBlue = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "#4c9fee" })
        this.stickerMaterialRed = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "#c5200e" })
        this.stickerMaterialOrange = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "#f67700" })

    }

    createSticker(geometry, material, group, axis, position) {
        const stickerMesh = new Mesh(geometry, material)
        switch (axis) {
            case "X":
                stickerMesh.rotation.y = Math.PI / 2
                break
            case "Y":
                stickerMesh.rotation.x = Math.PI / 2
                break
            case "Z":
                break
            default:
                throw new Error(`Invalid axis: ${axis}`)
        }
        stickerMesh.position.set(...position)

        group.add(stickerMesh)
        return stickerMesh
    }

    createCenterPiece(geometry, material, group, face) {
        let axis, position;
        switch (face) {
            case "F":
                axis = "Z"
                position = [0, 0, 1.5]
                break
            case "R":
                axis = "X"
                position = [1.5, 0, 0]
                break
            case "U":
                axis = "Y"
                position = [0, 1.5, 0]
                break
            case "B":
                axis = "Z"
                position = [0, 0, -1.5]
                break
            case "L":
                axis = "X"
                position = [-1.5, 0, 0]
                break
            case "D":
                axis = "Y"
                position = [0, -1.5, 0]
                break
            default:
                throw new Error(`Invalid face: ${face}`)
        }

        return this.createSticker(geometry, material, group, axis, position)

    }

}

const app = new App()