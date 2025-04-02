import React from 'react';
const RoomCard = () => {
    return (
        <div className='grid-flow-col w-[300px] h-[200px]'>
            <div className='overflow-hidden'>
                <img
                    src="https://booking.muongthanh.com/images/hotels/hotels/original/muong-thanh-luxury-ha-long-centre_1729839613.jpg"
                    alt="Mường Thanh Luxury"
                    className=" tranform hover:scale-110 object-cover duration-300 cursor-pointer"
                />
            </div>
            <label>Khách sạn Mường Thanh Grand Hà Nội</label>
        </div>
    );
};

export default RoomCard;