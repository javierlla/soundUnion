import { Router } from "express";
import authApiController from "../../controllers/auth/authAPIController";


const router = Router();


router.post("/register",authApiController.register);
router.post("/login",authApiController.login);


export default router;