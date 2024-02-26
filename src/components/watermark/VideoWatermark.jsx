import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Cloudinary } from "@cloudinary/url-gen";

const VideoWatermark = () => {
  const [selectedVideo, setselectedVideo] = useState(null);
  const [pid, setPid] = useState(null);
  const [loader, setLoader] = useState(false);
  const [invalidFile, setInvalidFile] = useState(false);

  const cld = new Cloudinary({ cloud: { cloudName: "dqct40k0n" } });

  const handleFileChange = (event) => {
    setInvalidFile(false);
    setselectedVideo(null);
    setPid(null);
    const temp = event.target.files[0];

    if (!temp) return;
    console.log("temp: ", temp.type);
    if (temp.type !== "video/mp4") {
      setInvalidFile(true);
    }
    setselectedVideo(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedVideo) {
      console.log("No File Selected");
      return;
    }
    setLoader(true);

    const formData = new FormData();
    formData.append(`files`, selectedVideo[0]);

    const ans = await axios.post(
      import.meta.env.VITE_BACKEND + "/api/watermark/uploadVideo",
      formData
    );
    console.log(ans.data.public_id);
    setPid(ans.data.public_id);
  };

  function Video({ cloudName, watermarkId }) {
    if (pid) {
      let videoSource = `https://res.cloudinary.com/${cloudName}/video/upload`;

      videoSource += "/q_auto:best,w_600";
      const watermark = `l_${watermarkId.replace("/", ":")}`;

      videoSource += `/${watermark},g_south_east,w_100,x_20,y_20`;
      videoSource += `/${pid}.mp4`;
      setLoader(false);
      setselectedVideo(null);
      return (
        <video controls>
          <source src={videoSource} type="video/mp4" />
        </video>
      );
    }
  }

  return (
    <div className="d-flex flex-column gap-12 justify-content-center p-5  ">
      <div className="  m-8">
        <input
          id="file-2"
          type="file"
          multiple
          className="hidden sr-only w-full"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-2"
          className="border py-4 mx-2 rounded-2 border-secondary"
        >
          {!selectedVideo && (
            <div className="d-flex flex-column align-items-center">
              <div>Drop Videos here</div>
              <div className="py-1">Or</div>
              <div className="border py-2 px-4">Browse</div>
            </div>
          )}

          {selectedVideo && (
            <div className="d-flex flex-column  align-items-center">
              <div className="py-3"></div>
              <div className="py-1">Download you updated file.</div>
              <div className="py-3"></div>
            </div>
          )}
        </label>
      </div>


      <div className="ml-2">
        {!loader ? (
          <button
            className={
              invalidFile === false  && selectedVideo === null ? "btn btn-secondary py-2 px-4" : "btn btn-primary py-2 px-4"
            }
            onClick={handleUpload}
            disabled={invalidFile === false && selectedVideo === null ? true : false}
          >
            Upload
          </button>
        ) : (
          ""
        )}
      </div>

      {loader ? <p>Processing your file ... Please wait </p> : ""}
      {loader ? <HashLoader /> : ""}
      {invalidFile ? (
        <p className="text-lg text-slate-500">
          Invalid File Format ( Supported Format : .mp4 )
        </p>
      ) : (
        ""
      )}
	  <div className="ml-2 mt-4">
	  {pid ? <Video cloudName="dqct40k0n" watermarkId="logo_2_nximfp" /> : ""}
	  </div>
     
    </div>
  );
};

export default VideoWatermark;
