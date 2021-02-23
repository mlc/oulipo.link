const fillFetch = () =>
  new Promise<void>((resolve) => {
    if ('fetch' in window) {
      return resolve();
    }

    require.ensure(
      [],
      () => {
        require('whatwg-fetch');

        resolve();
      },
      'fetch'
    );
  });

const loadPolyfills = () => Promise.all([fillFetch()]);

export default loadPolyfills;
