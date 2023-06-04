const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");
// Event listener for the form click: This triggers a click event on the fileInput element, opening the file selection dialog.
form.addEventListener("click", () =>{
  fileInput.click();
});
// Event listener for the file input change: The onchange property is assigned an arrow function as its callback.
// The arrow function receives an event object, and the target property of the event object is destructured to obtain the target element
fileInput.onchange = ({target})=>{
    // Inside the callback function, the first file from the selected files is retrieved using target.files[0].
  let file = target.files[0];
 // If a file is selected (if (file)), the file name is extracted from the name property of the file object.
  if(file){
    let fileName = file.name;
    //If the length of the file name is greater than or equal to 12 characters, it is truncated and appended with ellipsis to ensure it fits within a specific length.
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    // The uploadFile function is called with the modified fileName as the argument, initiating the file upload process.
    uploadFile(fileName);
  }
}
//Create a new XMLHttpRequest object: upload a file to a server using AJAX (Asynchronous JavaScript and XML).
function uploadFile(name){
    //Open a POST request to the server: The XMLHttpRequest object is used to make HTTP requests to the server.
  let xhr = new XMLHttpRequest();
 // the open method prepares the AJAX request to be sent to the server.
  xhr.open("POST", "php/upload.php");
  // Set up an event listener for progress updates: It listens for the "progress" event and executes a callback function when the event is triggered.
    // The callback function receives an event object with information about the progress of the file upload.
    // Destructuring assignment is used to extract the loaded and total properties from the event object.
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
   // The fileTotal variable represents the total file size in kilobytes.
   // If the fileTotal is less than 1024 kilobytes, it is displayed in kilobytes. Otherwise, it is converted to megabytes
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    //Update the progress area: The uploadedArea element is given the class "onprogress" to indicate that an upload is in progress.
    // The progressHTML is added to the progressArea element, displaying the progress information and a progress bar.
    uploadedArea.classList.add("onprogress");
    //Check if the file upload is complete: If the loaded amount is equal to the total amount, it means the file upload is complete.
    //In this case, the progressArea is cleared and an HTML template string representing the uploaded file information is created.    
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  // Send the file data to the server
  let data = new FormData(form);
  xhr.send(data);
}