import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookings } from "./Bookings";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "db_hotel_booking" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", { name: "first_name", comment: "Tên", length: 50 })
  firstName?: string;

  @Column("varchar", { name: "last_name", comment: "Họ", length: 50 })
  lastName?: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    comment: "Email đăng nhập",
    length: 100,
  })
  email?: string;

  @Column("varchar", {
    name: "password_hash",
    comment: "Mật khẩu đã mã hóa",
    length: 255,
  })
  passwordHash!: string ;

  @Column("varchar", {
    name: "phone_number",
    nullable: true,
    comment: "Số điện thoại",
    length: 20,
  })
  phoneNumber?: string | null;

  @Column("text", { name: "address", nullable: true, comment: "Địa chỉ" })
  address?: string | null;

  @Column("enum", {
    name: "role",
    comment: "Vai trò: Khách, Quản trị, Nhân viên",
    enum: ["GUEST", "ADMIN", "MANERGER", "RECEPTIONIST"],
    default:'GUEST',
  })
  role?: "GUEST" | "ADMIN" | "MANERGER" | "RECEPTIONIST";

  @Column("tinyint", {
    name: "is_verified",
    nullable: true,
    comment: "Trạng thái xác thực tài khoản",
    width: 1,
    default: () => "'0'",
  })
  isVerified?: boolean | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    comment: "Thời gian tạo",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    comment: "Thời gian cập nhật",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date | null;

  @OneToMany(() => Bookings, (bookings) => bookings.user)
  bookings?: Bookings[];
}
