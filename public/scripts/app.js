"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/gpt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json(callGPT());
}));
app.get("/", (req, res) => {
    // Send the HTML file
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.get("/data", (req, res) => {
    // Send additional JSON data
    const message = "Hello World!";
    res.json({ message });
});
app.listen(port, () => {
    // console.log(`Server listening at http://localhost:${port}`);
});
