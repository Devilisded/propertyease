import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBuilding,
  IconCurrencyDollar,
  IconDeviceMobile,
  IconGlobe,
  IconHome,
  IconMapPinFilled,
  IconPhone,
  IconScale,
  IconSchool,
  IconSquareRoundedCheckFilled,
  IconWorld,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, InputAdornment, Snackbar } from "@mui/material";
import axios from "axios";
import Loader from "../loader/Loader";
import { regEx } from "../../pages/regEx";

const Footer = () => {
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnack = () => {
    setSnack(false);
  };

  const handleSubmit = async () => {
    setLoader(true);

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/contact/freeEnquiry",
        data
      );
      setLoader(false);
      handleClose();
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [emailError, setEmailError] = useState(true);
  useEffect(() => {
    if (!regEx[0].emailRegex.test(data.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [data.email]);

  useEffect(() => {
    if (emailError === false && data.name !== "" && data.phone.length > 9) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data, emailError]);
  return (
    <div>
      {loader ? <Loader /> : ""}
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={handleSnack}
        message="We Will Contact you soon !.."
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <img src="/images/logo.png" />
          <p className="font-weight-bold text-danger mb-0 call_headline ">
            Free Enquiry
          </p>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Name"
            type="text"
            value={data.name}
            helperText={data.name === "" ? "Required" : ""}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value.replace(/[^a-zA-Z ]/g, ""),
              })
            }
            inputProps={{
              maxLength: 40,
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            inputProps={{
              maxLength: 40,
            }}
            helperText={emailError ? "Please enter valid email address" : ""}
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value.replace(/[^a-zA-Z.@0-9/]/g, ""),
              })
            }
            fullWidth
            variant="standard"
          />
          <div className="mt-3">
            <TextField
              id="mobile"
              fullWidth
              autoFocus
              name="phone"
              helperText={
                data.phone.length < 10 ? "Please enter valid phone number" : ""
              }
              value={data.phone}
              inputProps={{
                maxLength: 10,
              }}
              onChange={(e) =>
                setData({
                  ...data,
                  phone: e.target.value.replace(
                    regEx[2].phoneNumberValidation,
                    ""
                  ),
                })
              }
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91 </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
          <div className="bg-gray-300 mt-4 py-4">
            <p className="font-weight-bold text-center">Our Promise</p>
            <div className="d-flex ">
              <div className="col-md-3 text-center ">
                <IconSquareRoundedCheckFilled /> <br />
                Assured <br /> Privacy
              </div>
              <div className="col-md-3 text-center ">
                <IconSchool className=" text-red" />
                <br />
                Expert <br /> Consultation
              </div>
              <div className="col-md-3 text-center">
                <IconWorld />
                <br />
                Free Site Visit
              </div>
              <div className="col-md-3 text-center">
                <IconCurrencyDollar />
                <br />
                Best <br />
                Price
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} disabled={disabled}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <section className="find-services">
        <div className="container">
          <div className="section-title">
            <h3>Find by Categories</h3>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="categores-display">
                <h6>
                  <Link to="/listing/Residential">
                    <a>
                      <span>
                        <IconHome className="sidebar-faicon" />
                      </span>
                      Residential / Plots
                    </a>
                  </Link>
                </h6>
                <ul>
                  <li>
                    <Link to="/subCat/Apartment">
                      <a>Apartment</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Independent House">
                      <a>Independent House</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Builder Floor">
                      <a>Builder Floor</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Farm House">
                      <a>Farm House</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Raw House">
                      <a>Raw House</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Retirement Community">
                      <a>Retirement Community</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Studio Apartment">
                      <a>Studio Apartment</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="categores-display">
                <h6>
                  <Link to="/listing/Plot">
                    <a>
                      <span>
                        <IconMapPinFilled className="sidebar-faicon" />
                      </span>
                      Land
                    </a>
                  </Link>
                </h6>
                <ul>
                  <li>
                    <Link to="/subCat/Residential Land">
                      <a>Residential Land</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Commercial Land">
                      <a>Commercial Land </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Industrial Land">
                      <a>Industrial Land </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Agricultural Land">
                      <a>Agricultural Land</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Farm House Land">
                      <a>Farm House Land</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="categores-display">
                <h6>
                  <Link to="/listing/Commercial">
                    <a>
                      <span>
                        <IconBuilding className="sidebar-faicon" />
                      </span>
                      Commercial
                    </a>
                  </Link>
                </h6>
                <ul>
                  <li>
                    <Link to="/subCat/Retail Showroom">
                      <a>Retail Showroom</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Commercial Building">
                      <a>Commercial Building</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Office Complex">
                      <a>Office Complex</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Software Technology Park">
                      <a>Software Technology Park</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Warehouse">
                      <a>Warehouse</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subCat/Industrial Estate Contractors">
                      <a>Industrial Estate Contractors</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p>
                Copyright © {new Date().getFullYear()} Propertyease -
                Information. All Rights Reserved
              </p>
            </div>
            <div className="col-md-4">
              <div className="social_icons botom">
                <ul>
                  <li>
                    <div>
                      <a
                        title="facebook"
                        rel="noreferrer nofollow"
                        href="https://www.facebook.com/Propertyease.in/"
                        target="_blank"
                      >
                        <IconBrandFacebook />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a
                        title="Instagram"
                        rel="noreferrer nofollow"
                        href="https://www.instagram.com/propertyease.in/"
                        target="_blank"
                      >
                        <IconBrandInstagram />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link to="/about">
                      <a title="contactus">About Us</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      title="Click to view kurukshetra collector rates 2024-25"
                      href={`/DC-Rates-2024-25.pdf`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      DC Rates 2024-25
                    </a>
                  </li>
                  <li>
                    <Link to="/termsAndConditions">
                      <a title="contactus">Terms &amp; Conditions</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy">
                      <a title="contactus">Privacy Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Disclaimer">
            <p className="Disclaimer-content">
              All the information displayed is as posted by the User and
              displayed on the website for informational purposes only.
              Propertyease.in makes no representations and warranties of any
              kind, whether expressed or implied, for the Services and in
              relation to the accuracy or quality of any information transmitted
              or obtained at Propertyease.in. You are hereby strongly advised to
              verify all information including visiting the relevant authorities
              before taking any decision based on the contents displayed on the
              website.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <h5>Complete Support</h5>
          <ul>
            <li className="mobile-hide">
              <a href="#" title="Get a Call" onClick={handleClickOpen}>
                <span className="mr-1">
                  <IconDeviceMobile className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Get a Call</span>
              </a>
            </li>
            <li className="mobile-hide">
              <a href="#" title="Site Visit" onClick={handleClickOpen}>
                <span className="mr-1">
                  <IconGlobe className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Site Visit</span>
              </a>
            </li>
            <li className="mobile-hide">
              <a href="#" title="Home Loan" onClick={handleClickOpen}>
                <span className="mr-1">
                  <IconHome className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Home Loan</span>
              </a>
            </li>
            <li className="mobile-hide">
              <a href="#" title="Legal Advise" onClick={handleClickOpen}>
                <span className="mr-1">
                  <IconScale className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Legal Advise</span>
              </a>
            </li>

            <li>
              <a href="tel:9996716787" title="Call Now">
                <span className="mr-1">
                  <IconPhone className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">+91 99967 16787</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
