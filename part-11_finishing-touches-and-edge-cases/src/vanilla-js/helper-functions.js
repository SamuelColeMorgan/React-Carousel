// clamp a number between a min and max value

const clampNumber = (value, min, max) => {
  if (value >= max) return max;
  if (value <= min) return min;
  return value;
};

// ----------------------------

export { clampNumber };
