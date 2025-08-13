"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProduct = void 0;
const db_1 = __importDefault(require("../db"));
// get one product
const getProduct = async (req, res) => {
    const id = req.params.id;
    // findFirst product that matches this name
    const product = await db_1.default.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    });
    res.json({ data: product });
};
exports.getProduct = getProduct;
// Get all products
const getProducts = async (req, res) => {
    const user = await db_1.default.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    });
    res.json({ data: user.products });
};
exports.getProducts = getProducts;
const createProduct = async (req, res, next) => {
    try {
        const product = await db_1.default.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });
        res.json({ data: product });
    }
    catch (e) {
        next(e);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const updated = await db_1.default.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });
    res.json({ data: updated });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const deleted = await db_1.default.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    });
    res.json({ data: deleted });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map