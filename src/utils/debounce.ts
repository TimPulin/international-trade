export function debounce(func: Function, time: number) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), time);
  };
}
