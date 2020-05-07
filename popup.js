document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('#sidebar');
  const endScreen = document.querySelector('#endScreen');
  const recommended = document.querySelector('#recommended');

  chrome.storage.sync.get(['sidebar', 'endScreen', 'recommended'], (result) => {
    checkChanger(sidebar, result.sidebar);
    checkChanger(endScreen, result.endScreen);
    checkChanger(recommended, result.recommended);
  });

  addChangeEvent(sidebar, 'sidebar');
  addChangeEvent(endScreen, 'endScreen');
  addChangeEvent(recommended, 'recommended');
});

function toggleFunction(name) {
  let saveTrue = {};
  let saveFalse = {};
  saveTrue[name] = true;
  saveFalse[name] = false;

  const selector = document.querySelector(`#${name}`);

  if (selector.checked) {
    updateStorageAndDisplay(name, saveTrue);
  } else {
    updateStorageAndDisplay(name, saveFalse);
  }
}

function addChangeEvent(selector, selectorString) {
  selector.addEventListener('change', () => {
    toggleFunction(selectorString);
  });
}

function checkChanger(selector, checkedValue) {
  if (checkedValue) {
    selector.checked = true;
  } else {
    selector.checked = false;
  }
}

function updateStorageAndDisplay(name, saveValue) {
  chrome.storage.sync.set(saveValue, function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
      chrome.tabs.sendMessage(activeTabs[0].id, [name, !saveValue[name]]);
    });
  });
}
