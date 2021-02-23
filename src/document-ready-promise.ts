function ready(): Promise<void>;
function ready<T>(chainVal: T): Promise<T>;

function ready<T>(chainVal?: T) {
  const d = document;
  const w = window;
  const loaded = /^loaded|^i|^c/.test(d.readyState);

  return new Promise((resolve) => {
    if (loaded) {
      resolve(chainVal);
    } else {
      const onReady = () => {
        resolve(chainVal);
        d.removeEventListener('DOMContentLoaded', onReady);
        w.removeEventListener('load', onReady);
      };

      d.addEventListener('DOMContentLoaded', onReady);
      w.addEventListener('load', onReady);
    }
  });
}

export default ready;
