import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Đang xác thực email...');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Token không hợp lệ hoặc đã hết hạn.');
        console.log("token", token);
      }

      try {
        const response = await axios.post(`http://localhost:3000/api/v1/verify-email`, {
          token
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          alert('Xác thực email thành công! Bạn có thể đăng nhập.');
          window.location.href = '/login';
        } else {
          alert(' Xác thực thất bại: ' + response.data.message);
        }
      } catch (error) {
        alert(' Lỗi khi xác thực: ' + (error.response?.data?.message || error.message));
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
