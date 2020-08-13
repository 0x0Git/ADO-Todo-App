import React, { Component } from "react";
import "./login.css";

function send() {
  //create XMLHTTPRequest
  var xhr = new XMLHttpRequest();
  //get callback
  xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
  });

  //insert api into the following line
  xhr.open(
    "GET",
    "http://api.todolist.ado.sg/sendemail/index.php?sendto=" +
      "var aaron.liwh@gmail.com" +
      "&name=" +
      "var Bobby" +
      "&message=" +
      "var hello"
  );
  xhr.send();
}

class Loginpage extends React.Component {
  render() {
    return (
      <h1>
        <button onClick={send()}> Hello</button>
      </h1>
    );
  }
}
export default Loginpage;
