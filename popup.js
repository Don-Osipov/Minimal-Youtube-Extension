// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('#sidebar').addEventListener('change', function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (
//       activeTabs
//     ) {
//       chrome.tabs.sendMessage(activeTabs[0].id, { action: 'toggleSidebar' });
//     });
//   });
//   document.querySelector('#endScreen').addEventListener('change', function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (
//       activeTabs
//     ) {
//       chrome.tabs.sendMessage(activeTabs[0].id, { action: 'toggleEndScreen' });
//     });
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelector('#sidebar').addEventListener('change', function() {
//     if (this.)
//   })
// })

// let firstTime = true;

// function defaultSettings() {
//   firstTime = false;

//   chrome.storage.sync.set(
//     { mintSet: { sidebar: false, endScreen: false } },
//     function () {
//       console.log('defaults set');
//     }
//   );
// }

// function getSettings(sidebar, endScreen) {
//   chrome.storage.sync.get('mintSet', function (result) {
//     if (result.mintSet.sidebar) {
//       sidebar.checked = true;
//     } else {
//       sidebar.checked = false;
//     }
'';
//     if (result.mintSet.endScreen) {
//       endScreen.checked = true;
//     } else {
//       endScreen.checked = false;
//     }
//   });
// }

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
