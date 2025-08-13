"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createUpdate = exports.getUpdates = exports.getUpdate = void 0;
const db_1 = __importDefault(require("../db"));
// get one update
const getUpdate = async (req, res) => {
    const id = req.params.id;
    const update = await db_1.default.update.findFirst({
        where: {
            id
        }
    });
    res.json({ data: update });
};
exports.getUpdate = getUpdate;
// Get all updates
const getUpdates = async (req, res) => {
    const product = await db_1.default.product.findUnique({
        where: {
            id: req.product.id
        },
        include: {
            updates: true
        }
    });
    res.json({ data: product.updates });
};
exports.getUpdates = getUpdates;
const createUpdate = async (req, res) => {
    const update = await db_1.default.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            productId: req.user.id
        }
    });
    res.json({ data: update });
};
exports.createUpdate = createUpdate;
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
//# sourceMappingURL=point.js.map