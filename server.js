const express = require('express'),
cors = require('cors')
    app = express(),
    p = 3000
app.use(express.static('public'))



app.listen(3000, () => console.log(`${p} Little Poop Boi`))