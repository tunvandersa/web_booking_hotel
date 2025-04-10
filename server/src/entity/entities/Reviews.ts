// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { BookingDetail } from "./BookingDetails";

// @Index("booking_id", ["bookingId"], {})
// @Entity("reviews", { schema: "db_hotel_booking" })
// export class Reviews {
//   @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
//   id?: string;

//   @Column("bigint", { name: "booking_id", comment: "ID đặt phòng" })
//   bookingId?: string;

//   @Column("tinyint", { name: "rating", comment: "Đánh giá (1-5 sao)" })
//   rating?: number;

//   @Column("text", {
//     name: "comment",
//     nullable: true,
//     comment: "Nội dung đánh giá",
//   })
//   comment?: string | null;

//   @Column("timestamp", {
//     name: "created_at",
//     nullable: true,
//     default: () => "CURRENT_TIMESTAMP",
//   })
//   createdAt?: Date | null;

//   @Column("timestamp", {
//     name: "updated_at",
//     nullable: true,
//     default: () => "CURRENT_TIMESTAMP",
//   })
//   updatedAt?: Date | null;

//   @ManyToOne(() => BookingDetail, (bookingDetail) => bookingDetail.reviews, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "booking_id", referencedColumnName: "id" }])
//   bookingDetail?: BookingDetail;
// }
