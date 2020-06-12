chrome.runtime.onMessage.addListener(function (request) {
  const recommended = document.querySelector('#page-manager');
  const related = document.querySelector('#secondary');
  const relatedRecommended = document.querySelector('#related');
  const relatedLiveChat = document.querySelector('#chat');
  const relatedPlaylist = document.querySelector('#playlist');
  const endScreen = document.querySelector('.ytp-endscreen-content');
  const videoInfo = document.querySelector('#primary');
  const videoButtons = document.querySelector('#menu-container');
  const videoDescription = document.querySelector('#meta');
  const comments = document.querySelector(`#sections`);
  const sidebar = document.querySelector(`#guide`);
  const subscriptions = document.querySelector(`#items`).parentElement;

  const elName = request[0];
  const toDisplay = request[1];

  if (elName === 'recommended') {
    displayOnMessage(recommended, toDisplay);
  }
  if (elName === 'related') {
    displayOnMessage(related, toDisplay);
  }
  if (elName === 'relatedRecommended') {
    displayOnMessage(relatedRecommended, toDisplay);
  }
  if (elName === 'relatedLiveChat') {
    displayOnMessage(relatedLiveChat, toDisplay);
  }
  if (elName === 'relatedPlaylist') {
    displayOnMessage(relatedPlaylist, toDisplay);
  }
  if (elName === 'endScreen') {
    displayOnMessage(endScreen, toDisplay);
  }
  if (elName === 'videoInfo') {
    displayOnMessage(videoInfo, toDisplay);
  }
  if (elName === 'videoButtons') {
    displayOnMessage(videoButtons, toDisplay);
  }
  if (elName === 'videoDescription') {
    displayOnMessage(videoDescription, toDisplay);
  }
  if (elName === 'comments') {
    displayOnMessage(comments, toDisplay);
  }
  if (elName === 'sidebar') {
    displayOnMessage(sidebar, toDisplay);
  }
  if (elName === 'subscriptions') {
    displayOnMessage(subscriptions, toDisplay);
  }
  console.log(request);
});

let elemParent = document.body; /* or whatever */
let tested = 0;

const url = window.location.href;

const regex = new RegExp('^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+');
let video = false;
if (regex.test(url)) {
  video = true;
} else {
  video = false;
}
console.log(video);
// function deleter(regexPass) {

chrome.storage.sync.get(
  [
    'recommended',
    'related',
    'relatedRecommended',
    'relatedPlaylist',
    'relatedLiveChat',
    'endScreen',
    'videoInfo',
    'videoButtons',
    'videoDescription',
    'comments',
    'sidebar',
    // 'subscriptions',
  ],
  (result) => {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          if (video === false) {
            const recommended = mutation.target.querySelector('#page-manager');
            display(recommended, result.recommended);
            if (tested === 1) {
              observer.disconnect();
              console.log('DISCONNECTED');
            }
          } else {
            const related = mutation.target.querySelector('#secondary');
            const relatedRecommended = mutation.target.querySelector(
              '#related'
            );
            const relatedLiveChat = mutation.target.querySelector('#chat');
            const relatedPlaylist = mutation.target.querySelector('#playlist');
            const endScreen = mutation.target.querySelector(
              '.ytp-endscreen-content'
            );
            const videoInfo = mutation.target.querySelector('primary');
            const videoButtons = mutation.target.querySelector(
              '#menu-container'
            );
            const videoDescription = document.querySelector('#meta');
            const comments = mutation.target.querySelector('#sections');
            const sidebar = mutation.target.querySelector(`#guide`);
            // console.log(recommended);
            // const subscriptions = document.querySelector(`#items`).parentElement;

            display(related, result.related);
            display(relatedRecommended, result.relatedRecommended);
            display(relatedLiveChat, result.relatedLiveChat);
            display(relatedPlaylist, result.relatedPlaylist);
            display(endScreen, result.endScreen);
            display(comments, result.comments);
            display(videoInfo, result.videoInfo);
            display(videoButtons, result.videoButtons);
            display(videoDescription, result.videoDescription);
            display(sidebar, result.sidebar);
            if (tested === 10) {
              observer.disconnect();
              console.log('DISCONNECTED');
            }
          }

          // display(subscriptions, result.subscriptions);
        }
      });
    });

    observer.observe(elemParent, {
      childList: true,
      subtree: true,
    });
  }
);

function display(selector, checkboxVal) {
  console.log(`tested ${selector}`);

  if (selector) {
    tested++;
    if (checkboxVal === true) {
      console.log(selector, checkboxVal);
      selector.style.display = 'none';
    }
  }
}

function displayOnMessage(selector, display) {
  if (!display) {
    selector.style.display = 'none';
  } else {
    selector.style.display = 'block';
  }
}
