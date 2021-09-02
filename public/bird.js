/*

-Physics
-Brain

 */

class Bird {
    constructor(x, y, r, g) {
        this.x = x
        this.y = y
        this.r = r
        this.s = 0
        this.score = 0
        this.col = [random(255), random(255), random(255)]
        this.j = 0
        this.maxS = 22
        this.shape = 1
        this.brainInit()
    }
    brainInit() {
        let as = [],
            bs = [],
            n
        this.brain = tf.sequential({
            layers: [tf.layers.dense({
                    inputShape: [this.shape],
                    units: this.shape,
                    activation: 'relu'
                }),
                tf.layers.dense({
                    units: 25,
                    activation: 'relu'
                }),
                tf.layers.dense({
                    units: 16,
                    activation: 'relu'
                }),
                tf.layers.dense({
                    units: 2,
                    activation: 'softmax'
                })
            ]
        })
        console.log('Model Created')
        const learning_rate = 0.01
        const optimizer = tf.train.sgd(learning_rate)
        this.brain.compile({
            optimizer: optimizer,
            loss: 'meanSquaredError'
        });
        tf.dispose(optimizer)
        console.log('Model Compiled')

        // //this.learnFromHist(n, as, bs)

        this.learnFromData()

    }

    learnFromData() {
        let xs = [],
            ys = [],
            n = 100000
        for (let i = 0; i < n; i++) {
            let y_val = random(height)
            xs.push(y_val)
            let action = y_val > height / 2 ? 1 : 0
            ys.push([action, action == 1 ? 0 : 1])
        }
        // tf.tidy(() => {
            const tfxs = tf.tensor2d(xs, [n, 1]),
                tfys = tf.tensor2d(ys, [n, 2])

            this.brain.fit(tfxs, tfys, {
                epochs: 10,
            })
        // })
        // tf.dispose(tfxs)
        // tf.dispose(tfys)

        console.log('Model Trained!')
    }

    learnFromHist(n, as, bs) {
        n = maxH.length
        for (let i = 0; i < n; i++) {
            as.push(maxH[i][0])
            bs.push(maxH[i][1])
        }
        hstr2.push(hstr)

        const xs = tf.tensor2d(as, [n, this.shape]),
            ys = tf.tensor2d(bs, [n, 2])
        this.brain.fit(xs, ys, {
            epochs: 5,
            batchSize: 32,
            callback: {
                onBatchEnd
            }
        })
        console.log('Model Trained')
        // tf.dispose(xs)
        // tf.dispose(ys)
    }


    move() {

        if (o) {
            // hstr.push([
            //     [abs(this.s / (this.maxS)), this.y],
            //     [this.j, this.j == 1 ? 0 : 1]
            // ])
        } else {
            // tf.tidy(() => { // let xs = [abs(this.s / (this.maxS)), this.y]
                let pred = this.brain.predict(tf.tensor2d([this.y], [1, this.shape]))
                let guess = pred.dataSync()
                if (guess[0] > guess[1]) b.jump()
            // })
        }

        this.s = max(this.s + gravity, -1 * this.maxS)
        this.y += this.s
        if ((this.y > height - this.r || this.y < this.r) ||
            (walls.length > 2 && (this.hits(walls[0]) || this.hits(walls[1])))) {
            reset()
            // console.log('score: ', scores)
        } //dead
        this.j = 0
    }


    hits(wall) {
        if (this.x + this.r / 2 >= wall.x &&
            this.x + this.r / 2 <= wall.x + wall.w &&
            (this.y + this.r / 2 >= wall.y ||
                this.y + this.r / 2 <= wall.t)) return true

        if ((this.x >= wall.x && this.x <= wall.x + wall.w) &&
            (this.y + this.r / 2 >= wall.y ||
                this.y + (-this.r / 2) <= wall.t)) return true
        return false
    }

    jump() {
        this.s -= 18
        this.j = 1
    }

    show() {
        fill(this.col[0], this.col[1], this.col[2])
        ellipse(this.x, this.y, this.r, this.r)
    }
}