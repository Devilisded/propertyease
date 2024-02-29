import ImageWatermark from "../../components/watermarkOthers/ImageWatermark";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import VideoWatermark from "../../components/watermarkOthers/VideoWatermark";

const WatermarkOthers = () => {
  return (
    <div>
      <Navbar />
      <div className="d-sm-flex pt-5 pb-5">
        <div className="w-100">
          <ImageWatermark />
        </div>
        <div className="w-100">
          <VideoWatermark />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WatermarkOthers;
