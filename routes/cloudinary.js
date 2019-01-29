const router = require("express").Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'sayil',
    api_key: '443611676341187',
    api_secret: 'wAPlHaXu39fxiKuBr9ZN4Gp6IxA'
});


router.post('/upload', multipartMiddleware, async function (req, res) {
    console.log("loadingggggg    dddd");
    if (!req.file) return res.send('Please upload a file')
    let x = await cloudinary.v2.uploader.upload(
        req.files.image.path, {
            width: 700,
            overlay: `text:Times_90_bold:${encodeURIComponent(req.body.watermark)}`,
            gravity: "south",
            y: 80,
            color: "#FFFF0080"
        },
        function (error, result) {
            if (error) {
                console.log("error here")
            }
            res.json({
                data: result
            }); console.log({data: result.url})
            
        }); console.log({fig: x})
}); 

router.get("/all", (req, res) => {
    // console.log("Get working!");
    res.send("work work work ");
})


module.exports = router;