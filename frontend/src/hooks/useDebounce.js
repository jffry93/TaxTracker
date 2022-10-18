export const helloFunc = () => {
  console.log('hello');
};

export const byeFunc = () => {
  console.log('bye');
};

const useDebounce = (cb, delay = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export default useDebounce;
