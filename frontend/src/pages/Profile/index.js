import React, { useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";

function Profile() {

  useEffect(()=>{
    if(!LoginMan.loggedin()){
      window.location = "/"
    }

    const input = document.querySelector("#pfp_upload");
    const preview = document.querySelector(".preview");
    
    input.style.opacity = 0;
    
    input.addEventListener("change", updateImageDisplay);
    
    function updateImageDisplay() {
      while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }
    
      const curFiles = input.files;
      if (curFiles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "No files currently selected for upload";
        preview.appendChild(para);
      } else {
        const list = document.createElement("ol");
        preview.appendChild(list);
    
        for (const file of curFiles) {
          const listItem = document.createElement("li");
          const para = document.createElement("p");
          if (validFileType(file)) {
            para.textContent = `File name ${file.name}, file size ${returnFileSize(
              file.size,
            )}.`;
            const image = document.createElement("img");
            image.src = URL.createObjectURL(file);
    
            listItem.appendChild(image);
            listItem.appendChild(para);
          } else {
            para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
            listItem.appendChild(para);
          }
    
          list.appendChild(listItem);

          document.getElementById("pfp_submit").addEventListener("click", async (ev) => {
            const currFiles = input.files;
            if(currFiles.length === 0){
              return;
            }
            
            if(await LoginMan.changepfp(currFiles[0])){
              await LoginMan.UpdateUserInfo()
              window.location = window.location
            }

            ev.preventDefault()
          })
        }
      }
    }
    
    // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
    const fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];
    
    function validFileType(file) {
      return fileTypes.includes(file.type);
    }
    
    function returnFileSize(number) {
      if (number < 1024) {
        return `${number} bytes`;
      } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
      } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
      }
    }
  }, [])
  
  return (
    <>
      <div id="content">
        <h1>Witaj, {LoginMan.username()}!</h1>
        <form id="pfp_form">
        <div>
          <label for="pfp_upload">Choose images to upload (PNG, JPG)</label>
          <input
            type="file"
            id="pfp_upload"
            name="pfp_upload"
            accept=".jpg, .jpeg, .png"/>
        </div>
        <div class="preview">
          <p>No files currently selected for upload</p>
        </div>
        <div>
          <input type="button" id="pfp_submit" value="Submit" />
        </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
