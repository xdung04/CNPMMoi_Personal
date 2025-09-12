import express from "express";
import { register, login, getMyAccount } from "../controllers/userController.js";
import { seedData } from "../controllers/seedController.js";
import { listProducts, searchProducts } from "../controllers/productController.js";
import { listCategories } from "../controllers/categoryController.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/account", getMyAccount);

router.get("/products", listProducts);
router.get("/seed", seedData);
router.get("/categories", listCategories);
router.get("/products/search", searchProducts);



export default router;
