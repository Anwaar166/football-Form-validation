// ---------------- DOM ELEMENT REFERENCES ---------------- //
let imageBox = document.getElementById("drop-zone");
let imageInput = document.getElementById("fileUpload");
let messageDisplay = document.getElementById("fileList");
let imageChnager = document.getElementById("iamgeChange");
let imageReErrorLink = document.getElementById("anchorTag");
let name = document.getElementById("fname");
let cnic = document.getElementById("cnic");
let Birth = document.getElementById("Birth");
let address = document.getElementById("lane1");
let postalcode = document.getElementById("zipCode");
let weight = document.getElementById("Weight");
let height = document.getElementById("height");
let email = document.getElementById("email");
let button = document.getElementById("btn");
let allInputMessages = document.querySelectorAll("input");
let bmiMessage = document.getElementById("bmiCalculation");
let SmallTag = document.querySelector(".genderMessage");
let offenseMessage = document.querySelector(".offenseMessage");
let city = document.getElementById("city");
let inputappend = document.querySelector(".MainCityAreas");
let areas = document.getElementById("Areas");
let errorMesageArea = document.getElementById("erorrMessageArea");

// ---------------- IMAGE UPLOAD FUNCTIONALITY ---------------- //
// Clicking on the box opens file picker
imageBox.addEventListener("click", () => {
  imageInput.click();
});

// Validate image when user selects a file
imageInput.addEventListener("change", () => {
  imageBoxValidation(imageInput);

  if (imageInput.files.length > 0) {
    let file = imageInput.files[0];
    let maxsize = 2 * 1024 * 1024; // 2MB limit
    const allowedExtensions = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    // Invalid file type
    if (!allowedExtensions.includes(file.type)) {
      messageDisplay.innerHTML = `<span style="color:red;">Only image files allowed</span>`;
      return false;
    }

    // File too large
    if (file.size > maxsize) {
      let a = document.createElement("a");
      a.href = "https://share.google/QyRLCEwHu09fUAkOs";
      a.innerText = "Resize Image";
      messageDisplay.innerHTML = `<span style="color:red;">❌ File too large! Max size is 2 MB.</span>`;
      imageReErrorLink.appendChild(a);
      return false;
    }

    // Valid file → preview it
    messageDisplay.innerHTML = `<strong>File uploaded:</strong> <small>${file.name}</small><br>`;
    imageChnager.innerHTML = "";
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = "70px";
    img.style.marginTop = "10px";
    img.style.borderRadius = "8px";
    imageChnager.appendChild(img);
    return true;
  } else {
    messageDisplay.innerHTML = "<p>No file selected</p>";
    return false;
  }
});

// ---------------- CREATE EMPTY SMALL TAGS FOR ERRORS ---------------- //
allInputMessages.forEach((e) => {
  let small = document.createElement("small");
  e.after(small);
  small.innerHTML = "";
});

// ---------------- ERROR / SUCCESS HANDLERS ---------------- //
const errorMessage = (idName, message) => {
  let inputfield = document.getElementById(`${idName}`);
  inputfield.classList.remove("success");
  inputfield.classList.add("error");
  let smallTag = inputfield.nextElementSibling;
  smallTag.style.color = "red";
  smallTag.innerHTML = `*${message}`;
};

const successMessage = (idName, message = "") => {
  let inputfield = document.getElementById(`${idName}`);
  inputfield.classList.add("success");
  inputfield.classList.remove("error");
  let smallTag = inputfield.nextElementSibling;
  smallTag.style.color = "#2ecc71";
  smallTag.innerHTML = message;
};

// ---------------- REGEX HELPERS ---------------- //
function validateCNIC(cnic) { return /^[0-9]{5}[0-9]{7}[0-9]{1}$/.test(cnic.trim()); }
function validateAddress(address) { return /^[A-Za-z0-9\s,.\-\/]{4,40}$/.test(address.trim()); }
function validatePostal(postal) { return /^[0-9]{5}$/.test(postal.trim()); }
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); }
function validateHeight(height) { return height >= 50 && height <= 250; }
function validateWeight(weight) { return weight >= 50 && weight <= 100; }

// ---------------- FIELD VALIDATIONS ---------------- //
// Name validation
const nameValidation = (input) => {
  if (input.value == "") { errorMessage("fname", "Name empty"); return false; }
  else if (!/^[A-Za-z\s]+$/.test(input.value)) { errorMessage("fname", "Only letters allowed"); return false; }
  else if (input.value.length < 3) { errorMessage("fname", "Too short"); return false; }
  else if (input.value.length > 20) { errorMessage("fname", "Too long"); return false; }
  else { successMessage("fname","Valid Name"); return true; }
};

// CNIC validation
const cnicValidation = (input) => {
  if (input.value.trim() === "") { errorMessage("cnic", "CNIC empty"); return false; }
  else if (!validateCNIC(input.value)) { errorMessage("cnic", "Invalid CNIC"); return false; }
  else { successMessage("cnic", "Valid CNIC"); return true; }
};

// Birth validation
const birthValidation = (input) => {
  if(input.value==""){ errorMessage("Birth", "Select DOB"); return false; }
  else{ 
    let [year,month,day] = input.value.split("-");
    let date = new Date(year,month-1,day);
    let formatted = date.toLocaleDateString("en-GB");
    successMessage("Birth",`DOB: ${formatted}`); return true;
  }
};

// Address validation
const addressValidaion = (input) => {
  if(input.value==""){ errorMessage("lane1", "Enter Address"); return false; }
  else if(!validateAddress(input.value)){ errorMessage("lane1", "Invalid Address"); return false; }
  else{ successMessage("lane1", "Valid Address"); return true; }
};

// Custom Area validation (when user enters manually)
function ohterAreaValidation(input){
  if(input.value==""){ errorMesageArea.innerHTML="Enter Area Name"; errorMesageArea.style.color="#e74c3c"; input.style.border="2px solid #e74c3c"; return false; }
  else if(!validateAddress(input.value)){ errorMesageArea.innerHTML="Invalid Area Name"; errorMesageArea.style.color="#e74c3c"; input.style.border="2px solid #e74c3c"; return false; }
  else{ errorMesageArea.innerHTML="Valid Area"; errorMesageArea.style.color="#2ecc71"; input.style.border="2px solid #2ecc71"; return true; }
}

// Postal code validation
const postalValidation = (input) => {
  if (input.value.trim() === "") { errorMessage("zipCode", "Enter Postal Code"); return false; }
  else if (!validatePostal(input.value)) { errorMessage("zipCode", "Must be 5 digits"); return false; }
  else { successMessage("zipCode", "Valid Postal Code"); return true; }
};

// Email validation
const emailValidation = (input) => {
  if (input.value.trim() === "") { errorMessage("email", "Enter Email"); return false; }
  else if (!validateEmail(input.value)) { errorMessage("email", "Invalid Email"); return false; }
  else { successMessage("email", "Valid Email"); return true; }
};

// Height validation
const heightValidation = (input) => {
  if (input.value.trim() === "") { errorMessage("height", "Enter Height"); return false; }
  else if (!validateHeight(parseInt(input.value))) { errorMessage("height", "Range 50-250cm"); return false; }
  else { successMessage("height", "Valid Height"); return true; }
};

// Weight validation
const weightValidation = (input) => {
  if (input.value.trim() === "") { errorMessage("Weight", "Enter Weight"); return false; }
  else if (!validateWeight(parseInt(input.value))) { errorMessage("Weight", "Range 50-100kg"); return false; }
  else { successMessage("Weight", "Valid Weight"); return true; }
};

// BMI calculator
function bmiCalculator(height, weight) {
  if (!height || !weight || height <= 0 || weight <= 0) return false;
  let heightInMeters = height / 100;
  let bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  let category = bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Normal weight" : bmi < 29.9 ? "Overweight" : "Obese";
  bmiMessage.innerHTML=`BMI: ${bmi} (${category})`;
  return true;
}

// Image validation (empty or not)
const imageBoxValidation=(input)=>{
  if (input.files.length <=0) { errorMessage("fileUpload", "Upload photo"); return false; }
  else{ successMessage("fileUpload", "Valid Image"); return true; }
};

// Gender validation
const genderValidation=()=>{
  let gender = document.querySelector(`.genderBox input[name="gender"]:checked`);
  if(!gender){ SmallTag.style.color="red"; SmallTag.innerHTML="*Select Gender"; return false; }
  else{ SmallTag.style.color="#2ecc71"; SmallTag.innerHTML=`Gender: ${gender.value}`; return true; }
};

// Offense/Defence validation
const offenseValidation=()=>{
  let offenseInput = document.querySelector(`.OffenseBox input[name="off/def"]:checked`);
  if(!offenseInput){ offenseMessage.style.color="red"; offenseMessage.innerHTML="*Select Option"; return false; }
  else{ offenseMessage.innerHTML=""; return true; }
};

// ---------------- CITY & AREA DROPDOWN ---------------- //
function cityAreasUpdate() {
  if (city.value === "attock") {
    areas.innerHTML = `
      <option value="attock_main">Main Attock City</option>
      <option value="mirza">Mirza</option>
      <option value="shakardara">ShakarDara</option>
      <option value="shamsabad">Shamsabad</option>
      <option value="sadar">Sadar</option>
      <option value="other">Other Area</option>`;
  } else if (city.value === "kamera") {
    areas.innerHTML = `
      <option value="kamera_main">Main Kamera</option>
      <option value="kamra_khurd">Kamra Khurd</option>
      <option value="kamra_kalan">Kamra Kalan</option>
      <option value="sultan_town">Sultan Town</option>
      <option value="pac_colony">PAC Colony</option>
      <option value="other">Other Area</option>`;
  }
}
cityAreasUpdate();
city.addEventListener("change", cityAreasUpdate);

// Add custom input field if user selects "Other Area"
areas.addEventListener("change", () => {
  let existingInput = document.getElementById("customArea");
  if (areas.value === "other") {
    if (!existingInput) {
      let input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter your Area";
      input.id = "customArea"; 
      input.style.width = "95%";
      input.style.height = "2rem";
      inputappend.after(input);
    }
  } else {
    if (existingInput) { existingInput.remove(); errorMesageArea.innerHTML = ""; }
  }
});

// ---------------- LIVE FIELD VALIDATIONS ---------------- //
name.addEventListener("input", () => { nameValidation(name); });
cnic.addEventListener("input", () => { cnicValidation(cnic); });
Birth.addEventListener("change", () => { birthValidation(Birth); });
address.addEventListener("input", () => { addressValidaion(address); });
postalcode.addEventListener("input", () => { postalValidation(postalcode); });
email.addEventListener("input", () => { emailValidation(email); });
height.addEventListener("input", () => { heightValidation(height); });
weight.addEventListener("input", () => { weightValidation(weight); });
imageInput.addEventListener("change", () => { imageBoxValidation(imageInput); });
document.querySelectorAll(".genderBox input[name='gender']").forEach(el => {
  el.addEventListener("change", genderValidation);
});
document.querySelectorAll(".OffenseBox input[name='off/def']").forEach(el => {
  el.addEventListener("change", offenseValidation);
});

// Attach validation for dynamic "custom area" field
areas.addEventListener("change", () => {
  let dynamicCustomArea = document.getElementById("customArea");
  if (dynamicCustomArea) {
    dynamicCustomArea.addEventListener("input", () => {
      ohterAreaValidation(dynamicCustomArea);
    });
  }
});

// ---------------- FORM SUBMIT ---------------- //
button.addEventListener("click", (event) => {
  event.preventDefault();

  // Validate all fields at once
  let isValid =
    nameValidation(name) &
    cnicValidation(cnic) &
    birthValidation(Birth) &
    addressValidaion(address) &
    postalValidation(postalcode) &
    emailValidation(email) &
    heightValidation(height) &
    weightValidation(weight) &
    imageBoxValidation(fileUpload) &
    genderValidation() &
    offenseValidation();

  // Validate custom area (if exists)
  let dynamicCustomArea = document.getElementById("customArea");
  if (dynamicCustomArea) {
    isValid &= ohterAreaValidation(dynamicCustomArea);
  }

  // Final submission logic
  if (isValid) {
    if (confirm("You want to submit the form?")) {
      bmiCalculator(height.value, weight.value);
       setTimeout(()=>{
      Swal.fire({
      icon: "success",
      title: "Form Submitted!",
      text: "✅ Your form has been successfully submitted.",
       backdrop: false,
      confirmButtonText: "OK"
    });
  },1000)
    }
  } else {
    alert("❌ Fill all fields.");
  }
});
