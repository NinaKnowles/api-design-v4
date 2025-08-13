"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUpdate = exports.updateUpdate = exports.createUpdate = exports.getUpdates = exports.getUpdate = void 0;
const db_1 = __importDefault(require("../db"));
// get one update
const getUpdate = async (req, res) => {
    const update = await db_1.default.update.findFirst({
        where: {
            id: req.params.id,
        }
    });
    res.json({ data: update });
};
exports.getUpdate = getUpdate;
// Get all updates
const getUpdates = async (req, res) => {
    const products = await db_1.default.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });
    //one of the disadvantages of using REST is below, ideally you want the database to do this for you. Ideally we should update the
    // schema so we don't need to do the flatmap below
    const updates = products.flatMap(product => product.updates);
    res.json({ data: updates });
};
exports.getUpdates = getUpdates;
const createUpdate = async (req, res) => {
    const product = await db_1.default.product.findUnique({
        where: {
            id: req.body.productId
        }
    });
    if (!product) {
        res.json({ message: 'nope' });
    }
    const update = await db_1.default.update.create({
        data: req.body
    });
    res.json({ data: update });
};
exports.createUpdate = createUpdate;
// Better way to do it
// export const updateUpdate = async (req, res) => {
//     try {
//       const updatedUpdate = await prisma.update.update({
//         where: {
//           // Ensure the update belongs to a product owned by the current user
//           id: req.params.id,
//           product: {
//             belongsToId: req.user.id
//           }
//         },
//         data: req.body,
//       });
//       res.json({ data: updatedUpdate });
//     } catch (error) {
//       if (error.code === 'P2025') {
//         // Prisma "record not found" error
//         return res.status(404).json({ message: 'Update not found' });
//       }
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   };
const updateUpdate = async (req, res) => {
    // Not an ideal way of doing this 
    const products = await db_1.default.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    });
    const updates = products.flatMap(product => product.updates);
    const match = updates.find(update => update.id === req.params.id);
    if (!match) {
        return res.json({ message: 'nope' });
    }
    const updatedUpdate = await db_1.default.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });
    res.json({ data: updatedUpdate });
};
exports.updateUpdate = updateUpdate;
const deleteUpdate = async (req, res) => {
    // Not an ideal way of doing this 
    const products = await db_1.default.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    });
    const updates = products.flatMap(product => product.updates);
    const match = updates.find(update => update.id === req.params.id);
    if (!match) {
        return res.json({ message: 'nope' });
    }
    const deleted = await db_1.default.update.delete({
        where: {
            id: req.params.id
        }
    });
    res.json({ data: deleted });
};
exports.deleteUpdate = deleteUpdate;
//# sourceMappingURL=update.js.map