const documentready = () =>
  new Promise(resolve => {
    if (
      document.attachEvent
        ? document.readyState === 'complete'
        : document.readyState !== 'loading'
    ) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', () => resolve());
    }
  });

export default documentready;
