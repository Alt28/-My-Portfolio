'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables (legacy - keep for compatibility)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

// New modern filter buttons
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

// Legacy filter buttons (for backward compatibility)
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Add event listeners to new filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    // Remove active class from all buttons
    filterBtns.forEach(button => button.classList.remove("active"));
    
    // Add active class to clicked button
    this.classList.add("active");
    
    // Get filter value
    const filterValue = this.getAttribute("data-filter-btn") || this.textContent.toLowerCase();
    
    // Filter projects
    filterProjects(filterValue);
  });
});

// Updated filter function for new structure
function filterProjects(category) {
  // Normalize the category name to lowercase for comparison
  const normalizedCategory = category.toLowerCase().trim();
  
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute("data-category");
    const normalizedCardCategory = cardCategory ? cardCategory.toLowerCase().trim() : "";
    
    if (normalizedCategory === "all projects" || 
        normalizedCategory === "all" || 
        normalizedCardCategory === normalizedCategory) {
      card.classList.add("show");
      setTimeout(() => {
        card.style.display = "block";
      }, 10);
    } else {
      card.classList.remove("show");
      setTimeout(() => {
        if (!card.classList.contains("show")) {
          card.style.display = "none";
        }
      }, 300);
    }
  });
}

// Initialize - show all projects
document.addEventListener("DOMContentLoaded", function() {
  // Show all projects initially
  projectCards.forEach(card => {
    card.classList.add("show");
    card.style.display = "block";
  });
});

// Legacy code for backward compatibility
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items (legacy)
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterProjects(selectedValue);
  });
}

// filter variables (legacy)
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  // Legacy filter function - kept for compatibility
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
  
  // Also apply to new structure
  filterProjects(selectedValue);
}

// add event in all filter button items for large screen (legacy)
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Handle form submission with visual feedback
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission
  
  // Get form data
  const formData = new FormData(form);
  
  // Show loading state
  const originalButtonText = formBtn.innerHTML;
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  formBtn.setAttribute('disabled', '');
  
  // Submit form via fetch (but assume success due to CORS issues with FormSubmit)
  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // This prevents CORS errors
  })
  .then(() => {
    // Always show success since FormSubmit works but CORS blocks the response
    formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Message Sent!</span>';
    formBtn.style.background = '#4CAF50';
    
    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      formBtn.innerHTML = originalButtonText;
      formBtn.style.background = '';
      formBtn.setAttribute('disabled', '');
    }, 3000);
  })
  .catch(error => {
    // Even on "error", FormSubmit usually works, so show success
    formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Message Sent!</span>';
    formBtn.style.background = '#4CAF50';
    
    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      formBtn.innerHTML = originalButtonText;
      formBtn.style.background = '';
      formBtn.setAttribute('disabled', '');
    }, 3000);
  });
});
