import Navbar from "../../components/navbar/Navbar";
import { Link, useParams, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";
import { Skeleton } from "@mui/material";
import {InputAdornment} from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
const SubCat = () => {
  const [skeleton, setSkeleton] = useState(true);
  //let { search } = useParams();
  const location = useLocation();
  const searchParams = location.search.split("=")[1];
  useEffect(() => {
    if (searchParams !== undefined) {
      console.log("search : ", searchParams, typeof searchParams);
      setSearchValue(searchParams.replaceAll("%20", " "));
    }
  }, [searchParams]);
  
  

  const { cat } = useParams();
  const filCat = cat.replaceAll("-", " ");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByCat/${filCat}`
      )
      .then((res) => {
        setData(res.data);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      });
  }, [cat]);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data]);

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  // const filteredData = data
  //   .filter((code) => {
  //     if (filter === "Sale") {
  //       return code.pro_ad_type === "Sale";
  //     } else if (filter === "Rent") {
  //       return code.pro_ad_type === "Rent";
  //     } else if (filter === "All") {
  //       return true;
  //     }
  //   })
  //   .filter(
  //     (code) =>
  //       code.pro_locality.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       code.pro_sub_district
  //         .toLowerCase()
  //         .includes(searchValue.toLowerCase()) ||
  //       code.pro_pincode.includes(searchValue) ||
  //       //code.pro_modified_id.toString().startsWith(searchValue) ||
  //       code.pro_city.toLowerCase().startsWith(searchValue.toLowerCase()) ||
  //       code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
  //   );


  //const records = filteredData.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(filteredData.length / recordsPerPage);

  // const [userLocation, setUserLocation] = useState(null);

  // function handleLocationClick() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success);
  //   } else {
  //     console.log("Geolocation not supported");
  //   }
  // }

  // function success(position) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //   axios
  //     .get(
  //       `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=825008d9e23247daa5600c3878106833`
  //       //`https://geocode.maps.co/reverse?lat=30.3752&lon=76.7821&api_key=65fa9be01b679584333361bhid151b9`
  //     )
  //     .then((res) => {
  //       setSearchValue(res.data.features[0].properties.city.trim());
  //       setUserLocation(res.data);
  //       //setSearchValue(res.data.address.city);
  //       //setSearchValue("kurukshetra");
  //     });
  // }

  // const [results, setResults] = useState();
  // useEffect(() => {
  //   //console.log(searchValue)

  //   const unique1 = Array.from(
  //     new Set(data.slice(0, 60).map((item) => item.pro_city.trim()))
  //   );
  //   const uniqueState = Array.from(
  //     new Set(data.slice(0, 60).map((item) => item.pro_state.trim()))
  //   );

  //   const unique2 = Array.from(
  //     new Set(
  //       data
  //         .slice(0, 60)
  //         .map(
  //           (item) =>
  //             (item.pro_sub_district
  //               ? item.pro_sub_district.trim() + ", "
  //               : "") + item.pro_city.trim()
  //         )
  //     )
  //   );
  //   const unique3 = Array.from(
  //     new Set(
  //       data
  //         .slice(0, 60)
  //         .map(
  //           (item) =>
  //             (item.pro_locality ? item.pro_locality.trim() + ", " : "") +
  //             (item.pro_sub_district
  //               ? item.pro_sub_district.trim() + ", "
  //               : "") +
  //             item.pro_city.trim()
  //         )
  //     )
  //   );
  //   const arr = [...unique1, ...uniqueState, ...unique2, ...unique3];
  //   const unique4 = Array.from(
  //     new Set(arr.slice(0, 200).map((item) => item.trim()))
  //   );

  //   const unique = unique4.filter((i) =>
  //     i.toLowerCase().startsWith(searchValue.toLowerCase())
  //   );
  //   setSuggestions(unique);
  //   //console.log("unique : " , unique , unique1 , unique2 , unique3 , unique4)
  //   let searchWords = searchValue.toLowerCase().split(",");
  //   //console.log(searchWords)
  //   const filteredData = data
  //     .filter((code) => {
  //       if (filter === "Sale") {
  //         return code.pro_ad_type === "Sale";
  //       } else if (filter === "Rent") {
  //         return code.pro_ad_type === "Rent";
  //       } else if (filter === "All") {
  //         return true;
  //       }
  //     })
  //     .filter((item) => {
  //       const itemValues =
  //         item.pro_locality +
  //         " " +
  //         item.pro_city +
  //         " " +
  //         item.pro_sub_district +
  //         " " +
  //         item.pro_street +
  //         " " +
  //         item.pro_state;

  //       return searchWords.every((word) =>
  //         itemValues.toLowerCase().includes(word)
  //       );
  //     });
  //     //console.log("filteredData : " , filteredData)
  //   setResults(filteredData);
  //   //console.log("searchWords : ", searchWords, filteredData);
  // }, [searchValue, userLocation,filter, data]);
  
  // const records =
  //   searchValue === "" && filter === "All"
  //   ? data.slice(firstIndex, lastIndex)
  //     : results.slice(firstIndex, lastIndex);
      
  // const nPages = Math.ceil(
  //   searchValue === "" && filter === "All"
  //     ? data.length / recordsPerPage
  //     : results.length / recordsPerPage
      
  // );

  // console.log("suggestions : ", suggestions);

  const [records, setRecords] = useState([]);
  const [nPages, setNPages] = useState(0);

  const handleRecordsChange = (newRecords) => {
    setRecords(newRecords);
  };

  const handleNPagesChange = (newNPages) => {
    setNPages(newNPages);
  };

  const handleSearchValue = (value) => {
    console.log(value);
    setSearchValue(value);
  };
  console.log(searchValue)
  return (
    <div>
      <Helmet>
        <title>Propertyease - {filCat}</title>
      </Helmet>
      <Navbar />
      <div className={"main"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2 className="text-capitalize">{filCat}</h2>

              
                 <SearchBar
                handleNPagesChange={handleNPagesChange}
                handleRecordsChange={handleRecordsChange}
                data={data}
                handleSearchValue={handleSearchValue}
                searchValue={searchValue}
              />
            </div>
            
        
            <div className="row">
              
             
              <div className="col-md-9">
              {!skeleton && records.length > 0 ?
                records.map((object, index) => (
                  <div className="list-group" key={index}>
                    <div className="row">
                      <div className="col-md-auto flex-column text-center">
                        <div className="buiness-logo">
                          <Link
                            to={`/${
                              object.pro_area_size.toLowerCase() +
                              "-" +
                              object.pro_area_size_unit.toLowerCase() +
                              "-"
                            }${
                              object.pro_type
                                ? object.pro_type
                                    .split(",")[0]
                                    .toLowerCase()
                                    .replaceAll(" ", "-")
                                : ""
                            }-for-${
                              object.pro_ad_type === "rent" ? "rent" : "sale"
                            }-in-${object.pro_locality
                              .toLowerCase()
                              .replaceAll(" ", "-")}-${object.pro_city
                              .toLowerCase()
                              .replaceAll(" ", "-")}-${object.pro_id}`}
                          >
                            {object.img_link ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_BACKEND
                                }/propertyImages/watermark/${object.img_link}`}
                                alt="img"
                              />
                            ) : (
                              <img src="/images/default.png" alt="no image" />
                            )}
                          </Link>
                        </div>
                      </div>

                      <div className="col" style={{ minWidth: 0 }}>
                        <div className="recent-box-serv">
                          <div className="recent-bus-content">
                            <div className="property-listing-type">
                              <Link
                                to={`/${
                                  object.pro_area_size.toLowerCase() +
                                  "-" +
                                  object.pro_area_size_unit.toLowerCase() +
                                  "-"
                                }${
                                  object.pro_type
                                    ? object.pro_type
                                        .split(",")[0]
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                    : ""
                                }-for-${
                                  object.pro_ad_type === "rent"
                                    ? "rent"
                                    : "sale"
                                }-in-${object.pro_locality
                                  .toLowerCase()
                                  .replaceAll(" ", "-")}-${object.pro_city
                                  .toLowerCase()
                                  .replaceAll(" ", "-")}-${object.pro_id}`}
                              >
                                <span className="text-wrap text-bold">
                                  {object.pro_area_size +
                                    " " +
                                    object.pro_area_size_unit +
                                    " " +
                                    object.pro_type.split(",")[0] +
                                    " "}
                                  for{" "}
                                  {object.pro_ad_type === "Rent"
                                    ? "Rent"
                                    : "Sale"}{" "}
                                  in{" "}
                                  <span className="text-capitalize">
                                    {object.pro_locality}
                                  </span>
                                  ,&nbsp;
                                  {object.pro_sub_district
                                    ? object.pro_sub_district + ", "
                                    : ""}
                                  {object.pro_city},&nbsp;
                                  {object.pro_state}
                                </span>
                              </Link>
                            </div>
                            <ul>
                              <li className="text-capitalize">
                                <img
                                  src="/img/location.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon"></strong>
                                {object.pro_locality},&nbsp;
                                {object.pro_city}
                              </li>
                              {object.pro_width ? (
                                <li>
                                  <img
                                    src="/img/meter.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Dimension&nbsp;
                                  </strong>
                                  ({object.pro_width} Feet * {object.pro_length}{" "}
                                  Feet)
                                </li>
                              ) : (
                                ""
                              )}
                              <li>
                                <img
                                  src="/img/rupee.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon">
                                  {object.pro_amt && "Price"}
                                </strong>
                                &nbsp;
                                {object.pro_amt
                                  ? "₹" +
                                    object.pro_amt +
                                    " " +
                                    object.pro_amt_unit
                                  : "Ask Price"}
                              </li>

                              <li>
                                <img
                                  src="/img/facing.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon">
                                  Property Facing
                                </strong>
                                &nbsp;{object.pro_facing}
                              </li>
                            </ul>
                          </div>
                          <div className="pt-3 d-flex justify-content-between  align-items-center">
                            <div className="listed pl-md-0  ">
                              Listed
                              <br />
                              {/* {formatDate(
                                new Date(object.pro_date).toDateString()
                              )} */}
                              {DateTime(object.pro_date)}
                            </div>
                            <div className="d-flex">
                              <div className="mr-2 mt-1 ">
                                <Link
                                  to={`/${
                                    object.pro_area_size.toLowerCase() +
                                    "-" +
                                    object.pro_area_size_unit.toLowerCase() +
                                    "-"
                                  }${
                                    object.pro_type
                                      ? object.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    object.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${object.pro_locality
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_city
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_id}`}
                                >
                                  <a
                                    title="View complete details of this property"
                                    className=" btn-viewmore"
                                  >
                                    View More
                                  </a>
                                </Link>
                              </div>
                              <div>
                                <a
                                  rel="noreferrer nofollow"
                                  href={`https://wa.me/919996716787?text=https://www.propertyease.in/${
                                    object.pro_area_size.toLowerCase() +
                                    "-" +
                                    object.pro_area_size_unit.toLowerCase() +
                                    "-"
                                  }${
                                    object.pro_type
                                      ? object.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    object.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${object.pro_locality
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_city
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_id}`}
                                  target="_blank"
                                  className="conatct-propertywp "
                                  title=" Whatsapp/Contact for this property"
                                >
                                  <IconBrandWhatsapp />
                                  <span className="pl-1">Whatsapp</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )) 
                : skeleton ? (
                  <div>
                    <Skeleton variant="rectangular" width={813} height={200} />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                  </div>
                ) : <NoResult searchValue={searchValue} handleSearchValue={handleSearchValue} />}
              </div>
              
              <div className="col-md-3">
                <div>
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">
                      For Sale
                    </div>
                    {subData.map((sub, index) => (
                      <Link
                      onClick={() => setSearchValue("")}
                        to={`/${sub.pro_type
                          .split(",")[1]
                          .toLowerCase()}/${sub.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{sub.pro_type.split(",")[0]}</div>
                          <div>({sub.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">Rent</div>
                    {rentData.map((rent, index) => (
                      <Link
                        to={`/rental/${rent.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                        // className={
                        //   rent.pro_type.split(",")[0] === cat
                        //     ? "text-primary m-0"
                        //     : "text-secondary m-0"
                        // }
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{rent.pro_type.split(",")[0]}</div>
                          <div>({rent.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {records.length > 0 &&
            <Pagination
              page={currentPage}
              count={nPages}
              color="primary"
              onChange={(e, value) => setCurrentPage(value)}
              className="col-md-6 mx-auto py-2"
            />}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SubCat;
