import { ApiRequest, ApiResponse } from './apitypes';
import { hide, show } from './classlist';
import ready from './document-ready-promise';
import polyfills from './polyfills';

import './style.css';

const start = () => {
  const urlLong = document.getElementById('url_long') as HTMLInputElement;
  const urlShort = document.getElementById('url_short') as HTMLInputElement;

  const showSuccess = ([longUrl, shortUrl]: string[]) => {
    hide('f');
    show('g');
    const disp = document.getElementById('url_long_disp') as HTMLSpanElement;
    disp.innerText = longUrl;
    urlShort.value = shortUrl;
    urlShort.focus();
    urlShort.select();
  };

  const showFailure = (error: Error) => {
    show('error');
    const message = (error && error.message) || 'It didn’t work.';
    const errorP = document.getElementById('error') as HTMLParagraphElement;
    errorP.innerText = `Oh no! ${message}`;
  };

  const submit = (evt: Event) => {
    evt.preventDefault();

    const url = urlLong.value;
    if (url.length === 0) {
      return;
    }

    const body: ApiRequest = {
      url_long: url,
      cdn_prefix: 'oulipo.link',
    };

    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) =>
        resp.ok ? resp.json() : Promise.reject(new Error(resp.statusText))
      )
      .then((json: ApiResponse) =>
        'error' in json
          ? Promise.reject(new Error(json.error))
          : [json.url_long, json.url_short]
      )
      .then(showSuccess)
      .catch(showFailure);
  };

  (document.getElementById('f') as HTMLFormElement).addEventListener(
    'submit',
    submit
  );
  (document.getElementById('shrink') as HTMLButtonElement).addEventListener(
    'click',
    submit
  );
  (document.getElementById('startagain') as HTMLButtonElement).addEventListener(
    'click',
    () => {
      show('f');
      hide('g');
      hide('error');
      urlLong.value = '';
      urlLong.focus();
    }
  );

  const copyButton = document.getElementById('copy') as HTMLButtonElement;
  if (navigator && navigator.clipboard && 'writeText' in navigator.clipboard) {
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

Promise.all([polyfills(), ready()]).then(start);
