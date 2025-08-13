import prisma from '../db'

// get one update
export const getUpdate = async (req, res) => {

    const id = req.params.id
     
    const update = await prisma.update.findFirst({
        where: {
            id
        }
    })

    res.json({data: update})
}



// Get all updates
export const getUpdates = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.product.id
        },
        include: {
            updates: true
        }
    })

    res.json({data: product.updates})
}


export const createUpdate = async (req, res) => {
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            productId: req.user.id

        }
    })

    res.json({data: update})
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