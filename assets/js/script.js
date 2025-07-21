'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// custom select variables - COMMENTED OUT (portfolio section removed)
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-selecct-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items - COMMENTED OUT (portfolio section removed)
// for (let i = 0; i < selectItems.length; i++) {
//   selectItems[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(select);
//     filterFunc(selectedValue);

//   });
// }

// filter variables - COMMENTED OUT (portfolio section removed)
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// add event in all filter button items for large screen - COMMENTED OUT (portfolio section removed)
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs.length > 0 && formBtn) {
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
}



// publications expansion variables
const publicationItems = document.querySelectorAll("[data-publication-item]");

// add click event to all publication items
if (publicationItems.length > 0) {
  for (let i = 0; i < publicationItems.length; i++) {
    publicationItems[i].addEventListener("click", function (event) {
      
      // Check if the clicked element is a popup image or inside a popup image
      if (event.target.classList.contains('publication-img-clickable') || 
          event.target.closest('.publication-img-clickable')) {
        return; // Don't expand/collapse if clicking on popup image
      }
      
      const abstractSection = this.querySelector(".publication-abstract");
      
      if (this.classList.contains("expanded")) {
        // Collapse
        this.classList.remove("expanded");
        abstractSection.style.display = "none";
      } else {
        // Expand
        this.classList.add("expanded");
        abstractSection.style.display = "block";
      }
      
    });
  }
}



// page navigation variables - wrapped in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
  try {
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");

    // add event to all nav link
    if (navigationLinks && navigationLinks.length > 0 && pages && pages.length > 0) {
      console.log("Navigation setup - found", navigationLinks.length, "nav links and", pages.length, "pages"); // Debug log
      
      for (let i = 0; i < navigationLinks.length; i++) {
        if (navigationLinks[i]) {
          navigationLinks[i].addEventListener("click", function (e) {
            e.preventDefault(); // Prevent any default behavior
            
            const targetPage = this.innerHTML.toLowerCase();
            console.log("Clicked nav:", targetPage); // Debug log

            for (let j = 0; j < pages.length; j++) {
              if (pages[j] && pages[j].dataset) {
                if (targetPage === pages[j].dataset.page) {
                  pages[j].classList.add("active");
                  if (navigationLinks[j]) navigationLinks[j].classList.add("active");
                  window.scrollTo(0, 0);
                  console.log("Activated page:", pages[j].dataset.page); // Debug log
                } else {
                  pages[j].classList.remove("active");
                  if (navigationLinks[j]) navigationLinks[j].classList.remove("active");
                }
              }
            }

          });
        }
      }
    } else {
      console.error("Navigation setup failed - nav links:", navigationLinks ? navigationLinks.length : 0, "pages:", pages ? pages.length : 0);
    }
  } catch (error) {
    console.error("Navigation setup error:", error);
  }
});



// MIDI player collapsible functionality
document.addEventListener('DOMContentLoaded', function() {
  const midiCollapsibles = document.querySelectorAll(".midi-embed-collapsible");
  
  midiCollapsibles.forEach(function(button) {
    button.addEventListener("click", function(event) {
      // Prevent the click from bubbling up to the publication item
      event.stopPropagation();
      
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
        
        // Initialize MIDI players when content becomes visible
        setTimeout(() => {
          const midiPlayers = content.querySelectorAll('midi-player');
          const midiVisualizers = content.querySelectorAll('midi-visualizer');
          
          // Force reload MIDI players
          midiPlayers.forEach(player => {
            if (player.src) {
              const src = player.src;
              player.src = '';
              setTimeout(() => {
                player.src = src;
              }, 100);
            }
          });
          
          // Force reload MIDI visualizers
          midiVisualizers.forEach(visualizer => {
            if (visualizer.src) {
              const src = visualizer.src;
              visualizer.src = '';
              setTimeout(() => {
                visualizer.src = src;
              }, 100);
            }
          });
        }, 200);
      }
    });
  });
  
  // Add event listener to MIDI content areas to prevent clicks from bubbling up
  const midiContents = document.querySelectorAll(".midi-embed-content");
  midiContents.forEach(function(content) {
    content.addEventListener("click", function(event) {
      event.stopPropagation();
    });
  });
  
  // Add error handling for MIDI files
  window.addEventListener('load', () => {
    const midiPlayers = document.querySelectorAll('midi-player');
    const midiVisualizers = document.querySelectorAll('midi-visualizer');
    
    midiPlayers.forEach(player => {
      player.addEventListener('error', (e) => {
        console.error('MIDI Player error:', e, 'Source:', player.src);
      });
    });
    
    midiVisualizers.forEach(visualizer => {
      visualizer.addEventListener('error', (e) => {
        console.error('MIDI Visualizer error:', e, 'Source:', visualizer.src);
      });
    });
  });
  
  // Generated Songs Explorer functionality
  let currentGenIndex = 0;
  const maxGenIndex = 99;
  
  const prevGenBtn = document.getElementById('prevGenBtn');
  const nextGenBtn = document.getElementById('nextGenBtn');
  const genSlider = document.getElementById('genSlider');
  const genIndexDisplay = document.getElementById('genIndexDisplay');
  const genSampleLabel = document.getElementById('genSampleLabel');
  const genVisualizer = document.getElementById('genVisualizer');
  const genPlayer = document.getElementById('genPlayer');
  
  function updateGenSample(index) {
    currentGenIndex = index;
    const filePath = `./assets/audio/gen2/GEN_generated_${index}.mid`;
    
    // Update display
    genIndexDisplay.textContent = `Sample ${index} / ${maxGenIndex}`;
    genSampleLabel.textContent = `Generated Sample ${index}`;
    
    // Update slider
    genSlider.value = index;
    
    // Update button states
    prevGenBtn.disabled = (index === 0);
    nextGenBtn.disabled = (index === maxGenIndex);
    
    // Update MIDI components
    if (genVisualizer && genPlayer) {
      // Stop current playback
      if (genPlayer.player) {
        genPlayer.player.stop();
      }
      
      // Update sources
      genVisualizer.src = filePath;
      genPlayer.src = filePath;
      
      // Force reload of components by removing and re-adding src
      setTimeout(() => {
        genVisualizer.removeAttribute('src');
        genPlayer.removeAttribute('src');
        setTimeout(() => {
          genVisualizer.src = filePath;
          genPlayer.src = filePath;
        }, 50);
      }, 100);
    }
  }
  
  // Event listeners for navigation controls
  if (prevGenBtn) {
    prevGenBtn.addEventListener('click', () => {
      if (currentGenIndex > 0) {
        updateGenSample(currentGenIndex - 1);
      }
    });
  }
  
  if (nextGenBtn) {
    nextGenBtn.addEventListener('click', () => {
      if (currentGenIndex < maxGenIndex) {
        updateGenSample(currentGenIndex + 1);
      }
    });
  }
  
  if (genSlider) {
    genSlider.addEventListener('input', (e) => {
      updateGenSample(parseInt(e.target.value));
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only handle keyboard navigation when the gen explorer is visible and active
    const genExplorerContent = document.querySelector('.gen-explorer-controls');
    if (genExplorerContent && genExplorerContent.closest('.midi-embed-content').style.display !== 'none') {
      if (e.key === 'ArrowLeft' && currentGenIndex > 0) {
        e.preventDefault();
        updateGenSample(currentGenIndex - 1);
      } else if (e.key === 'ArrowRight' && currentGenIndex < maxGenIndex) {
        e.preventDefault();
        updateGenSample(currentGenIndex + 1);
      }
    }
  });
  
  // Initialize the first sample
  setTimeout(() => {
    updateGenSample(0);
  }, 500);
});

// Image popup modal functionality (separate from other event listeners to avoid conflicts)
document.addEventListener('DOMContentLoaded', function() {
  const imageModalContainer = document.querySelector("[data-image-modal-container]");
  const imageOverlay = document.querySelector("[data-image-overlay]");
  const imageModalCloseBtn = document.querySelector("[data-image-modal-close-btn]");
  const popupModalImg = document.querySelector("[data-popup-modal-img]");
  const clickableImages = document.querySelectorAll(".publication-img-clickable");

  console.log("Image popup setup - found", clickableImages.length, "clickable images"); // Debug log

  // Image modal toggle function
  const imageModalFunc = function () {
    console.log("Toggling image modal"); // Debug log
    imageModalContainer.classList.toggle("active");
  }

  // Add click event to all clickable publication images
  clickableImages.forEach(function(img) {
    img.addEventListener("click", function(event) {
      // Prevent event bubbling to avoid conflicts
      event.stopPropagation();
      event.preventDefault();
      
      const imgSrc = this.getAttribute("data-popup-img");
      const imgAlt = this.getAttribute("alt");
      
      console.log("Image clicked:", imgSrc); // Debug log
      
      if (popupModalImg) {
        popupModalImg.src = imgSrc;
        popupModalImg.alt = imgAlt;
      }
      
      imageModalFunc();
    });
  });

  // Add click event to modal close button and overlay
  if (imageModalCloseBtn) {
    imageModalCloseBtn.addEventListener("click", imageModalFunc);
  }
  
  if (imageOverlay) {
    imageOverlay.addEventListener("click", imageModalFunc);
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModalContainer && imageModalContainer.classList.contains('active')) {
      imageModalFunc();
    }
  });
});