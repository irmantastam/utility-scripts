// Message text content to delete.
const MESSAGE_TO_DELETE = 'Birute atšaukė pranešimo išsiuntimą'

// Label of the remove button, that pops up when clicking on three dots (in your language)
const REMOVE_LABEL = 'Pašalinti'

// How many messages to delete.
const LIMIT = 10

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const getElementByText = (text) => {
  const elements = document.querySelectorAll('div[data-scope="messages_table"] *');

  for (const element of elements) {
    if (element.textContent === text) {
      return element;
    }
  }

  return null; 
}

const simulateMouseOver = (element) => {
  const event = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: element.getBoundingClientRect().left,
    clientY: element.getBoundingClientRect().top
  });
  element.dispatchEvent(event);
}


for (let i=0; i<LIMIT; i++) {
    const message = getElementByText(MESSAGE_TO_DELETE)

    simulateMouseOver(message)

    await sleep(200);

    message.querySelector('div[role="button"]').click()

    await sleep(200);

    document.querySelector('div[aria-label="Remove message"]').click()

    await sleep(200);

    document.querySelector(`div[aria-label="${REMOVE_LABEL}"][tabindex="0"]`).click()

    await sleep(3000);
}
