"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET /', () => {
    it('should send back some data', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/');
        expect(res.body.message).toBe('Hello');
    });
});
//# sourceMappingURL=routes.test.js.map