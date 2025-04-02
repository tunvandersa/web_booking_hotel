import React from 'react';
const HotelCard = () => {
    return (
        <div className=' grid-flow-col max-w-[300px] max-h-[200px] mr-3 mb-10'>
            <div className='overflow-hidden'>
                <img
                    src="https://booking.muongthanh.com/images/hotels/hotels/original/muong-thanh-luxury-ha-long-centre_1729839613.jpg"
                    alt="Mường Thanh Luxury"
                    className="tranform hover:scale-110 object-cover duration-300 cursor-pointer mb-1"
                />
            </div>
            <label>Khách sạn Mường Thanh Grand Hà Nội</label>
        </div>
    );
};

export default HotelCard;