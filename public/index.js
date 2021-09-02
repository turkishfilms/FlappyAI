/* 

FLappy bird

TODO
make the game
Refine corner collision


make the ai
nn
ga


TODONE
create bird 
create wall



*/

let k, o = true,
    hstr = [],
    hstr2 = []

let maxH = [
        [
            [0,0,],
            [0,0]
        ]
    ],
    r = false

let walls = [],
    scores = 0,
    gravity = 0.6,
    score = 0,
    b,
    paused = true

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20)
    background(155, 155, 160)
    b = new Bird(50, height / 2, 30)
    // console.log('SUP')`
    // k = new PolicyAgent()
}

function keyPressed() {
    switch (key) {
        case ' ':
            b.jump()
            break;
        case 'p':
            paused = paused ? false : true;
            break;
        case 'o':
            o = o ? false : true;
            break;
        case 'r':
            r = r ? false : true;
            break;
        case 's':
            b.brain.save('downloads://my-model')
            break;
    }
}

function reset() {
    // if (o) {
    //save the brain no Retraining
    maxH = hstr.length > maxH.length ? hstr : maxH
    scores = score
    score = 0
    walls = []
    // b.brain.dispose()
    b = new Bird(50, height / 2, 30)
    // } else {
    //     b.y = height / 2
    //     b.s = 0
    //     scores = score
    //     score = 0
    // }
}

function spawnWall(){
    console.log('walls incoming')
    if (frameCount % 50 == 0) walls.push(new Wall(
        width,
        random(height * 0.33, height * 0.9),
        random(10, 100),
        random(height / 4, height / 3)))
}

function draw() {
    if (r && b.y > height / 2) b.jump()
    if (!paused) {
        background(155, 155, 160)
        for (let i = walls.length - 1; i > -1; i--) walls[i].show();
        b.move()
        b.show()
        // spawnWall()
    }
    strokeWeight(3)
    textSize(24)

    if (o) text('human', width - 75, 25)
    else text('bot', width - 60, 25)
    textSize(50)
    stroke(0, 0, 0)
    text(scores, width / 2, height - 40)
    // console.log(tf.memory().numTensors)
}