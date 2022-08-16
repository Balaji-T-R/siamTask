import "./DataGrid.css";

const DataGrid = (props) => {
  return (
    <div className="grid" id={props.tableId}>
      <table style={{ width: "100%", height: "200px" }}>
        <thead>
          <tr>
            <th onClick={props.idChangeHeader}>ID</th>
            <th onClick={props.NameChangeHeader}>
              Name
              <div>
                <input
                  type="text"
                  id="name"
                  ref={props.nameValue}
                  onChange={props.nameOnChangeGrid}
                />
              </div>
            </th>
            <th onClick={props.dateSortHandler}>
              Date Of Birth
              <div>
                <input type="date" id="dob" />
              </div>
            </th>
            <th onClick={props.cityChangeHeader}>
              City
              <div>
                <select
                  id="cityDropdown"
                  value={props.dtDropdown.city}
                  onChange={props.cityDropdownChange}
                >
                  <option>Select</option>
                  {props.dtDropdown &&
                    props.dtDropdown.map((el) => (
                      <option key={el.id} value={el.city}>
                        {el.city}
                      </option>
                    ))}
                </select>
              </div>
            </th>
            <th onClick={props.addressChangeHeader}>
              Address
              <div>
                <select
                  value={props.addDrop.city}
                  onChange={props.addDropdownChange}
                >
                  <option value="Select">Select</option>
                  {props.addDrop &&
                    props.addDrop.map((el) => (
                      <option key={el.id} value={el.address}>
                        {el.address}
                      </option>
                    ))}
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((el) => (
              <tr key={el.id}>
                <td>{el.id} <input type="checkbox"></input></td>
                <td>{el.fullName}</td>
                <td> {new Date(el.dateOfBirth).toLocaleDateString('en-CA')}</td>
                <td>{el.city}</td>
                <td> {el.address}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
