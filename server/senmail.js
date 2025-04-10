const nodemailer = require('nodemailer');
require('dotenv').config();

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Gửi email xác thực cho người dùng
 * @param {string} email - Email của người dùng
 * @param {string} name - Tên của người dùng
 * @param {string} token - Token xác thực
 * @returns {Promise<boolean>} - Kết quả gửi email
 */
const sendVerificationEmail = async (email, name, token) => {
  try {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
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

/**
 * Gửi email đặt lại mật khẩu
 * @param {string} email - Email của người dùng
 * @param {string} name - Tên của người dùng
 * @param {string} token - Token đặt lại mật khẩu
 * @returns {Promise<boolean>} - Kết quả gửi email
 */
const sendPasswordResetEmail = async (email, name, token) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Đặt lại mật khẩu',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #333; text-align: center;">Xin chào ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #F2A900; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Đặt lại mật khẩu</a>
          </div>
          <p style="font-size: 14px; color: #777; margin-top: 30px;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
          <p style="font-size: 14px; color: #777;">Liên kết này sẽ hết hạn sau 1 giờ.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email đã được gửi: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Lỗi khi gửi email đặt lại mật khẩu:', error);
    return false;
  }
};

// Test gửi email
const testSendEmail = async () => {
  try {
    const result = await sendVerificationEmail(
      'tungmanchester12345@gmail.com',  // Thay bằng email thật
      'Test User',
      'test-token-123'
    );
    console.log('Kết quả gửi email:', result ? 'Thành công' : 'Thất bại');
  } catch (error) {
    console.error('Lỗi khi test gửi email:', error);
  }
};

// Chạy test
testSendEmail();

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};
