import AuthService from "@services/auth.service";
import { Request, Response } from "express";
import { access } from "fs";
import jwt from 'jsonwebtoken';


class AuthController {
    private authService: AuthService;

    constructor( authService: AuthService = new AuthService()) {
        this.authService = authService;
    }

    async register(req: Request, res: Response) {
        try {
            console.log(req.body);
          const result = await this.authService.register(req.body);
           return res.json(result);
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }
      }
    
      async login(req: Request, res: Response) {
        try {
          const { email, password } = req.body;
          console.log(email, password);
          const result = await this.authService.login(email, password);
          console.log("result", result.accessToken);  
          if(result.accessToken){
          res.cookie("accessToken", result.accessToken, {
            httpOnly: true, 
            sameSite: "lax", 
            secure: false,
            maxAge: 12 * 60 * 60 * 1000, 
            path: "/",
        });
      }
          return res.status(200).json({user: result.user});
        } catch (error: any) {
          return res.status(401).json({ message: error.message });
        }
      }
      public async getUserInfor(req: Request, res: Response) {
        try {
            const token = req.cookies.accessToken;
            console.log("token", token);
        if(!token){
            return res.json({message: "Unauthorized"});
        }
        const user = await this.authService.getUserInfor(token);
          return  res.json(user);
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }  
      }
      public async verifyEmail(req: Request, res: Response) {
        try {
            const  token  = req.body.token;
            console.log("token123", token);
            const result = await this.authService.verifyEmail(token);
            return res.json(result);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
      }
}
export default AuthController;
