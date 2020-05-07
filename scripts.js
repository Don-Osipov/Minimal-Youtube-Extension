chrome.runtime.onMessage.addListener(function (request) {
  const sidebar = document.querySelector('#secondary');
  const endScreen = document.querySelector('.ytp-endscreen-content');
  const recommended = document.querySelector('#primary');
  if (request[0] === 'sidebar') {
    console.log('sidebar');

    displayOnMessage(sidebar, request[1]);
  }
  if (request[0] === 'endScreen') {
    console.log('endscreen');

    displayOnMessage(endScreen, request[1]);
  }
  if (request[0] === 'recommended') {
    console.log('recommended');

    displayOnMessage(recommended, request[1]);
  }
  console.log(request);
});

var elemParent = document.body; /* or whatever */

const url = window.location.href;
console.log(url);

const regex = new RegExp('^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+');
let tested = [false, false, false];

if (regex.test(url)) {
  deletor(true);
} else {
  deletor(false);
}

function deletor(regexPass) {
  chrome.storage.sync.get(['sidebar', 'endScreen', 'recommended'], (result) => {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          var node1 = mutation.target.querySelector('#secondary');
          var node2 = mutation.target.querySelector('#primary');
          var node3 = mutation.target.querySelector('.ytp-endscreen-content');

          if (regexPass) {
            display(node1, result.sidebar, 1);
            display(node3, result.endScreen, 3);
          } else {
            display(node2, result.recommended, 2);
          }
          if (tested.every((e) => e === true)) {
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(elemParent, {
      childList: true,
      subtree: true,
    });
  });
}

function display(selector, checkboxVal, index) {
  console.log(selector, checkboxVal);
  tested[index] = true;

  if (selector && checkboxVal === true) {
    selector.style.display = 'none';
  }
}

function displayOnMessage(selector, display) {
  if (!display) {
    selector.style.display = 'none';
  } else {
    selector.style.display = 'block';
  }
}
