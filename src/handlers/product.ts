import prisma from '../db'

// get one product
export const getProduct = async (req, res) => {

    const id = req.params.id
     
    // findFirst product that matches this name
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({data: product})
}



// Get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({data: user.products})
}


export const createProduct = async (req, res, next) => {

    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
    
            }
        }) 
        res.json({data: product})
    } catch (e) {
        next(e)
    }
}


export const updateProduct = async ( req, res ) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }, 
        data: {
            name: req.body.name
        }
    })
    res.json({data: updated})

}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete( {
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })

    res.json({data: deleted})
}