module.exports = function check(str, bracketsConfig) {
  const pairs = Object.fromEntries(
    bracketsConfig.map(([open, close]) => [close, open])
  );
  const openers = bracketsConfig.map(([open]) => open);

  const finalStack = str.split('').reduce((stack, current) => {
    if (stack === null) return null;

    const top = stack[stack.length - 1];

    if (openers.includes(current)) {
      if (pairs[current] === current && top === current) {
        stack.pop();
        return stack;
      }
      stack.push(current);
      return stack;
    }

    if (stack.length === 0 || stack.pop() !== pairs[current]) {
      return null;
    }

    return stack;
  }, []);

  return finalStack !== null && finalStack.length === 0;
};
