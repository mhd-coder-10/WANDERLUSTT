
// PROJECT PHASE 1 (PART - C) (FOLLOWIND CODE IS BOOTSTRAP CODE)

// Example starter JavaScript for disabling form submissions if there are invalid fields

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


// text-switch button functionality  (all Listings page )
let textSwitch = document.getElementById("flexSwitchCheckDefault");
textSwitch.addEventListener("click", ()=>{
  let text_info = document.querySelectorAll(".text-info");
  for(info of text_info) {
    if(info.style.display != "inline") {
      info.style.display = 'inline';
    } else {
      info.style.display = 'none';
    }
  }  
});

// filter hide for responsive



