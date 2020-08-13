import React, { Component } from "react";
import Popup from "reactjs-popup";
import Logo from "./addlogo.png";
import redcircle from "./Ellipse_red.png";
import greencircle from "./Ellipse_green.png";
import orangecircle from "./Ellipse_orange.png";
import edit from "./edit.png";
import deleteicon from "./delete.png";
import "./counter.css";

function FetchDate() {
  var tempDate = new Date();
  var months = [
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
    "December",
  ];
  var days = ["Sun", "Mon", "Tue", "Wen", "Thur", "Fri", "Sat"];
  var monthname = months[tempDate.getMonth()];
  var dayname = days[tempDate.getDay()];
  const currDate = dayname + " " + monthname;

  return currDate;
}
function FetchTime() {
  var tempDate = new Date();
  if (tempDate.getHours() < 9) {
    var hours = "0" + tempDate.getHours();
  } else {
    var hours = tempDate.getHours();
  }
  if (tempDate.getMinutes() < 9) {
    var minutes = "0" + tempDate.getMinutes();
  } else {
    var minutes = tempDate.getMinutes();
  }
  const currDate = hours + ":" + minutes;

  return currDate;
}
function Loadtask() {
  if (localStorage.getItem("taskcount") === null) {
    localStorage.setItem("taskcount", "0");
    var taskcount = 0;
  } else {
    var taskcount = parseInt(localStorage.getItem("taskcount"));
  }

  var count = 1;
  var list = [];
  while (count <= taskcount) {
    if (JSON.parse(localStorage.getItem(count)) !== null)
      list.push(JSON.parse(localStorage.getItem(count)));
    count += 1;
  }

  var TaskList = () => (
    <ul>
      {list.map((list) => (
        <li key={list.id} style={{ listStyle: "none" }}>
          <p className="listelementcontainer">
            <p className="listelements colorcircle">
              <p style={{ display: list[2] }}>
                <img src={redcircle} alt={list[1]} />
              </p>
              <p style={{ display: list[3] }}>
                <img src={orangecircle} alt={list[1]} />
              </p>
              <p style={{ display: list[4] }}>
                <img src={greencircle} alt={list[1]} />
              </p>
            </p>
            <p className="listelements listtitle"> {list[0]}</p>
            <p className="listelements editpopup">
              <ControlledEditPopup TaskID={list[6]} />
            </p>
            <p>
              <DeletePopup TaskID={list[6]} />
            </p>
          </p>
        </li>
      ))}
    </ul>
  );
  return <TaskList />;
}
class DeletePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskKey: this.props.TaskID,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangetaskKey = this.handleChangetaskKey.bind(this);
  }
  handleChangetaskKey(event) {
    this.setState({ taskKey: event.target.value });
  }
  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleSubmit(event) {
    localStorage.removeItem(this.state.taskKey);
    event.preventDefault();
    window.location.reload();
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <Popup
          trigger={
            <button className="ButtonDelete">
              <img src={deleteicon} alt="Delete Task" />
            </button>
          }
          modal
          on="click"
          open={this.state.isOpen}
          onOpen={this.handleOpen}
        >
          <div className="deletepopup">
            <p className="warningmessage">
              Are you sure you want to delete this task ?
            </p>
            <button className="ButtonYes" onClick={this.handleSubmit}>
              Yes
            </button>
            <button className="ButtonNo" onClick={this.handleClose}>
              No
            </button>
          </div>
        </Popup>
      </div>
    );
  }
}

class ControlledEditPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: "",
      priority: "",
      date: new Date(),
      taskKey: this.props.TaskID,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangetaskKey = this.handleChangetaskKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChangeName(event) {
    this.setState({ value: event.target.value });
  }

  handleChangePriority(event) {
    this.setState({ priority: event.target.value });
  }

  handleChangeDate(event) {
    this.setState({ date: event.target.value });
  }

  handleChangetaskKey(event) {
    this.setState({ taskKey: event.target.value });
  }

  handleSubmit(event) {
    var red = "none";
    var orange = "none";
    var green = "none";

    if (this.state.priority === "High") {
      var red = "block";
    } else if (this.state.priority === "Medium") {
      var orange = "block";
    } else if (this.state.priority === "Low") {
      var green = "block";
    }
    localStorage.setItem(
      this.state.taskKey,
      JSON.stringify([
        this.state.value,
        this.state.priority,
        red,
        orange,
        green,
        this.state.date,
        this.state.taskKey,
        this.state.completed,
      ])
    );
    event.preventDefault();
    window.location.reload();
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <Popup
          trigger={
            <button className="ButtonEdit">
              <img src={edit} alt="Add Task" />
            </button>
          }
          modal
          on="click"
          open={this.state.isOpen}
          onOpen={this.handleOpen}
        >
          <form onSubmit={this.handleSubmit} className="form">
            <label>
              <p className="formtext formtitle">Edit Task</p>
              <p>
                <p className="formtext">Task</p>
                <input
                  className="TextInput"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChangeName}
                  required="true"
                />
              </p>
              <p className="formtext">Priority</p>
              <p className="radiocontainer">
                <p className="redbox">
                  <input
                    type="radio"
                    value="High"
                    checked={this.state.priority === "High"}
                    onChange={this.handleChangePriority}
                    name="priority"
                    required="true"
                  />
                  <p className="radiotext">High</p>
                </p>
                <p className="orangebox">
                  <input
                    type="radio"
                    value="Medium"
                    checked={this.state.priority === "Medium"}
                    onChange={this.handleChangePriority}
                    name="priority"
                  />
                  <p className="radiotext">Medium</p>
                </p>
                <p className="greenbox">
                  <input
                    type="radio"
                    value="Low"
                    checked={this.state.priority === "Low"}
                    onChange={this.handleChangePriority}
                    name="priority"
                  />
                  <p className="radiotext">Low</p>
                </p>
              </p>
              <p className="formtext">Date</p>
              <p>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required="true"
                  onChange={this.handleChangeDate}
                  className="center_element"
                ></input>
              </p>
            </label>
            <br></br>
            <p className="submitbuttoncontainer">
              <input className="submitbutton" type="submit" value="SUBMIT" />
            </p>
          </form>
        </Popup>
      </div>
    );
  }
}

class ControlledPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      value: "",
      priority: "",
      date: new Date(),
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChangeName(event) {
    this.setState({ value: event.target.value });
  }

  handleChangePriority(event) {
    this.setState({ priority: event.target.value });
  }

  handleChangeDate(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    var red = "none";
    var orange = "none";
    var green = "none";
    if (this.state.priority === "High") {
      var red = "block";
    } else if (this.state.priority === "Medium") {
      var orange = "block";
    } else if (this.state.priority === "Low") {
      var green = "block";
    }
    localStorage.setItem(
      (parseInt(localStorage.getItem("taskcount")) + 1).toString(),
      JSON.stringify([
        this.state.value,
        this.state.priority,
        red,
        orange,
        green,
        this.state.date,
        parseInt(localStorage.getItem("taskcount")) + 1,
        false,
      ])
    );
    event.preventDefault();
    localStorage.setItem(
      "taskcount",
      (parseInt(localStorage.getItem("taskcount")) + 1).toString()
    );
    window.location.reload();
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <Popup
          trigger={
            <button className="ButtonAdd">
              <img src={Logo} alt="Add Task" />
            </button>
          }
          modal
          on="click"
          open={this.state.isOpen}
          onOpen={this.handleOpen}
        >
          <form onSubmit={this.handleSubmit} className="form">
            <label>
              <p className="formtext formtitle">Add Task</p>
              <p>
                <p className="formtext">Task</p>
                <input
                  className="TextInput"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChangeName}
                  required="true"
                />
              </p>
              <p className="formtext">Priority</p>
              <p className="radiocontainer">
                <p className="redbox">
                  <input
                    type="radio"
                    value="High"
                    checked={this.state.priority === "High"}
                    onChange={this.handleChangePriority}
                    name="priority"
                    required="true"
                  />
                  <p className="radiotext">High</p>
                </p>
                <p className="orangebox">
                  <input
                    type="radio"
                    value="Medium"
                    checked={this.state.priority === "Medium"}
                    onChange={this.handleChangePriority}
                    name="priority"
                  />
                  <p className="radiotext">Medium</p>
                </p>
                <p className="greenbox">
                  <input
                    type="radio"
                    value="Low"
                    checked={this.state.priority === "Low"}
                    onChange={this.handleChangePriority}
                    name="priority"
                  />
                  <p className="radiotext">Low</p>
                </p>
              </p>
              <p className="formtext">Date</p>
              <p>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required="true"
                  onChange={this.handleChangeDate}
                  className="center_element"
                ></input>
              </p>
            </label>
            <br></br>
            <p className="submitbuttoncontainer">
              <input className="submitbutton" type="submit" value="SUBMIT" />
            </p>
          </form>
        </Popup>
      </div>
    );
  }
}
class Counter extends Component {
  constructor() {
    super();
    this.state = {
      todostyle: "ButtonToDo",
      completedstyle: "ButtonCompleted",
      todo: true,
    };
  }

  todotoggle = () => {
    this.setState({ todo: true });
    this.setState({ todostyle: "ButtonToDo" });
    this.setState({ completedstyle: "ButtonCompleted" });
  };

  completedtoggle = () => {
    this.setState({ todo: true });
    this.setState({ todostyle: "ButtonCompleted" });
    this.setState({ completedstyle: "ButtonToDo" });
  };
  render() {
    return (
      <React.Fragment>
        <div className="body">
          <body className="topbanner">
            <p className="date">
              <FetchDate />
            </p>
            <p className="time">
              <FetchTime />
            </p>
          </body>
          <br></br>
          <p className="ButtonContainer">
            <p className="ButtonTodoContainer">
              <button
                className={this.state.todostyle}
                onClick={this.todotoggle}
              >
                To Do
              </button>
            </p>
            <p className="ButtonCompletedContainer">
              <button
                className={this.state.completedstyle}
                onClick={this.completedtoggle}
              >
                Completed
              </button>
            </p>
          </p>
          <br></br>
          <Loadtask />
          <ControlledPopup />
        </div>
      </React.Fragment>
    );
  }
}

export default Counter;
