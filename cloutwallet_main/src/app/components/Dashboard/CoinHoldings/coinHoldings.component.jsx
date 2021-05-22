import { Style } from "./coinHoldings.styles";
import { useTable, useSortBy } from "react-table";
import { useCH_DATA } from "./coinHolding.data";
import Loader from "../../Loader/loader.component";
import { useState, useEffect } from "react";

function CoinHoldings({ dark, holdingData }) {
  if (holdingData === undefined) {
    return (
      <Style.Container>
        <Loader />
      </Style.Container>
    )
  }
  const [seeAll, setSeeAll] = useState(true);
  const { data, columns } = useCH_DATA(holdingData);
  const tableInstance = useTable({ columns, data, initialState: {
            sortBy: [
                {
                    id: 'USDValuePrice',
                    desc: true
                }
            ]
        } }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // const [searchIsLoading, setSearchIsLoading] = useState(true)

  // const [searchProfiles, setSearchProfiles] = useState()

  // const abortController = useRef();

  // const abortLatest = () => {
  //   abortController.current && abortController.current.abort();
  // }

  // const searchUsernames = async function (searchuser) {

  //   if(searchuser.length > 0) {

  //     const controller = new window.AbortController();
  //     abortController.current = controller;

  //     setSearchIsLoading(true)
  //     const response = await fetch(`/api/searchuser/${searchuser}`, {
  //       method: "POST",
  //       signal: controller.signal,
  //     })

  //     const profiles = await response.json();
  //     if(profiles.data){
  //       console.log(profiles.data.profile)
  //       setSearchProfiles(profiles.data.profile)
  //       setSearchIsLoading(false);
  //     } else {
  //       setSearchProfiles([])
  //       setSearchIsLoading(true);
  //     }

  //   } else {
  //     console.log("nada")
  //     setSearchProfiles([])
  //     setSearchIsLoading(true);
  //   }

  // }

  // const debouncedSearch = useRef(
  //   debounce(searchUsernames, 700)
  // );

  // const getThrottledResult = (e) => {
  //   abortLatest();
  //   debouncedSearch.current(e.target.value)
  // }

  // useEffect(() => {
  //   document.getElementById('userSearchBar').addEventListener('focusin', () => {
  //     setSearchProfiles([])
  //     setSearchIsLoading(true);
  //     document.getElementById('searchUserList').style.opacity = "100%"
  //     document.getElementById('searchUserList').style.zIndex= '2'
  //   })

  //   document.getElementById('userSearchBar').addEventListener('focusout', () => {
  //     setSearchProfiles([])
  //     setSearchIsLoading(true);
  //     document.getElementById('searchUserList').style.opacity = "0%"
  //     document.getElementById('searchUserList').style.zIndex= '-1'
  //   })

  // }, [])

  return (
    <Style.Container dark={dark}>
      <h1>Coin Holding</h1>
      {/* <div className="ch-search">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5605 18.4395L16.7528 14.6318C17.5395 13.446 18 12.0262 18 10.5C18 6.3645 14.6355 3 10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C12.0262 18 13.446 17.5395 14.6318 16.7528L18.4395 20.5605C19.0245 21.1462 19.9755 21.1462 20.5605 20.5605C21.1462 19.9748 21.1462 19.0252 20.5605 18.4395ZM5.25 10.5C5.25 7.605 7.605 5.25 10.5 5.25C13.395 5.25 15.75 7.605 15.75 10.5C15.75 13.395 13.395 15.75 10.5 15.75C7.605 15.75 5.25 13.395 5.25 10.5Z"
            fill="#969B9F"
          />
        </svg>
        <input className="ch-search-input" id="userSearchBar" onChange={(e) => {getThrottledResult(e)}} placeholder="Search here..." />
        <div className="search_user_list" id="searchUserList">
          {
            searchIsLoading ?
            <p>Loading</p> :
            (searchProfiles.length > 0) && (!searchIsLoading) ?
              searchProfiles.map((profile) => {
                return (
                  <div className="user">
                      <img src={profile.ProfilePic} width='40' height='40' />
                      <p>{profile.Username}</p>
                  </div>
                )
              }):
              <p>Loading</p>
          }
        </div>
      </div> */}
      <Style.TableDiv height={seeAll} dark={dark} className="ch-table">
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => 
                      // Apply the header cell props
                      (<th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                        <span className="sort-icon">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <svg
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66501 5.60059C4.5222 5.78613 4.28635 5.78613 4.14361 5.60059L0.668042 1.08296C0.4322 0.776331 0.599772 0.260111 0.928709 0.260111H7.87984C8.20878 0.260111 8.37635 0.776331 8.14051 1.08296L4.66501 5.60059Z"
                                  fill="#828282"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66501 0.399413C4.5222 0.213868 4.28635 0.213868 4.14361 0.399413L0.668042 4.91704C0.4322 5.22367 0.599772 5.73989 0.928709 5.73989H7.87984C8.20878 5.73989 8.37635 5.22367 8.14051 4.91704L4.66501 0.399413Z"
                                  fill="#828282"
                                />
                              </svg>
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Style.TableDiv>
      <div className="see-all">
        <span onClick={() => setSeeAll(!seeAll)}>See All</span>
      </div>
    </Style.Container>
  );
}

export default CoinHoldings;
