import ready from 'document-ready-promise';

import { hide, show } from './classlist';
import polyfills from './polyfills';
import './style.css';

const start = () => {
  const urlLong = document.getElementById('url_long');
  const urlShort = document.getElementById('url_short');

  const showSuccess = ([longUrl, shortUrl]) => {
    hide('f');
    show('g');
    document.getElementById('url_long_disp').innerText = longUrl;
    urlShort.value = shortUrl;
    urlShort.focus();
    urlShort.select();
  };

  const showFailure = error => {
    show('error');
    const message = (error && error.message) || 'It didn’t work.';
    document.getElementById('error').innerText = `Oh no! ${message}`;
  };

  const submit = evt => {
    evt.preventDefault();

    const url = urlLong.value;
    if (url.length === 0) {
      return;
    }

    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url_long: url,
        cdn_prefix: 'oulipo.link',
      }),
    })
      .then(
        resp =>
          resp.ok ? resp.json() : Promise.reject(new Error(resp.statusText))
      )
      .then(
        json =>
          json.error
            ? Promise.reject(new Error(json.error))
            : [json.url_long, json.url_short]
      )
      .then(showSuccess)
      .catch(showFailure);
  };

  document.getElementById('f').addEventListener('submit', submit);
  document.getElementById('shrink').addEventListener('click', submit);
  document.getElementById('startagain').addEventListener('click', () => {
    show('f');
    hide('g');
    hide('error');
    urlLong.value = '';
    urlLong.focus();
  });

  const copyButton = document.getElementById('copy');
  if (navigator && navigator.clipboard && 'writeText' in navigator.clipboard) {
    copyButton.addEventListener('click', () => {
      // we're supposed to check permissions here but browsers don't actually
      // make us do so
      navigator.clipboard.writeText(urlShort.value).catch(console.error);
    });
  } else {
    copyButton.parent.removeChild(copyButton);
  }

  urlLong.focus();
};

Promise.all([polyfills(), ready()]).then(start);
