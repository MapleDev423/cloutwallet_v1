import { useTable, useSortBy } from "react-table";
import { Style } from "./mobileTable.styles";

function MobileTable({ columns, data, dark }) {
  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Style.Table {...getTableProps()} dark={dark}>
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
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
    </Style.Table>
  );
}

export default MobileTable;
