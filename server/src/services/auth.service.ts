import { AppDataSource } from "@databases/data.source";
import { Users } from "@entities/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const userRepository = AppDataSource.getRepository(Users);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email: string, name: string, token: string) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Xác thực email đăng ký',
    html: `
      <h1>Xin chào ${name}!</h1>
      <p>Vui lòng nhấp vào liên kết sau để xác thực email của bạn:</p>
      <a href="${verificationLink}">Xác thực email</a>
    `
  });
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

        await userRepository.save(user);

        const accessToken = this.generateToken(user);
        return { user: this.sanitizeUser(user), accessToken };
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
