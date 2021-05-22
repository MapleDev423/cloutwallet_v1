import { useState } from "react";
import { Style } from "./header.styles";
import gsap from "gsap";
import { Transition } from "react-transition-group";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../../../store/index";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ThemeButton from "../../components/Theme/theme.component";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/User.graphql";

function enter(node) {
  gsap.from(node, {
    duration: 0.25,
    autoAlpha: 0,
    y: -100,
  });
}

function exit(node) {
  gsap.to(node, {
    duration: 0.25,
    autoAlpha: 0,
    y: -100,
  });
}

function Header({ dark }) {
  const [showLogOut, setShowLogOut] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [fetchedUsername, setFetchedUsername] = useState();
  const [fetchedProfilePic, setFetchedProfilePic] = useState();
  const payload = JSON.parse(localStorage.getItem("identity"));

  const objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      var a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear();
  const today =
    dayOfWeek + ". " + dayOfMonth + " of " + curMonth + ", " + curYear + ".";

  useQuery(GET_USER, {
    variables: {
      PublicKeyBase58Check: payload?.publicKey,
    },
    onCompleted: (data) => {
      setFetchedUsername(data.profile.ProfilesFound[0].Username);
      setFetchedProfilePic(data.profile.ProfilesFound[0].ProfilePic);
    },
  });

  function logOut() {
    setShowLogOut(false);
    router.push("/login");
    purgeStoredState(persistConfig);
    localStorage.removeItem("identity");
    setTimeout(() => {
      dispatch({ type: "USER_LOGOUT" });
    }, 0);
  }

  return (
    <Style.Container className="main-header" clicked={showLogOut} dark={dark}>
      <div className="header-author">
        <img src={fetchedProfilePic} alt="creator" />
        <div className="author-details">
          <div className="name-wave">
            <h3>{fetchedUsername}</h3>
            <span>👋</span>
          </div>
          <span>{today}</span>
        </div>
      </div>
      <div className="notifications-area">
        <ThemeButton />
        <button
          className="notif-button"
          onClick={() => setShowLogOut(!showLogOut)}
        >
          <span>{fetchedUsername}</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.70711 0.292893C10.0676 0.653377 10.0953 1.22061 9.7903 1.6129L9.70711 1.70711L5.70711 5.70711C5.34662 6.06759 4.77939 6.09532 4.3871 5.7903L4.29289 5.70711L0.292893 1.70711C-0.0976305 1.31658 -0.0976305 0.683418 0.292893 0.292893C0.653378 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5 3.585L8.29289 0.292893C8.65338 -0.0675907 9.22061 -0.0953203 9.6129 0.209705L9.70711 0.292893Z"
              fill={dark ? "white" : "#0A1629"}
            />
          </svg>
        </button>
        <Transition
          key="header-options-transition"
          timeout={250}
          in={showLogOut}
          onEnter={enter}
          onExit={exit}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          {(state) => (
            <div className="header-options" onClick={logOut}>
              <span>Log Out</span>
            </div>
          )}
        </Transition>
      </div>
    </Style.Container>
  );
}

export default Header;
