import HeaderTouch from "../../shared/Header/header.touch.component";
import BuyHistory from "../Dashboard/BuyHistory/buyHistory.component";
import SellHistory from "../Dashboard/SellHistory/sellHistory.component";
import { Style } from "./marketOverview.styles";
import LineChart from "../../molecule/LineChart/lineChart.component";
//import { data, chartOptions } from "./marketOverview.component";
import fetch from "isomorphic-unfetch";
import debounce from "lodash.debounce";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

function MarketOverviewTouch({ data }) {
  const dark = useSelector((state) => state.theme.darkTheme);
  const [searchIsLoading, setSearchIsLoading] = useState(true);

  const [searchProfiles, setSearchProfiles] = useState();

  const abortController = useRef();

  const abortLatest = () => {
    abortController.current && abortController.current.abort();
  };

  const searchUsernames = async function (searchuser) {
    if (searchuser.length > 0) {
      const controller = new window.AbortController();
      abortController.current = controller;

      setSearchIsLoading(true);
      const response = await fetch(`/api/searchuser/${searchuser}`, {
        method: "POST",
        signal: controller.signal,
      });

      const profiles = await response.json();
      if (profiles.data) {
        // console.log(profiles.data.profile);
        setSearchProfiles(profiles.data.profile);
        setSearchIsLoading(false);
      } else {
        setSearchProfiles([]);
        setSearchIsLoading(true);
      }
    } else {
      // console.log("nada");
      setSearchProfiles([]);
      setSearchIsLoading(true);
    }
  };

  const debouncedSearch = useRef(debounce(searchUsernames, 700));

  const getThrottledResult = (e) => {
    abortLatest();
    debouncedSearch.current(e.target.value);
  };

  useEffect(() => {
    document
      .getElementById("userSearchBarMobile")
      .addEventListener("focusin", () => {
        setSearchProfiles([]);
        setSearchIsLoading(true);
        document.getElementById("searchUserListMobile").style.opacity = "100%";
        document.getElementById("searchUserListMobile").style.zIndex = "2";
      });

    document
      .getElementById("userSearchBarMobile")
      .addEventListener("focusout", () => {
        setSearchProfiles([]);
        setSearchIsLoading(true);
        document.getElementById("searchUserListMobile").style.opacity = "0%";
        document.getElementById("searchUserListMobile").style.zIndex = "-1";
      });
  }, []);

  return (
    <Style.T_Container dark={dark}>
      <HeaderTouch />
      <h1 className="mot-title">Market Overview</h1>
      <div className="mot-button">
        <input
          className="ch-search-input"
          id="userSearchBarMobile"
          onChange={(e) => {
            getThrottledResult(e);
          }}
          placeholder="Search here..."
        />
        <div className="search_user_list" id="searchUserListMobile">
          {searchIsLoading ? (
            <p>Loading</p>
          ) : searchProfiles.length > 0 && !searchIsLoading ? (
            searchProfiles.map((profile) => {
              return (
                <div className="user">
                  <img src={profile.ProfilePic} width="40" height="40" />
                  <p>{profile.Username}</p>
                </div>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
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
      </div>
      <div className="mot-chart">
        <div className="mot-chart-options">
          <span>Creators</span>
          <button>
            <span>Month</span>
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.50019 6.49969C5.36858 6.50045 5.23812 6.47523 5.11628 6.42546C4.99444 6.3757 4.88363 6.30237 4.79018 6.20969L0.790185 2.2097C0.696947 2.11646 0.622986 2.00577 0.572526 1.88395C0.522066 1.76212 0.496094 1.63155 0.496094 1.4997C0.496094 1.23339 0.601882 0.978 0.790185 0.789696C0.978489 0.601393 1.23388 0.495605 1.50019 0.495605C1.76649 0.495605 2.02188 0.601393 2.21019 0.789696L5.50019 4.08969L8.79018 0.799697C8.98149 0.63587 9.22756 0.550264 9.47924 0.559985C9.73091 0.569706 9.96965 0.674039 10.1477 0.852133C10.3258 1.03023 10.4302 1.26897 10.4399 1.52064C10.4496 1.77232 10.364 2.01839 10.2002 2.2097L6.20018 6.20969C6.01392 6.39444 5.76252 6.49859 5.50019 6.49969Z"
                fill={dark ? "white" : "#969B9F"}
              />
            </svg>
          </button>
        </div>
        <div className="mot-chart-size">
          {/* <LineChart lineData={data} options={chartOptions} /> */}
        </div>
      </div>
      {
        data ? (
          <div className="buy-sell-history">
            <BuyHistory transactionData={data} dark={dark} />
            <SellHistory transactionData={data} dark={dark} />
              </div>
            ) :
            (
              <p className="no-t-h">You have no transaction history</p>
            )
      }
    </Style.T_Container>
  );
}

export default MarketOverviewTouch;
