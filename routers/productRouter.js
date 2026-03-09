import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct } from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.get("/",getAllProducts)
productRouter.post("/",createProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/:productId",getProductByID)
productRouter.get("/search",()=>{
    console.log("Search API")
})

export default productRouter;