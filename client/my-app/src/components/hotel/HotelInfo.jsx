const HotelInfo = () => {
    return (
      <div className="bg-white rounded-lg shadow-md mt-7 p-4 flex flex-row container mx-auto justify-between">
        {/* Left Section */}
        <div className=" flex flex-col">
          <h2 className=" flex text-2xl font-bold text-[#00205B] mb-2">
            Mường Thanh Grand Xa La 
          </h2>
          <div className="flex gap-2 items-start mb-2">
            <span className="material-icons text-gray-600">location_on</span>
            <p className="text-gray-600">
              Số 66, đường Phúc La, khu đô thị Xa La, phường Phúc La, quận Hà Đông, Hà Nội, Việt Nam
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <span
                  key={index}
                  className={`text-2xl ${
                    index < 3 ? 'text-green-500' : 'text-gray-300'
                  }`}
                >
                  ●
                </span>
              ))}
            </div>
            <span className="text-gray-600">3.5/5 (13 reviews)</span>
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Tripadvisor_Logo_circle-green_vertical-lockup_registered.svg"
              alt="TripAdvisor"
              className="h-6"
            /> */}
          </div>
          <div className="flex flex-row gap-4">
          <div className="flex gap-2 items-center text-gray-600">
            <span className="material-icons">email</span>
            <p>info@xala.muongthanh.vn</p>
          </div>
          <div className="flex gap-2 items-center text-gray-600">
            <span className="material-icons">phone</span>
            <p>+84 24 3311 5555</p>
          </div>
         
          </div>
         
        </div>
  
        {/* Right Section */}
        <div className="items-center flex">
          <button className="bg-[#00205B] text-white px-8 py-3 rounded hover:bg-blue-800  font-semibold ">
            ĐẶT PHÒNG NGAY
          </button>
        </div>
        
      </div>

    );
  };
  
  export default HotelInfo;