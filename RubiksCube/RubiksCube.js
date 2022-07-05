import * as THREE from "three";

export default class RubiksCube {
    constructor(group, dimension = 3) {
        this.materials = {
            white:  new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: "#e5e1e0", side: THREE.DoubleSide}),
            green:  new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: "#00dd00", side: THREE.DoubleSide}),
            yellow: new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: "#ffff00", side: THREE.DoubleSide}),
            blue:   new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: "#0000ff", side: THREE.DoubleSide}),
            orange: new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: "#ff6400", side: THREE.DoubleSide}),
            red:    new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: "#ff0000", side: THREE.DoubleSide}),
        }

        this.dimension = dimension

        this.group = new THREE.Group()
        group.add(this.group)

        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                for (let k = 0; k < dimension; k++) {
                    const cubie = new THREE.Mesh(
                        new THREE.BoxGeometry(),
                        [
                            this.materials.red,
                            this.materials.orange,
                            this.materials.white,
                            this.materials.yellow,
                            this.materials.green,
                            this.materials.blue,
                        ]
                    )
                    cubie.scale.set(0.9, 0.9, 0.9)
                    cubie.position.set(i - (this.dimension - 1) / 2, j - (this.dimension - 1) / 2, k - (this.dimension - 1) / 2)
                    this.group.add(cubie)
                }
            }
        }
    }
}