let express = require("express")

let app = express();
require("dotenv").config()
app.use(express.json())
let Product = []


app.post('/createproduct', (req, res) => {
    try {
        let obj = (req.body)
        obj.isdeleted = false
        obj.id = Product.length + 1
        Product.push(obj)
        res.status(201).send("Product No : " + obj.id + " Added Like Crazyyy -->")
    } catch (err) {
        res.status(500).send({ msg: err })
    }
})



app.get('/allproduct', (req, res) => {
    try {
        let allprod = Product.filter((val) => {
            return val.isdeleted == false
        })
        res.status(200).send({ msg: "All Products Are Here -->", data: allprod })
    } catch (err) {
        res.status(500).send({ msg: err })
    }
})

app.get("/productsort", (req, res) => {
    try {
        let order = req.query.sort
        let sorted
        if (order == "asc") {
            sorted = Product.sort((a, b) => {
                return a.ProductPrice - b.ProductPrice
            })

        } else if (order == "desc") {
            sorted = Product.sort((a, b) => {
                return b.ProductPrice - a.ProductPrice
            })
        } else {
            res.status(404).send("You Can Give either 'asc' Or 'desc' , Please Give Proper Input.")
        }
        res.send({ sorted })
    } catch (err) {
        res.status(500).send({ msg: err })    }

})


app.put("/updateproduct", (req, res) => {
    try {
        let id = req.query.id
        let obj = req.body
        let prod = Product.find((val) => {
            return val.id == id
        })
        if (prod.isdeleted == true) {
            res.status(404).send("404  Sorry Buddy The Product Is Not Found -->")
        } else {
            prod.ProductName = obj.ProductName ? obj.ProductName : prod.ProductName
            prod.ProductType = obj.ProductType ? obj.ProductType : prod.ProductType
            prod.ProductPrice = obj.ProductPrice ? obj.ProductPrice : prod.ProductPrice
            res.status(200).send({ data: "Updated Prod Is:", data: prod })
        }
    } catch (err) {
        res.status(500).send({ msg: err })
    }

})

app.delete("/deleteproduct", (req, res) => {
    try {
        let id = req.query
        let idx = Product.findIndex((val) => {
            val.id == id
        })

        Product.splice(idx, 1)
        res.status(200).send("Product NO : " + Product.idx + "Is Deleted Like Craaaaizyyyy")
    } catch {
        res.status(500).send({ msg: err })
    }

})

app.put("/softdeleted", (req, res) => {
    try {
        let id = req.query.id
        let idx = Product.findIndex((val) => {
            return val.id == id
        })
        Product[idx].isdeleted = true
        res.status(200).send("Product NO : " + Product[idx].id + " Is Deleted Like Craaaaizyyyy")
    } catch (err) {
        res.status(500).send({ msg: err })
    }
})


app.listen(process.env.PORT, (err) => {
    console.log("server is running on "+ process.env.PORT + " Like Craaaizy")
})