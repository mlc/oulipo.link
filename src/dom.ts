type Constructor<T> = { new (...args: any[]): T };

export const getElement = <T extends HTMLElement>(
  elementId: string,
  type: Constructor<T>
): T => {
  const elt = document.getElementById(elementId);
  if (elt === null) {
    throw new Error(`unexpected missing element ${elementId}`);
  }
  if (!(elt instanceof type)) {
    throw new Error(`wrong element type for ${elementId}`);
  }
  return elt;
};
