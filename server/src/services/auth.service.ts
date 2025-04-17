import { AppDataSource } from "@databases/data.source";
import { Users } from "@entities/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
require('dotenv').config();

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const userRepository = AppDataSource.getRepository(Users);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const sendVerificationEmail = async (email: string, name: string, token: string) => {
    console.log(email, name);
    try {

      
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
      console.log("verificationLink", verificationLink);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Xác thực email đăng ký',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h1 style="color: #333; text-align: center;">Xin chào ${name}!</h1>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấp vào liên kết dưới đây để xác thực email của bạn:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="background-color: #F2A900; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Xác thực email</a>
            </div>
            <p style="font-size: 14px; color: #777; margin-top: 30px;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
            <p style="font-size: 14px; color: #777;">Liên kết này sẽ hết hạn sau 24 giờ.</p>
          </div>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email đã được gửi: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Lỗi khi gửi email xác thực:', error);
      return false;
    }
  };

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
export class AuthService {

    async register(userData: User) {
       
        const existingUser = await userRepository.findOne({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new Error('Email đã tồn tại');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new Users();
        user.email = userData.email;
        user.passwordHash = hashedPassword;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.phoneNumber = userData.phone;
        user.isVerified = false;
        await userRepository.save(user);

        const accessToken = this.generateToken(user);

        await sendVerificationEmail(user.email, user.firstName, accessToken);
        return { user: this.sanitizeUser(user), accessToken };
    }

    public async verifyEmail(token: string) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        console.log("decoded", decoded);
        const user = await userRepository.findOne({ where: { id: Number(decoded.id) } });
        if(!user) {
            throw new Error("User not found");
        }
        user.isVerified = true;
        await userRepository.save(user);
        console.log("user", user);
        return { user: this.sanitizeUser(user), token };
      } catch (error) {
        throw new Error("Invalid token");
      }
    }


    async login(email: string, password: string) {
        const user = await userRepository.findOne({
            where: { email }
        });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new Error('Email hoặc mật khẩu không đúng');
        }
        const accessToken = this.generateToken(user);
        return { user: this.sanitizeUser(user), accessToken };
    }

    public async getUserInfor(token: string) {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        const user = await userRepository.findOne({ where: { id: Number(decoded.id) } });
        if(!user) {
            throw new Error("User not found");
        }else{
            return this.sanitizeUser(user);
        }
    }
    private generateToken(user: Users) {
        return jwt.sign(
            { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '12h' }
        );
    }

    private sanitizeUser(user: Users) {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }


}
export default AuthService;
