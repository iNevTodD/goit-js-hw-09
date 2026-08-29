const formData = {
  email: "",
  message: "",
};

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener("input", (event) => {
    const currentTarget = event.target;
    formData[currentTarget.name] = currentTarget.value.trim();
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
});

const savedData = localStorage.getItem("feedback-form-state");

if(savedData){
    Object.assign(formData, JSON.parse(savedData));

    for(const element of feedbackForm.elements){
        if(element.type !== "submit"){
            element.value = formData[element.name];
        }
    }
}

feedbackForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    if(isEmptyValue(formData)){
        alert("Fill please all fields");
    }else{
        console.log(formData);
        localStorage.removeItem("feedback-form-state");
        setEmptyValues(formData);
        feedbackForm.reset();
    }
})

function isEmptyValue(obj){
    for(const value of Object.values(obj)){
        if(value === ""){
            return true;
        }
    }
    return false;
}

function setEmptyValues(obj){
    for(const key of Object.keys(obj)){
        obj[key] = "";
    }
}