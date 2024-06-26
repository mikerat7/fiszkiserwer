import React, { useEffect, useState } from "react";
import "./style.scss";
import { language_fetch } from "../../network_manager";

function Create() {
  const [language, setlanguage] = useState(0);
  useEffect(async()=>{
    await language_fetch()
.then((response) => response.json())
.then((result) => {
  let arr = []
  for(let item of result){
  arr.push((<option value={item.Id}>{item.Name}</option>))
  }
  setlanguage(arr)
})
    let form = document.getElementById("create_form")
    let errmsg = document.getElementById("errormsg")

    form["create"].onclick = async (ev)=>{
      const name = form["name"].value
      const lang1 = form["lang1"].value
      const lang2 = form["lang2"].value
      const set = form["set"].value
    }
  }, [])

  
  return (
    <>
      <div id="content">
       <form id="create_form">
       <label for="name">Set name:</label><br />
          <input type="text" id="name" name="name" ></input><br />
          <label for="lang1">First language:</label><br />
          <select id="lang1" name="lang1">{language}</select><br />
          <label for="lang2">Second Language:</label><br />
          <select id="lang2" name="lang2" >{language}</select><br />
          <label for="set">Set:</label><br />
          <select id="set" name="set" ></select><br />
          <input type="button" id="create" name="create" value="Create"></input>
       </form>
      </div>
    </>
  );
}

export default Create;
