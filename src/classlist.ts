const modClassList = (op: 'add' | 'remove', ...classNames: string[]) => (
  id: string
) => {
  document.getElementById(id)?.classList[op](...classNames);
};

export const hide = modClassList('add', 'invisible');
export const show = modClassList('remove', 'invisible');
