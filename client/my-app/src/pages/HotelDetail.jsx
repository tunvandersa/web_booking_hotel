import Layout from '../components/layout/Layout';
import HotelGallery from '../components/hotel/HotelGallery';
import HotelInfo from '../components/hotel/HotelInfo';
import RoomList from '../components/hotel/RoomList';
import SearchResults from './SearchResults';
const HotelDetail = () => {
  return (
    <Layout>
        <HotelGallery />
        <HotelInfo />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Danh sách phòng</h2>
          <RoomList />
        </div>
    </Layout>
  );
};

export default HotelDetail;
