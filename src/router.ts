import { Router } from 'express'
import {body } from "express-validator"
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update'

const router = Router()


// Product
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product/', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)


// Update
// NOTE: you would probably move the fields in a separate file and import it in to make it neater
router.get('/update', getUpdates)
router.get('/update/:id', getUpdate)
router.put('/update/:id',
    body('title').optional() , 
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate)
router.post('/update/',
    body('title').exists() , 
    body('body').exists(), 
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)


// Update Point

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id',
    body('name').optional().isString(), 
    body('description').optional().isString(), (req, res) => {
})
router.post('/updatepoint/',
    body('name').optional().isString(), 
    body('description').optional().isString(),
    body('updateId').exists().isString(), () => {})
router.delete('/updatepoint/:id', () => {})

export default router 