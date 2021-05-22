import { useState } from "react";
import { useSortBy, useTable } from "react-table";
import { Style } from "./history.styles";

function History({ columns, data, title, dark,  udf}) {
  const tableInstance = useTable({ columns, data }, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
  } = tableInstance;

  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState(tableInstance.rows.slice(0, 5));

  const onExpand = () => {
    if (expanded) {
      setRows(tableInstance.rows.slice(0, 5));
      setExpanded(false);
    } else {
      setRows(tableInstance.rows);
      setExpanded(true);
    }
  };

  if (udf) {
    return (
      <Style.Container className="history" dark={dark}>
      <div className="header">
        <h1>{title}</h1>
        <p>You have no transaction history available at the moment.</p>
      </div>
      <div className="hist-table">
      </div>
    </Style.Container>        
    )
  }

  return (
    <Style.Container className="history" dark={dark}>
      <div className="header">
        <h1>{title}</h1>
        <svg
          width="39"
          height="31"
          viewBox="0 0 39 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5004 12C23.0763 12 22.6563 12.0905 22.2645 12.2664C21.8727 12.4423 21.5167 12.7001 21.2168 13.0251C20.9169 13.3501 20.679 13.736 20.5167 14.1606C20.3544 14.5852 20.2709 15.0404 20.2709 15.5C20.2709 15.9596 20.3544 16.4148 20.5167 16.8394C20.679 17.264 20.9169 17.6499 21.2168 17.9749C21.5167 18.2999 21.8727 18.5577 22.2645 18.7336C22.6563 18.9095 23.0763 19 23.5004 19C24.3569 18.9998 25.1782 18.6308 25.7837 17.9743C26.3892 17.3178 26.7293 16.4275 26.7291 15.4992C26.7289 14.5709 26.3885 13.6808 25.7827 13.0246C25.1769 12.3683 24.3554 11.9998 23.4989 12H23.5004ZM13.2295 12C12.8054 12 12.3854 12.0905 11.9936 12.2664C11.6018 12.4423 11.2458 12.7001 10.9459 13.0251C10.646 13.3501 10.4081 13.736 10.2458 14.1606C10.0835 14.5852 10 15.0404 10 15.5C10 15.9596 10.0835 16.4148 10.2458 16.8394C10.4081 17.264 10.646 17.6499 10.9459 17.9749C11.2458 18.2999 11.6018 18.5577 11.9936 18.7336C12.3854 18.9095 12.8054 19 13.2295 19C14.086 18.9998 14.9073 18.6308 15.5128 17.9743C16.1183 17.3178 16.4584 16.4275 16.4582 15.4992C16.458 14.5709 16.1176 13.6808 15.5118 13.0246C14.906 12.3683 14.0845 11.9998 13.228 12H13.2295ZM33.7713 12C33.3472 12 32.9272 12.0905 32.5354 12.2664C32.1436 12.4423 31.7876 12.7001 31.4877 13.0251C31.1878 13.3501 30.9499 13.736 30.7876 14.1606C30.6253 14.5852 30.5418 15.0404 30.5418 15.5C30.5418 15.9596 30.6253 16.4148 30.7876 16.8394C30.9499 17.264 31.1878 17.6499 31.4877 17.9749C31.7876 18.2999 32.1436 18.5577 32.5354 18.7336C32.9272 18.9095 33.3472 19 33.7713 19C34.6278 18.9998 35.4491 18.6308 36.0546 17.9743C36.6601 17.3178 37.0002 16.4275 37 15.4992C36.9998 14.5709 36.6594 13.6808 36.0536 13.0246C35.4478 12.3683 34.6263 11.9998 33.7698 12H33.7713Z"
            fill="#969B9F"
          />
        </svg>
      </div>
      <div className="hist-dropdown">
        {/* <img src="/boilerplate/author.png" alt="creator" /> */}
      </div>
      <div className="hist-table">
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
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
                        console.log("heyo this is cell data ", cell);
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
        <div className="see-all">
          {tableInstance.rows?.length <= 5 ? (
            <span></span>
          ) : (
            <span onClick={() => onExpand()}>
              {rows.length > 5 ? "See Less" : "See All"}
            </span>
          )}
        </div>
      </div>
    </Style.Container>
  );
}

export default History;
