import { useState, useEffect } from "react";
import axios from "axios";
import DataGrid from "./DataGrid";
import { useRef } from "react";

const Logs = () => {
  const [data, setData] = useState([]);

  const [dtDrop, setDtDrop] = useState([]);

  const [addDrop, setaddDrop] = useState([]);

  useEffect(() => {
    axios.get("https://api-generator.retool.com/biv572/data").then((res) => {
      setData(res.data);
      setDtDrop(res.data);
      setaddDrop(res.data);
    });
  }, []);

  let cellid = "tableId";

  let tdFullNameId = "fullNameId";
  let valueRef = useRef("");

  const nameChangeHandle = (e) => {
    if (e.target.value !== "") {
      const dt = data.filter((el) => {
        return el.fullName.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setData(dt);
    } else {
      setData(dtDrop);
    }
  };

  const cityChangeHandle = (e) => {
    const dt = dtDrop.filter((el) => {
      return el.city.toLowerCase() === e.target.value.toLowerCase();
    });

    dtDrop.map((ele) => {
      if (e.target.value !== "Select") {
        return setData(dt);
      } else {
        return setData(dtDrop);
      }
    });
  };

  const addressChangeHandle = (e) => {
    const dt = addDrop.filter((el) => {
      return el.address.toLowerCase() === e.target.value.toLowerCase();
    });

    addDrop.map((ele) => {
      if (e.target.value !== "Select") {
        return setData(dt);
      } else {
        return setData(addDrop);
      }
    });
  };

  

  const sortNameHandler = () => {
    let dt = [...data].sort((a, b) => (a.fullName > b.fullName ? 1 : -1));

    return setData(dt);
  };

  const addressChangeHandler = () => {
    let dt = [...data].sort((a, b) => (a.city > b.city ? 1 : -1));

    return setData(dt);
  };

  const idChangeHeader = () => {
    let dt = [...data].sort((a, b) => a.id - b.id);

    return setData(dt);
  };

  const cityChangeHandler = () => {
    let dt = [...data].sort((a, b) => (a.city > b.city ? 1 : -1));

    return setData(dt);
  };

  const dateSortHandler = () => {
    let dt = [...data].sort((a, b) => (b.dateofBirth > a.dateofBirth ? 1 : -1));

    return setData(dt);
  };

  useEffect(() => {
    // var table = document.getElementById('tableId')
    var cell = document.getElementsByTagName("td");

    for (var i = 0; i < cell.length; i++) {
      cell[i].onclick = function () {
        if (this.hasAttribute("data-click")) {
          return;
        }

        this.setAttribute("data-click", "yes");
        this.setAttribute("data-text", this.innerHTML);
        console.log(this.innerHTML)

        if (this.innerHTML.includes("-")) {
          var inputDt = document.createElement("input");
          inputDt.setAttribute("type", "date");
          inputDt.value = this.innerHTML;
          inputDt.style.width = "12 px";
          inputDt.style.height = "15 px";
          inputDt.style.backgroundColor = "Green";

          inputDt.onblur = function () {
            var td = inputDt.parentElement;
            var orginalText = inputDt.parentElement.getAttribute("data-text");
            var currentText = this.value;

            if (orginalText !== currentText) {
              td.removeAttribute("data-click");
              td.removeAttribute("data-text");
              td.innerHTML = currentText;
            } else {
              td.removeAttribute("data-click");
              td.removeAttribute("data-text");
              td.innerHTML = orginalText;
            }
          };

          this.innerHTML = "";
          this.append(inputDt);
          this.firstElementChild.select();
        } else {
          var input = document.createElement("input");
          input.setAttribute("type", "text");
          input.value = this.innerHTML;
          input.style.width = "12 px";
          input.style.height = "15 px";
          input.style.backgroundColor = "LightBlue";

          input.onblur = function () {
            var td = input.parentElement;
            var orginalText = input.parentElement.getAttribute("data-text");
            var currentText = this.value;

            if (orginalText !== currentText) {
              td.removeAttribute("data-click");
              td.removeAttribute("data-text");
              td.innerHTML = currentText;
            } else {
              td.removeAttribute("data-click");
              td.removeAttribute("data-text");
              td.innerHTML = orginalText;
            }
          };

          this.innerHTML = "";
          this.append(input);
          this.firstElementChild.select();
        }
      };
    }
  });

  return (
    <div>
      <p>Grid Data</p>

      <DataGrid
        data={data}
        nameOnChangeGrid={nameChangeHandle}
        nameValue={valueRef}
        cityValue={dtDrop.city}
        dtDropdown={dtDrop}
        cityDropdownChange={cityChangeHandle}
        tableId={cellid}
        addDrop={addDrop}
        addDropdownChange={addressChangeHandle}
        NameChangeHeader={sortNameHandler}
        addressChangeHeader={addressChangeHandler}
        cityChangeHeader={cityChangeHandler}
        idChangeHeader={idChangeHeader}
        //nameSHowHandler={nameSHowHandler}
        fullId={tdFullNameId}
        dateSortHandler={dateSortHandler}
      />
    </div>
  );
};

export default Logs;
