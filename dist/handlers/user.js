"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.createNewUser = void 0;
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../modules/auth");
const createNewUser = async (req, res, next) => {
    // shouldn't really try catch two asynchronous operations
    try {
        const user = await db_1.default.user.create({
            data: {
                username: req.body.username,
                password: await (0, auth_1.hashPassword)(req.body.password)
            }
        });
        const token = (0, auth_1.createJWT)(user);
        res.json({ token });
    }
    catch (e) {
        // in reality you would wanna inspect e what type of error it is e.g. if it actually is a input failure or if its a 
        // db error
        e.type = 'input';
        next(e);
    }
};
exports.createNewUser = createNewUser;
const signIn = async (req, res) => {
    const user = await db_1.default.user.findUnique({
        where: {
            username: req.body.username,
        }
    });
    const isValid = await (0, auth_1.comparePasswords)(req.body.password, user.password);
    if (!isValid) {
        res.status(401);
        res.json({ message: 'nope' });
        return;
    }
    const token = (0, auth_1.createJWT)(user);
    res.json({ token });
};
exports.signIn = signIn;
//# sourceMappingURL=user.js.map