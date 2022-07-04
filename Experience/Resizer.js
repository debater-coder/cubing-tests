export default class Resizer {
    constructor(callback, canvas) {
        this.canvas = canvas
        this.width = canvas.clientWidth
        this.height = canvas.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        window.addEventListener('resize', callback)
    }

    resize() {
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        console.log(this.canvas)
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }
}