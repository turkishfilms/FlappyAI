class Wall {
    constructor(x, y, w, g, s) {
        this.x = x
        this.y = y
        this.w = w
        this.g = 0
        this.h = height - this.y
        this.c = [random(255), random(255), random(255)]
        this.t = height - (this.h + g)
        this.s = s || 5
    }

    show() {
        fill(this.c[0], this.c[1], this.c[2])
        rect(this.x, this.y, this.w, this.h)
        rect(this.x, 0, this.w, this.t)
        this.x -= this.s
        if (this.x < -this.w) {
            walls.splice(0, 1)
            scores++
            b.score++
        }

    }
}