const useDebounce = (cb, delay = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('test');
      cb(...args);
    }, delay);
  };
};

export default useDebounce;
