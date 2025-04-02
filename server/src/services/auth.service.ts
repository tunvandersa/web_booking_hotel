import { AppDataSource } from "@databases/data.source";
import { Users } from "@entities/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(Users);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
        const user = await userRepository.findOne({ where: { id: decoded.id } });
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
