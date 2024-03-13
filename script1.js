// Asynchronous function to fetch data from a JSON file
async function fetchData() {
  try {
    const response = await fetch('http://localhost:8080/config.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to update HTML content with fetched data
async function updateHTML() {
  // Fetch data using the fetchData function
  const data = await fetchData();

  // Check if data is successfully fetched
  if (data) {
    // Update page title with data from config.json
    document.title = data.titles.pageTitle;

    // Log the fetched data to the console for debugging
    console.log(data);

    // Extract font color from data
    const fontColor = data.colors.fontColor.fullHtml;

    const elements = document.querySelectorAll('*');

    elements.forEach((element) => {
      try {
        element.style.color = fontColor;
      } catch (error) {
        console.error(
          `Error setting color for element: ${element.tagName}`,
          error
        );
      }
    });

    const bannerContainerElement = document.querySelector('.banner-container');
    bannerContainerElement.style.backgroundColor =
      data.colors.bannerBackgroundColor;

    const menuItemElement = document.querySelector('.menu-item');
    menuItemElement.style.color = data.colors.fontColor.productText;
    const activeItemElement = document.querySelector('.active');
    activeItemElement.style.color = data.colors.fontColor.fullHtml;

    const titleInfoElements = document.querySelectorAll('.title-info');
    titleInfoElements.forEach((titleInfoElement) => {
      titleInfoElement.style.color = data.colors.fontColor.productTitle;
    });

    const textInfoElements = document.querySelectorAll('.text-info');
    textInfoElements.forEach((textInfoElement) => {
      textInfoElement.style.backgroundColor = data.colors.productTextBackground;
    });

    const spanInfoElements = document.querySelectorAll('.span-info');
    spanInfoElements.forEach((textInfoElement) => {
      textInfoElement.style.color = data.colors.fontColor.productText;
    });

    // Update specific elements based on their class selectors
    const bannerImageElement = document.querySelector(
      '.js-img-header-container'
    );
    if (bannerImageElement) {
      const imgElement = document.createElement('img');
      imgElement.src = data.optional.bannerImageFilePath;
      imgElement.width = data.optional.bannerImageSize.width;
      imgElement.alt = data.titles.pageTitle;
      imgElement.classList.add('d-block');
      bannerImageElement.appendChild(imgElement);
    } else {
      console.error('Element with class "js-img-header-container" not found.');
    }
    const manufacturerNameElement = document.querySelector(
      '.js-manufacturerName'
    );
    if (manufacturerNameElement) {
      manufacturerNameElement.textContent = data.titles.manufacturerName;
    } else {
      console.error('Element with class "js-manufacturerName" not found.');
    }

    const productTitleElement = document.querySelector('.js-productTitle');
    if (productTitleElement) {
      productTitleElement.textContent = data.titles.pageTitle;
      productTitleElement.style.color = data.colors.fontColor.pageTitle;
    } else {
      console.error('Element with class "js-productTitle" not found.');
    }

    const hardwareRevisionElement = document.querySelector(
      '.js-hardwareRevision'
    );
    if (hardwareRevisionElement) {
      hardwareRevisionElement.textContent = data.titles.HardwareRevision;
    } else {
      console.error('Element with class "js-hardwareRevision" not found.');
    }

    const productModelNameElement = document.querySelector(
      '.js-productModelName'
    );
    if (productModelNameElement) {
      productModelNameElement.textContent = data.titles.productmodelname;
    } else {
      console.error('Element with class "productModelName" not found.');
    }

    const firmwareElement = document.querySelector('.js-firmwareVersion');
    if (firmwareElement) {
      firmwareElement.textContent = data.titles.FirmwareVersion;
    } else {
      console.error('Element with class "firmwareVersion" not found.');
    }

    const deviceIDElement = document.querySelector('.js-deviceId');
    if (deviceIDElement) {
      deviceIDElement.textContent = data.titles.DeviceID;
    } else {
      console.error('Element with class "deviceId" not found.');
    }

    const COPUpdateContainerElement = document.querySelector(
      '.COPUpdateContainer'
    );
    if (COPUpdateContainerElement) {
      COPUpdateContainerElement.style.display = data.enableCOPUpdateButton
        ? 'inherit'
        : 'none';
    } else {
      console.error('Element with class "COPUpdateContainer" not found.');
    }

    // Set the background color of the body
    document.body.style.backgroundColor = data.colors.backgroundColor;

    // Update font color of the entire document
    document.body.style.color = fontColor;
  }

  // Check onChange value for each input file
  document.getElementById('file-upload_esp_communications').onchange =
    function () {
      var name = document.getElementById('file-upload_esp_communications');
      document.querySelector('.js-espFirmwareFile').textContent =
        name.files.item(0).name;
    };

  document.getElementById('file-upload_coprocessor').onchange = function () {
    var name = document.getElementById('file-upload_coprocessor');
    document.querySelector('.js-coprocessorFirmwareFile').textContent =
      name.files.item(0).name;
  };
}

// Install Update buttons functionality
function espFirmwareFileInstallUpdate(e) {
  e.preventDefault();
  alert('ESP Firmware File Install Update');
  // Enter functionality of install update here
}

function coprocessorFirmwareFileInstallUpdate(e) {
  e.preventDefault();
  alert('Co-processor Firmware File Install Update');
  // Enter functionality of install update here
}

// Call the updateHTML function when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', updateHTML);
