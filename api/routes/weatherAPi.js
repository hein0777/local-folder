const express = require('express')
const axios = require('axios')
const router = express.Router();

router.get('/',async(req,res,next)=>{
    const result = await axios.get("https://api.openweathermap.org/data/2.5/weather?units=metric&q=pyay&appid=aca0bb32cae2d034ae52c199ab82f37b");
    let weather = result.data;
    res.json(weather);

})
module.exports = router