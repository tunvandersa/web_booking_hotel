import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookings } from "./Bookings";

@Index("booking_id", ["bookingId"], {})
@Entity("payments", { schema: "db_hotel_booking" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "booking_id", comment: "ID đặt phòng" })
  bookingId?: string;

  @Column("decimal", {
    name: "amount",
    comment: "Số tiền",
    precision: 10,
    scale: 2,
  })
  amount?: string;

  @Column("enum", {
    name: "payment_method",
    comment: "Phương thức: Thẻ tín dụng, Thẻ ghi nợ, PayPal, Chuyển khoản",
    enum: ["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "BANK_TRANSFER"],
  })
  paymentMethod?: "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL" | "BANK_TRANSFER";

  @Column("enum", {
    name: "status",
    comment: "Trạng thái: Chờ xử lý, Hoàn thành, Thất bại, Hoàn tiền",
    enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
    default:'PENDING',
  })
  status?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

  @Column("varchar", {
    name: "transaction_id",
    nullable: true,
    comment: "Mã giao dịch",
    length: 100,
  })
  transactionId?: string | null;

  @Column("timestamp", {
    name: "payment_date",
    nullable: true,
    comment: "Ngày thanh toán",
    default: () => "CURRENT_TIMESTAMP",
  })
  paymentDate?: Date | null;

  @ManyToOne(() => Bookings, (bookings) => bookings.payments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "booking_id", referencedColumnName: "id" }])
  booking?: Bookings;
}
