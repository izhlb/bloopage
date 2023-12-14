function toggleBlur() {
    var textElement = document.getElementById('ipSpan');

    // Check if the text is already blurred
    if (textElement.style.filter === 'blur(7px)') {
        // If blurred, remove the blur effect
        textElement.style.filter = 'none';
        // Update local storage to reflect the state
        localStorage.setItem('blurState', 'off');
    } else {
        // If not blurred, apply the blur effect
        textElement.style.filter = 'blur(7px)'; // You can adjust the blur amount as needed
        // Update local storage to reflect the state
        localStorage.setItem('blurState', 'on');
    }
}

// Add a click event listener to the text element
document.getElementById('ipSpan').addEventListener('click', toggleBlur);

// Check local storage for the blur state on page load
document.addEventListener('DOMContentLoaded', function () {
    var blurState = localStorage.getItem('blurState');
    var textElement = document.getElementById('ipSpan');

    // Apply or remove the blur effect based on the stored state
    if (blurState === 'on') {
        textElement.style.filter = 'blur(5px)';
    } else {
        textElement.style.filter = 'none';
    }
});

var currentDate = new Date();
var targetDate = new Date(currentDate.getFullYear() + 1, 0, 11);
var timeDiff = targetDate - currentDate;
var remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
var countdownElement = document.getElementById("countdown");
countdownElement.textContent = remainingDays + " days remaining";

var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.toLocaleString('default', { month: 'long' });
var day = String(currentDate.getDate()).padStart(2, '0');

var formattedDate = month + ' ' + day + ', ' + year;

var dateElement = document.getElementById('date');
dateElement.textContent = formattedDate;

document.addEventListener("DOMContentLoaded", updateIPInfo);

var slider = document.getElementById("brightnessSlider");
var body = document.body;

slider.oninput = function () {
    var brightnessValue = this.value;
    body.style.filter = "contrast(" + brightnessValue + "%)";
};

function displayFlag() {
    var inp = document.getElementById("countryInput").value.toUpperCase(); // Capitalize the input
    var imgUrl = "https://assets.ppy.sh/old-flags/" + inp + ".png";

    var img = new Image();
    img.src = imgUrl;
    img.onerror = function () {
        imgUrl = "https://assets.ppy.sh/old-flags/XX.png";
        inp = "XX";
        document.getElementById("countryInput").value = inp;
    };

    localStorage.setItem("countryCode", inp);
    document.getElementById("flagImage").src = imgUrl;
}

document.getElementById("displayButton").addEventListener("click", displayFlag);

window.addEventListener("DOMContentLoaded", function () {
    var storedCode = localStorage.getItem("countryCode");
    if (storedCode) {
        document.getElementById("countryInput").value = storedCode;
    } else {
        storedCode = "XX";
        localStorage.setItem("countryCode", storedCode);
        document.getElementById("countryInput").value = storedCode;
    }
    displayFlag();
});

var brightnessSlider = document.getElementById("brightnessSlider");
var contrastSlider = document.getElementById("contrastSlider");
var saturationSlider = document.getElementById("saturationSlider");
var grayscaleSlider = document.getElementById("grayscaleSlider");
var hueRotateSlider = document.getElementById("hueRotateSlider");
var sepiaSlider = document.getElementById("sepiaSlider");
var blurSlider = document.getElementById("blurSlider");
var dropShadowSlider = document.getElementById("dropShadowSlider");
var invertSlider = document.getElementById("invertSlider");
var resetButton = document.getElementById("resetButton");
var body = document.body;

brightnessSlider.addEventListener("input", applyFilters);
contrastSlider.addEventListener("input", applyFilters);
saturationSlider.addEventListener("input", applyFilters);
grayscaleSlider.addEventListener("input", applyFilters);
hueRotateSlider.addEventListener("input", applyFilters);
sepiaSlider.addEventListener("input", applyFilters);
blurSlider.addEventListener("input", applyFilters);
dropShadowSlider.addEventListener("input", applyFilters);
invertSlider.addEventListener("input", applyFilters);

resetButton.addEventListener("click", resetFilters);

window.addEventListener("load", function () {
    if (localStorage.getItem("filterValues")) {
        var filterValues = JSON.parse(localStorage.getItem("filterValues"));
        brightnessSlider.value = filterValues.brightness;
        contrastSlider.value = filterValues.contrast;
        saturationSlider.value = filterValues.saturation;
        grayscaleSlider.value = filterValues.grayscale;
        hueRotateSlider.value = filterValues.hueRotate;
        sepiaSlider.value = filterValues.sepia;
        blurSlider.value = filterValues.blur;
        dropShadowSlider.value = filterValues.dropShadow;
        invertSlider.value = filterValues.invert;

        applyFilters();
    }
});

function applyFilters() {
    var brightnessValue = brightnessSlider.value;
    var contrastValue = contrastSlider.value;
    var saturationValue = saturationSlider.value;
    var grayscaleValue = grayscaleSlider.value;
    var hueRotateValue = hueRotateSlider.value;
    var sepiaValue = sepiaSlider.value;
    var blurValue = blurSlider.value;
    var dropShadowValue = dropShadowSlider.value;
    var invertValue = invertSlider.value;

    var filterValue = `brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%) grayscale(${grayscaleValue}%) sepia(${sepiaValue}%) blur(${blurValue}px) drop-shadow(${dropShadowValue}px ${dropShadowValue}px ${dropShadowValue}px rgba(0, 0, 0, 0.5)) invert(${invertValue}%)`;

    // Check if the element is an image and exclude hue-rotate filter
    if (!isImageElement(body)) {
        filterValue += ` hue-rotate(${hueRotateValue}deg)`;
    }

    body.style.filter = filterValue;

    var filterValues = {
        brightness: brightnessValue,
        contrast: contrastValue,
        saturation: saturationValue,
        grayscale: grayscaleValue,
        hueRotate: hueRotateValue,
        sepia: sepiaValue,
        blur: blurValue,
        dropShadow: dropShadowValue,
        invert: invertValue
    };
    localStorage.setItem("filterValues", JSON.stringify(filterValues));
}

function resetFilters() {
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    saturationSlider.value = 100;
    grayscaleSlider.value = 0;
    hueRotateSlider.value = 0;
    sepiaSlider.value = 0;
    blurSlider.value = 0;
    dropShadowSlider.value = 0;
    invertSlider.value = 0;

    applyFilters();

    localStorage.removeItem("filterValues");
}

// Check if the element is an image
function isImageElement(element) {
    return element instanceof HTMLImageElement;
}


function performGoogleSearch() {
    var searchQuery = document.getElementById('searchInput').value;
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);
    window.location.href = searchUrl;
  }

  document.addEventListener('keyup', function(event) {
    var isTyping = event.target.tagName.toLowerCase() === 'input' && (event.target.type === 'text' || event.target.tagName.toLowerCase() === 'textarea');
  
    if (isTyping) {
      if (event.key === 'Escape') {
        clearInput(event.target);
      }
      return; 
    }
  
    if (event.key === 'h') {
      var modal = document.getElementById('myModal');
      var overlay = document.getElementById('modalOverlay');
      modal.style.display = 'block';
      overlay.style.display = 'block';
      setTimeout(function() {
        modal.style.opacity = '1'; 
        modal.style.bottom = '50%'; 
        overlay.style.opacity = '1'; 
      }, 10);
    } else if (event.key === 'Escape') {
      var modal = document.getElementById('myModal');
      var overlay = document.getElementById('modalOverlay');
      modal.style.opacity = '0'; 
      modal.style.bottom = '-100%'; 
      overlay.style.opacity = '0'; 
      setTimeout(function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
      }, 300);
    }
  });


  const button = document.getElementById('hueButton');

function changeHue() {
  const hue = Math.floor(Math.random() * 360); 
  const mainColor = `hsl(${hue}, 50%, 50%)`;
  const hoverColor = `hsl(${hue}, 60%, 60%)`;
  const foreColor = `hsl(${hue},60%,50%)`;
  document.documentElement.style.setProperty('--main-color', mainColor);
  document.documentElement.style.setProperty('--hovercolor', hoverColor);
  document.documentElement.style.setProperty('--fore-color', foreColor);
}

button.addEventListener('click', changeHue);


function updateIPInfo() {
    const spanElement = document.getElementById('ipInfo');
    spanElement.textContent = 'IP Loading...'; 

    
    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(data => {
        const ip = data.query || 'N/A'; 
        spanElement.textContent = ip; 
      })
      .catch(error => {
        console.log('Error:', error);
        spanElement.textContent = 'Error retrieving IP information';
      });
  }

  var modalH = document.getElementById('myModalH');
  var overlayH = document.getElementById('modalOverlayH');
  var modalS = document.getElementById('myModalS');
  var overlayS = document.getElementById('modalOverlayS');
  var modalG = document.getElementById('myModalG');
  var overlayG = document.getElementById('modalOverlayG');
  var warningMessage = document.getElementById('warningMessage');
  
  var searchInput = '';
  
  document.addEventListener('keyup', function (event) {
    var isTyping = event.target.tagName.toLowerCase() === 'input' && (event.target.type === 'text' || event.target.tagName.toLowerCase() === 'textarea');
  
    if (isTyping) {
      if (event.key === 'Escape') {
        clearInput(event.target);
      }
      return; // Ignore keyup event when typing in a text area
    }
  
    if (warningMessage.style.display === 'block') {
      return; // Ignore keyup event when warning message is visible
    }
  
    if (event.key === 'Insert') {
      if (modalS.style.display === 'block') {
        closeModal(modalS, overlayS);
      }
      openModal(modalH, overlayH);
    } else if (event.key === 'Home') {
      if (modalH.style.display === 'block') {
        closeModal(modalH, overlayH);
      }
      openModal(modalS, overlayS);
    } else if (event.key === 'End') {
      if (modalH.style.display === 'block') {
        closeModal(modalH, overlayH);
      } else if (modalS.style.display === 'block') {
        closeModal(modalS, overlayS);
      }
      openModal(modalG, overlayG);
      focusSearchInput();
    } else if (event.key === 'Escape') {
      closeModal(modalH, overlayH);
      closeModal(modalS, overlayS);
      closeModal(modalG, overlayG);
    }
  });
  
  var searchInputField = document.getElementById('searchInput');
  searchInputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      searchInput = searchInputField.value;
      navigateToGoogleSearch();
    }
  });
  
  function openModal(modal, overlay) {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    setTimeout(function () {
      modal.style.opacity = '1';
      overlay.style.opacity = '1';
    }, 10);
  }
  
  function closeModal(modal, overlay) {
    modal.style.opacity = '0';
    overlay.style.opacity = '0';
    setTimeout(function () {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    }, 300);
  }
  
  function focusSearchInput() {
    var input = document.getElementById('searchInput');
    input.focus();
  }
  
  function clearInput(input) {
    input.value = '';
  }
  
  function navigateToGoogleSearch() {
    var googleBaseUrl = 'https://www.google.com/search?q=';
    var url = googleBaseUrl + encodeURIComponent(searchInput);
    window.location.href = url;
  }
  

  fetch('https://api.exchangerate-api.com/v4/latest/EUR')
  .then(response => response.json())
  .then(data => {
    const exchangeRate = data.rates.HUF;
    const exchangeRateElement = document.getElementById('exchangeRate');
    exchangeRateElement.textContent = `1 EUR = ${exchangeRate.toFixed(2)} HUF`;
  })
  .catch(error => {
    console.log('Error fetching exchange rate:', error);
  });

  fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    var ipAddress = data.ip;
    var spanElement = document.getElementById('ipSpan');
    spanElement.textContent = ipAddress;
  })
  .catch(error => {
    console.error('Error:', error);
  });

  const notepad = document.getElementById('notepad');
  notepad.value = localStorage.getItem('notepadContent');
  notepad.addEventListener('input', () => {
     localStorage.setItem('notepadContent', notepad.value);
   });

   document.addEventListener("DOMContentLoaded", function() {
    var apiKey = "1b65f7bae7858de304d641b0bb70966c6b931b0b"; // Replace "YOUR_API_KEY" with your Osu! API key
  
    var savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      document.getElementById("playerInput").value = savedUsername;
      getUserStats(savedUsername);
    }
  
    document.getElementById("submitBtn").addEventListener("click", function() {
      var username = document.getElementById("playerInput").value;
      localStorage.setItem("username", username);
      getUserStats(username);
    });
  
    function getUserStats(username) {
      var apiUrl = "https://osu.ppy.sh/api/get_user";
      var requestData = {
        k: apiKey,
        u: username
      };
  
      // Clear previous error message
      document.getElementById("errorSpan").textContent = "";
  
      var xhr = new XMLHttpRequest();
      xhr.open("GET", apiUrl + "?" + new URLSearchParams(requestData).toString());
      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.length > 0) {
            var user = response[0];
  
            // Display user stats
            for (var key in user) {
              if (user.hasOwnProperty(key)) {
                var value = user[key];
                var element = document.getElementById(key);
                if (element) {
                  var formattedValue = formatValue(key, value);
                  element.textContent = formattedValue;
                }
              }
            }
  
            // Display user image
            var userId = user.user_id;
            var imageUrl = `https://a.ppy.sh/${userId}?${Date.now()}.jpeg`;
            document.getElementById("userImage").src = imageUrl;
  
            localStorage.setItem("userStats", JSON.stringify(user));
          } else {
            document.getElementById("errorSpan").textContent = "User not found.";
          }
        } else {
          document.getElementById("errorSpan").textContent = "Error retrieving user stats: " + xhr.statusText;
          console.log(xhr.statusText);
        }
      };
      xhr.onerror = function() {
        document.getElementById("errorSpan").textContent = "Error retrieving user stats.";
      };
      xhr.send();
    }
  
    function formatValue(key, value) {
      if (key.includes("count") || key.includes("score") || key.includes("rank") || key.includes("pp")) {
        return new Intl.NumberFormat('en-US').format(parseFloat(value.replace(/,/g, ".")));
      } else if (key === "accuracy") {
        return parseFloat(value.replace(/,/g, ".")).toFixed(2) + "%";
      } else if (key === "level") {
        return Math.floor(parseFloat(value.replace(/,/g, ".")));
      } else if (key === "join_date") {
        return new Date(value).toLocaleString();
      } else {
        return value.replace(/,/g, ".");
      }
    }
  });



          // Function to update the heading with the input value
          function updateHeading() {
            var input = document.getElementById("inputField").value;
            document.getElementById("output").textContent = input;
            localStorage.setItem("savedInput", input); // Save the input to local storage
        }

        // Function to retrieve the saved input from local storage
        function retrieveSavedInput() {
            var savedInput = localStorage.getItem("savedInput");
            if (savedInput) {
                document.getElementById("output").textContent = savedInput;
                document.getElementById("inputField").value = savedInput;
            }
        }

        // Call the retrieveSavedInput function when the page loads
        window.onload = retrieveSavedInput;

        function generatePassword(length) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const symbols = '!@#$%^&*()_-+=';
            let password = '';
        
            for (let i = 0; i < length - 1; i++) {
              password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        
            return password;
          }
        
          document.addEventListener("DOMContentLoaded", function() {
            const length = 10; // Change this value to set the desired password length
            const password = generatePassword(length);
            document.getElementById('passwd').textContent = password;
          });

   // Add event listener to the button
   const fetchButton = document.getElementById('fetchButton');
   fetchButton.addEventListener('click', fetchStickerByType);

   // Set 'Skins' as the default selected button when the page is refreshed
   window.addEventListener('load', function() {
     document.getElementById('skinsRadio').checked = true;
   });

   function fetchStickerByType() {
     const radios = document.getElementsByName('stickerType');
     let type = '';

     for (let i = 0; i < radios.length; i++) {
       if (radios[i].checked) {
         type = radios[i].value;
         break;
       }
     }

     const url = `https://bymykel.github.io/CSGO-API/api/en/${type}.json`;

     fetch(url)
       .then(response => response.json())
       .then(data => {
         const stickers = data;
         const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
         const name = randomSticker.name;
         const image = randomSticker.image;

         const stickerContainer = document.getElementById('stickerContainer');
         stickerContainer.innerHTML = `
           <h3>${name}</h3>
           <img src="${image}" alt="Random Sticker Image">
         `;
       })
       .catch(error => {
         console.log('Error:', error);
       });
   }


   window.onload = function() {
    const buttons = document.querySelectorAll('.navigationButton');
    const pages = document.querySelectorAll('.pageContent');
  
    buttons.forEach(function(button, index) {
      button.addEventListener('click', function() {
        showPageContent(pages[index], index);
        savePageToLocalStorage(index);
      });
    });
  
    function showPageContent(contentElement, pageIndex) {
      pages.forEach(function(page, i) {
        page.style.display = 'none';
      });
  
      if (pageIndex === 3) {
        contentElement.style.display = 'grid';
        contentElement.style.gridTemplateColumns = 'repeat(3, 1fr)';
      } else {
        contentElement.style.display = 'block';
      }
    }
  
    function savePageToLocalStorage(pageIndex) {
      if (pageIndex === 3) {
        localStorage.setItem('currentPage', 0); // Set to page1Content
      } else {
        localStorage.setItem('currentPage', pageIndex);
      }
    }
  
    // Show saved page or default to page 1
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage !== null && savedPage >= 0 && savedPage < pages.length && savedPage !== '3') {
      showPageContent(pages[savedPage], savedPage);
    } else {
      showPageContent(pages[0], 0);
      savePageToLocalStorage(0);
    }
  };

  
  function displayTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();


    hours = addLeadingZero(hours);
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);


    var timeElement = document.getElementById("time");
    timeElement.textContent = hours + ":" + minutes + ":" + seconds;
}

function addLeadingZero(value) {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}


setInterval(displayTime, 50);



document.addEventListener("DOMContentLoaded", function() {
    var downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", function() {
      downloadAudio();
    });
  });

  function downloadAudio() {
    var url = document.getElementById("youtubeUrl").value;
    var videoId = getVideoId(url);

    if (videoId) {

      fetchAudioUrl(videoId);
    } else {
      alert("Invalid YouTube URL");
    }
  }

  function getVideoId(url) {
    var pattern = /(?:[?&]v=|\/embed\/|\/\d\/|\/vi?\/|https?:\/\/(?:www\.)?youtube\.com\/v\/|https?:\/\/(?:www\.)?youtube\.com\/embed\/|https?:\/\/(?:www\.)?youtube\.com\/user\/\S{0,}|https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/(?:www\.)?youtube\.com\/watch\?feature=player_embedded&v=|https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/(?:www\.)?youtube\.com\/watch\?feature=player_embedded&v=|https?:\/\/(?:www\.)?youtube\.com\/v\/)([^#\&\?\/\s]{11})/;
    var match = url.match(pattern);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  function fetchAudioUrl(videoId) {
    var apiUrl = "https://youtube-mp36.p.rapidapi.com/dl?id=" + videoId;

    $.ajax({
      url: apiUrl,
      headers: {
        "X-RapidAPI-Key": "80cd3d4e3emsh7924a8259047591p1b8fddjsn98ff69093185",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
      },
      success: function(response) {
        if (response && response.link) {
          var downloadUrl = response.link;
          initiateDownload(downloadUrl);
        } else {
          alert("No audio download link found");
        }
      },
      error: function() {
          alert("An error occurred while fetching the audio URL");

      }
    });
  }

  function initiateDownload(downloadUrl) {
      window.location.href = downloadUrl;

      clearInputField(); // Clear the input field
    }

    function clearInputField() {
      var youtubeUrlInput = document.getElementById("youtubeUrl");
      youtubeUrlInput.value = ""; // Clear the input field
    }
    

  function disableDownloadButton() {
    var downloadButton = document.getElementById("downloadButton");
    downloadButton.disabled = true;
  }

  function showStatusMessage(message, color) {
    var statusMessageElement = document.getElementById("statusMessage");
    statusMessageElement.innerText = message;
    statusMessageElement.style.color = color;
  }