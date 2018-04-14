const modClassList = (op, ...classNames) => id => {
  document.getElementById(id).classList[op](...classNames);
};

export const hide = modClassList('add', 'invisible');
export const show = modClassList('remove', 'invisible');
