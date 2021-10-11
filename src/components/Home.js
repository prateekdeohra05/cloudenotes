import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <div className="notesContainer">
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
