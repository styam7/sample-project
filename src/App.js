import { useState, useCallback } from "react";
import "./App.css";
import data from "./data.json";

const App = () => {
  const [courses, setCourses] = useState(data);
  const [filterValues, setFilterValues] = useState([]);
  const [toggle, setToggle] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const sortCourses = (e) => {
    const options = {
      "a-z": [...courses].sort((a, b) => (a < b ? -1 : 1)),
      "z-a": [...courses].sort((a, b) => (a < b ? 1 : -1)),
    };

    setCourses(options[e.target.value]);
  };

  const filteredData = courses.filter((course) =>
    filterValues.length > 0 ? filterValues.includes(course.university) : courses
  );

  console.log(filteredData);

  const filterHandler = (event) => {
    if (event.target.checked) {
      setFilterValues([...filterValues, event.target.value]);
    } else {
      setFilterValues(
        filterValues.filter(
          (filterValues) => filterValues !== event.target.value
        )
      );
    }
  };

  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 filter-container" style={{display: isOpen? "block": ''}}>
            <div className="filter-block">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Filters <span className="filter-close" onClick={closeModal} ><i className="fa fa-close" /></span>
                    <hr />
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">Offered By </h6>
                  <div className="filters">
                    {courses.map((item, id) => (
                      <div>
                        <input
                          type="checkbox"
                          data-id={id}
                          value={item.university}
                          onClick={filterHandler}
                        />
                        <label key={id}>{item.university}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 main-content">
            <div className="content-block">
              <div className="card mb-3">
                <div className="card-body course-box">
                  <h6 className="allcourse mt-2">
                    All Cources ({filteredData.length})
                  </h6>
                  <h6 className="filter-modal">
                    Filters: <input type="button" value="Offered by" onClick={openModal} style={{padding: '6px 15px', backgroundColor: 'white'}}/>
                  </h6>
                  <div className="sorting-block">
                    <div>Sort by : </div>
                    <select onChange={sortCourses} className="form-control">
                      <option value="a-z">A - Z</option>
                      <option value="z-a">Z - A</option>
                    </select>
                  </div>
                </div>
              </div>

              {filteredData.map((item, i) => (
                <div className="card mb-3" key={item.id}>
                  <div className="main-section">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <div className="card">
                            <div className="card-body">
                              <h6 className="card-subtitle mb-2 text-muted">
                                {item.subTitle}
                              </h6>
                              <h5 className="card-title">
                                {item.title} <hr />
                              </h5>
                              <h6 className="course-overview">
                                <span>Course Overview: </span>
                                {item.overview}
                              </h6>
                              {item.id === toggle ? (
                                <div className="card-body">
                                  <h6 className="course-overview">
                                    <span>Course Objective: </span>
                                    Upon compeleting this course you will be
                                    able to:
                                    <ul>
                                      {item.objective?.map((item) => (
                                        <li key={item.id} className="mt-2">
                                          {item.value}
                                        </li>
                                      ))}
                                    </ul>
                                  </h6>
                                  <h6 className="course-overview">
                                    <span>Eligibility: </span>
                                    <ul>
                                      {item.eligibility?.map((item) => (
                                        <li key={item.id} className="mt-2">
                                          {item.value}
                                        </li>
                                      ))}
                                    </ul>
                                  </h6>
                                  <h6 className="course-overview">
                                    <span>Assessment Method: </span>{" "}
                                    {item.assessment}
                                  </h6>
                                  <h6 className="course-overview">
                                    <span>Course Date: </span> {item.startDate}
                                  </h6>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="card-body">
                              <div className="enquiry-block">
                                <div>
                                  <i className="fa fa-address-card" />
                                  <h6>{item.university}</h6>
                                </div>
                                <div>
                                  <i className="fa fa-clock-o" />
                                  <h6>{item.days} days</h6>
                                </div>
                                <div>
                                  <i className="fa fa-id-card-o" />
                                  <h6>{item.mode}</h6>
                                </div>
                                <div>
                                  <i className="fa fa-calendar" />
                                  <h6>{item.startDate}</h6>
                                </div>
                                <div className="enquiry-class">
                                  <button>Enquiry Now</button>
                                </div>
                              </div>
                            </div>
                            <button
                              className="accordion-button-custom collapsed"
                              type="button"
                              onClick={() => handleToggle(item.id)}
                            >
                              {item.id === toggle ? (
                                <span>
                                  Read Less <i className="fa fa-arrow-up" />
                                </span>
                              ) : (
                                <span>
                                  Read More <i className="fa fa-arrow-down" />
                                </span>
                              )}
                            </button>
                          </div>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
