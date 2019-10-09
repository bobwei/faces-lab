const fn = (promise, t) => {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('timeout')), t);
    }),
  ]);
};

export default fn;
