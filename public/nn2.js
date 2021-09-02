/*


*/
let brain = tf.sequential({
        layers: [
            tf.layers.dense({
                inputShape: [10],
                units: 15,
                activation: 'sigmoid'
            }),
            tf.layers.dense({
                units: 25,
                activation: 'sigmoid'
            }),
            tf.layers.dense({
                units: 1,
                activation: 'sigmoid'
            })
        ]
    }),
    xs = tf.randomUniform([500, 10]),
    ys = tf.tensorUniform([500, 1])

brain.compile({
    optimizer: 'sgd',
    loss: 'meanSquaredError',
    metrics: ['accuracy']
});

brain.fit(xs,ys).then(data => {console.log('acc',logs.acc)})