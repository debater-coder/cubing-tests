import * as THREE from "three";

export default class RubiksCube {
    constructor(group, dimension = 3, renderInternalFaces = false, gaps = 0.9) {
        this.materials = {
            white: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#e5e1e0",
                side: THREE.DoubleSide
            }),
            green: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#00dd00",
                side: THREE.DoubleSide
            }),
            yellow: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#ffff00",
                side: THREE.DoubleSide
            }),
            blue: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#0000ff",
                side: THREE.DoubleSide
            }),
            orange: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#ff6400",
                side: THREE.DoubleSide
            }),
            red: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#ff0000",
                side: THREE.DoubleSide
            }),
            black: new THREE.MeshStandardMaterial({
                roughness: 0.1,
                metalness: 0.2,
                color: "#000000",
                side: THREE.DoubleSide
            }),
        }
        this.gaps = gaps
        this.dimension = dimension

        this.renderInternalFaces = renderInternalFaces

        this.cubies = []

        this.group = new THREE.Group()
        group.add(this.group)


        this.createCubies()
    }

    createCubies() {
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                for (let k = 0; k < this.dimension; k++) {
                    const onFaceX = i === this.dimension - 1 || i === 0;
                    const onFaceY = j === this.dimension - 1 || j === 0;
                    const onFaceZ = k === this.dimension - 1 || k === 0;

                    if (onFaceX || onFaceY || onFaceZ) {
                        const facesOn = onFaceX + onFaceY + onFaceZ
                        let type = ""

                        switch (facesOn) {
                            case 1:
                                type = "center"
                                break
                            case 2:
                                type = "edge"
                                break
                            case 3:
                                type = "corner"
                                break
                        }

                        const cubie = new THREE.Mesh(
                            new THREE.BoxGeometry(),
                            [
                                i === this.dimension - 1 ? this.materials.red : (this.renderInternalFaces ? this.materials.black : null),
                                i === 0 ? this.materials.orange : (this.renderInternalFaces ? this.materials.black : null),
                                j === this.dimension - 1 ? this.materials.white : (this.renderInternalFaces ? this.materials.black : null),
                                j === 0 ? this.materials.yellow : (this.renderInternalFaces ? this.materials.black : null),
                                k === this.dimension - 1 ? this.materials.green : (this.renderInternalFaces ? this.materials.black : null),
                                k === 0 ? this.materials.blue : (this.renderInternalFaces ? this.materials.black : null),
                            ]
                        )
                        cubie.scale.set(this.gaps, this.gaps, this.gaps)
                        cubie.position.set(
                            i - (this.dimension - 1) / 2,
                            j - (this.dimension - 1) / 2,
                            k - (this.dimension - 1) / 2
                        )
                        this.group.add(cubie)
                        this.cubies.push({
                            mesh: cubie,
                            position: [i, j, k],
                            type
                        })
                    }
                }
            }
        }
    }
}