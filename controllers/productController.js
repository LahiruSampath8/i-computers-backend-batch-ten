
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){
    // if (req.user == null){
    //     res.staus(401).json({
    //         message : "You need login first"
    //     })
    //     return
    // }

    // if(!req.user.isAdmin){
    //     res.status(403).json({
    //         message : "You don't have permission to perform this action"
    //     })
    //     return
    // }

    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access denied. Admin only"
        })
        return
    }
    try{
        const existingProduct = await Product.findOne({
            productId : req.body.productId
        })

        if(existingProduct != null){
            res.status(400).json({
                message : "Product with this productID already exists"
            })
            return
        }

        const newProduct = new Product({
			productId: req.body.productId,
			name: req.body.name,
			altNames: req.body.altNames,
			price: req.body.price,
			labelledPrice: req.body.labelledPrice,
			description: req.body.description,
			images: req.body.images,
			brand: req.body.brand,
			model: req.body.model,
			category: req.body.category,
			stock: req.body.stock,
            isAvailable: req.body.isAvailable

        })

        await newProduct.save()

        res.status(201).json({
            message : "Product created successfully"
        })

}catch(error){
    console.log(error)
    res.status(500).json({
        message : "Error Creating product",
        //error: error.message
    })
}
}

export async function getAllProducts(req,res){
    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products);
        }else{
            const products =await Product.find({isAvailable:true})
            res.json(products);
        }

    }catch(error){
        res.status(500).json({
            message : "Error fetching products"
        })
    }

}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access denied. Admin only"
        })
        return
    }

    try{

        await Product.deleteOne({
            productId:req.params.productId
        })

        res.status(201).json({
            message : "Product deleted  successfully"
        })
    }catch(error){
        res.status(500).json({
            message : "Error deleting product"
        })
    }
}

export async function updateProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access denied. Admin only"
        })
        return;
    }

    try{

        await Product.updateOne({
            productId:req.params.productId
        },{
            
			name: req.body.name,
			altNames: req.body.altNames,
			price: req.body.price,
			labelledPrice: req.body.labelledPrice,
			description: req.body.description,
			images: req.body.images,
			brand: req.body.brand,
			model: req.body.model,
			category: req.body.category,
			stock: req.body.stock,
            isAvailable: req.body.isAvailable
        }
    )
 
        res.json({
            message : "Product Updated Successfully"
        })


    }catch(error){
        res.status(500).json({
            message : "Error updating product"
        });

    }     
}

export async function getProductByID(req,res){
    try{
        const product = await Product.findOne({
            productId : req.params.productId
        })

        if (product==null){
            res.status(404).json({
                message : "Product not found"
            })
        }else{
            if(product.isAvailable){
                res.json(product)
            }else{
                if(isAdmin(req)){
                    res.json(product)
                }else{
                    res.json({
                        message : "Access denied. Admin only "
                    })
                }
            }

        }


    }catch(error){
        res.status(500).json({
            message : "Error fetching product"
        });

    } 

}


