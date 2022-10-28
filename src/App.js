import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Active from "../src/images/active dot.png"; //importing picture for active status
import Inactive from "../src/images/inactive dot.png"; //importing picture for inactive status

function App() {
  const [data, setData] = useState(() => {});

  useEffect(() => {
    //defining function for api call
    async function fetchData() {
      //fetch api response with async await
      const fetchedData = await axios.post(
        "https://demo2211087.mockable.io/mock"
      );
    
      //executing code according to statuscode of response
      if (fetchedData.status === 200) {
        setData(fetchedData.data.companies);//setting data with the companies fields; values , recieved from api
      }
      else
      {
        fetchData();//if request fails then we can show error message. here the function is called again;
      }
    }
    //function call for api request
    fetchData();
  }, []);

  return (
    <div className="data">
      <h2>Result</h2>
      <table className="table">
        <thead id="thead">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        {data &&
          data.map((singleData, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{singleData.name}</td>
                  <td>{singleData.email}</td>
                  <td>
                    <div className="status">
                      {singleData.status === "active" ? (
                        <img src={Active} alt="active" />
                      ) : (
                        <img src={Inactive} alt="active" />
                      )}
                      <span
                        className={
                          singleData.status === "active"
                            ? "activetext"
                            : "inactivetext"
                        }
                      >
                        {singleData.status}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}

export default App;
