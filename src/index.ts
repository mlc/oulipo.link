import ready from './document-ready-promise';
import { getElement, hide, show } from './dom';
import { setup as saSetup } from './sa';
import { ApiSuccess, shrink } from './api';

import './style.css';

saSetup();

const start = () => {
  const urlLong = getElement('url_long', HTMLInputElement);
  const urlShort = getElement('url_short', HTMLInputElement);

  const showSuccess = (resp: ApiSuccess) => {
    window.saEvent('shrink_success');
    hide('f');
    show('g');
    getElement('url_long_disp', HTMLSpanElement).innerText = resp.url_long;
    urlShort.value = resp.url_short;
    urlShort.focus();
    urlShort.select();
  };

  const showFailure = (error: Error) => {
    window.saEvent('shrink_failure');
    show('error');
    const message = error?.message ?? 'It didn’t work.';
    getElement('error', HTMLParagraphElement).innerText = `Oh no! ${message}`;
  };

  const shrinkButton = getElement('shrink', HTMLButtonElement);

  const submit = async (evt: Event) => {
    evt.preventDefault();

    const url = urlLong.value;
    if (url.length === 0) {
      return;
    }

    try {
      shrinkButton.disabled = true;
      const result = await shrink(url);
      showSuccess(result);
    } catch (e) {
      showFailure(e as Error);
    } finally {
      shrinkButton.disabled = false;
    }
  };

  document.getElementById('f')?.addEventListener('submit', submit);
  shrinkButton.addEventListener('click', submit);
  document.getElementById('startagain')?.addEventListener('click', () => {
    show('f');
    hide('g');
    hide('error');
    urlLong.value = '';
    urlLong.focus();
  });

  const copyButton = getElement('copy', HTMLButtonElement);
  if (typeof navigator.clipboard?.writeText === 'function') {
    copyButton.addEventListener('click', () => {
      // we're supposed to check permissions here but browsers don't actually
      // make us do so
      navigator.clipboard.writeText(urlShort.value).catch(console.error);
    });
  } else {
    copyButton.parentNode?.removeChild(copyButton);
  }

  urlLong.focus();
};

ready().then(start);
