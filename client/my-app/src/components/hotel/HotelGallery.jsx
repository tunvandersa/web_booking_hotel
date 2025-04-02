const HotelGallery = () => {
  const images = [
"https://booking.muongthanh.com/images/hotels/hotels/original/muong-thanh-luxury-ha-long-centre_1729839613.jpg",
  ];

  return (
        <img 
          src={images[0]}
          className="w-full h-[400px] object-cover"
          alt="Hotel main"
        />
        
  );
};

export default HotelGallery;
