export default (choices, rolledNumber) => choices.filter(c => c.ranges.map(range => {
  if (typeof range === 'number' && range === rolledNumber) { 
      return true;
  }

  if (Array.isArray(range) && range.length === 2) {
      const [lower, upper] = range;
      if (rolledNumber >= lower && rolledNumber <= upper) {
          return true;
      }
  }

  return false;
}).filter(s => s).length > 0)[0];
