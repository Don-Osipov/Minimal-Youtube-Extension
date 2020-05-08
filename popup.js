document.addEventListener('DOMContentLoaded', () => {
  const related = document.querySelector(`#related`);
  const relatedRecommended = document.querySelector('#relatedRecommended');
  const relatedLiveChat = document.querySelector('#relatedLiveChat');
  const relatedPlaylist = document.querySelector('#relatedPlaylist');
  const endScreen = document.querySelector(`#endScreen`);
  const recommended = document.querySelector(`#recommended`);
  const videoInfo = document.querySelector('#videoInfo');
  const videoButtons = document.querySelector('#videoButtons');
  const videoDescription = document.querySelector('#videoDescription');
  const comments = document.querySelector(`#comments`);

  let elements = {
    related: related,
    relatedRecommended: relatedRecommended,
    relatedLiveChat: relatedLiveChat,
    relatedPlaylist: relatedPlaylist,
    endScreen: endScreen,
    recommended: recommended,
    videoInfo: videoInfo,
    videoButtons: videoButtons,
    videoDescription: videoDescription,
    comments: comments,
  };

  chrome.storage.sync.get(Object.keys(elements), (result) => {
    checkChanger(related, result.related);
    checkChanger(relatedRecommended, result.relatedRecommended);
    checkChanger(relatedLiveChat, result.relatedLiveChat);
    checkChanger(relatedPlaylist, result.relatedPlaylist);
    checkChanger(endScreen, result.endScreen);
    checkChanger(recommended, result.recommended);
    checkChanger(comments, result.comments);
    checkChanger(videoInfo, result.videoInfo);
    checkChanger(videoButtons, result.videoButtons);
    checkChanger(videoDescription, result.videoDescription);
  });

  // runs addChangeEvent on all elements
  for (const [key, value] of Object.entries(elements)) {
    addChangeEvent(value, key);
  }
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
  console.log(selector);

  if (selector) {
    selector.addEventListener('change', () => {
      toggleFunction(selectorString);
    });
  }
}

function checkChanger(selector, checkedValue) {
  console.log(selector);

  if (selector) {
    if (checkedValue) {
      selector.checked = true;
    } else {
      selector.checked = false;
    }
  }
}

function updateStorageAndDisplay(name, saveValue) {
  console.log(name, saveValue);

  chrome.storage.sync.set(saveValue, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
      chrome.tabs.sendMessage(activeTabs[0].id, [name, !saveValue[name]]);
    });
  });
}
