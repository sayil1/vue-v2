const router = require("express").Router();
const eventsModel = require("../models/eventsModel");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'sayil',
    api_key: '443611676341187',
    api_secret: 'wAPlHaXu39fxiKuBr9ZN4Gp6IxA'
});



router.post("/allEvents", multipartMiddleware, async function (req, res) {
    let imagePath;
    let x = await cloudinary.v2.uploader.upload(
        req.files.image.path, {
            width: 700,
            overlay: `text:Times_90_bold:${encodeURIComponent(req.body.watermark)}`,
            gravity: "south",
            y: 80,
            color: "white"
        },
        function (error, result) {
            if (error) {
                console.log("error here")
            }
            res.json({
                data: result
            });
            // res.json({
            //     data: result.secure_url
            // });
            imagePath = {
                data: result.secure_url
            };
            console.log(imagePath);

            let newEvents = new eventsModel({
                title: req.body.title,
                description: req.body.description,
                imagesPath: imagePath.data,
                category: req.body.category,
                location: req.body.location,
                venue: req.body.venue,
                start: req.body.date,
                time: req.body.time
            });
            console.log(req.body.date + "  these are the new events");

            newEvents.save(function (err, data) {
                // console.log(data + " undefined?");
                if (err) {
                    console.log("save pls");


                } else {
                    console.log(data)
                    console.log("Data Saved!");
                }
            })

        });
    //console.log(x)


});


router.get("/all", async (req, res) => {
    if (req.body.search) {
        const loc = await req.body.search;
        console.log(req.body.search)
        eventsModel.find({
            location: {
                $regex: loc,
                $options: '$i'
            }
        }, (err, result) => {
            if (err) {
                res.send("An Error Occured!");
                console.log("not seen");
            } else {
                res.send(result);
            }
        }).sort({
            created_date: 'desc'
        })

    } else {
        eventsModel.find((err, result) => {
            if (err) {
                res.send("An Error Occured!");
                console.log("not seen");
            } else {
                res.send(result);
            }
        }).sort({
            created_date: 'desc'
        })

    }



})

router.get("/alls", async (req, res) => {
    // console.log("Get working!");
    eventsModel.find().count(function (err, count) {
        console.log("Number of docs: ", count);
    });
})




router.get("/findone/:id", (req, res) => {
    eventsModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.send("An Error Occured!");
            console.log("error:");
        } else {
            res.send(result);
            console.log("sent ");
        }
    })
})


router.get("/findel/:id", (req, res) => {
    eventsModel.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) res.send("An Error Occured!");

        const message = {
            message: "deleted",
            id: result._id
        };
        res.send(result + "this document has been deleted");
        console.log("sent ");

    })
})

// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
//     // As always, handle any potential errors:
//     if (err) return res.status(500).send(err);
//     // We'll create a simple object to send back with a message and the id of the document that was removed
//     // You can really do this however you want, though.
//     const response = {
//         message: "Todo successfully deleted",
//         id: todo._id
//     };
//     return res.status(200).send(response);
// });



module.exports = router;
// router.get("/welcome/:name/: nickname", (req, res) => {
//     console.log(req.params);
//     res.send("Welcome to Projaro " + req.params.name + ".Your Nick Name is " + req.params.nickname);
// })