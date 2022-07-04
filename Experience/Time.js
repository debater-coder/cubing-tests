export default class Time {
    constructor(callback) {
        this._update = this._update.bind(this)
        this.callback = callback

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        window.requestAnimationFrame(this._update)
    }

    _update() {
        this.callback()
        window.requestAnimationFrame(this._update)
    }

    update() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
    }
}