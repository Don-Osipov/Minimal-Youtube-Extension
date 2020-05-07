// chrome.runtime.onMessage.addListener(function (request) {
//   if (request.action === 'toggleSidebar') {
//     console.log('sideToggled');
//     const secondary = document.querySelector('#secondary');
//     if (secondary.style.display === 'none') {
//       secondary.style.display = 'block';
//     } else {
//       secondary.style.display = 'none';
//     }
//     // document.querySelector('#related').classList.toggle('hideSectionMinimal');
//   }
//   if (request.action === 'toggleEndScreen') {
//     //   document
//     //     .querySelector('.ytp-endscreen-content')
//     //     .classList.toggle('hideSectionMinimal');
//     console.log('endToggled');
//   }
//   console.log(request);
// });

// chrome.runtime.onMessage.addListener(function (request) {
//   console.log(request);
// });

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

// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', afterDOMLoaded);
// } else {
//   afterDOMLoaded();
// }

// function afterDOMLoaded() {
//   console.log('loaded');
//   chrome.storage.sync.get(['sidebar', 'endScreen', 'recommended'], function (
//     result
//   ) {
//     const sidebar = document.querySelector('#secondary');
//     const endScreen = document.querySelector('.ytp-endscreen-content');
//     const recommended = document.querySelector('#primary');
//     console.log('initial test');
//     console.log(sidebar);
//     console.log(endScreen);
//     console.log(recommended);
//     console.log(`result = ${result.recommended}`);

//     setDisplay(sidebar, result.sidebar, 1);
//     setDisplay(endScreen, result.endScreen, 2);
//     setDisplay(recommended, result.recommended, 3);

//     // if (result.recommended) {
//     //   recommended.style.display = 'none';
//     //   console.log('recommended none');
//     // } else {
//     //   recommended.style.display = 'block';
//     //   console.log('recommended block');
//     // }
//     //
//     // if (result.sidebar) {
//     //   sidebar.style.display = 'none';
//     //   console.log('sidebar none');
//     // } else {
//     //   sidebar.style.display = 'block';
//     //   console.log('sidebar block');
//     //
//     // }
//     // if (result.endScreen) {
//     //   endScreen.style.display = 'none';
//     //   console.log('endScreen none');
//     //
//     // } else {
//     //   endScreen.style.display = 'block';
//     //   console.log('endScren block');
//     //
//     // }
//   });
// }

// function setDisplay(element, checked, test) {
//   console.log(test);
//   if (element) {
//     if (checked) {
//       element.style.display = 'none';
//       console.log('displaying none ' + test);
//       return;
//     }
//     element.style.display = 'block';
//     console.log('displaying block ' + test);
//   }
// }
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
