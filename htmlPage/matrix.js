const data = {
    "12": { "top": "#", "right": "22", "left": "#", "bottom": "32", "pos": "0" },
    "22": { "top": "#", "right": "50", "left": "12", "bottom": "80", "pos": "0" },
    "32": { "top": "12", "right": "89", "left": "#", "bottom": "44", "pos": "0" },
    "50": { "top": "#", "right": "70", "left": "22", "bottom": "51", "pos": "0" },
    "54": { "top": "87", "right": "555", "left": "55", "bottom": "78", "pos": "0" },
    "70": { "top": "#", "right": "#", "left": "50", "bottom": "71", "pos": "0" },
    "75": { "top": "76", "right": "#", "left": "56", "bottom": "77", "pos": "0" },
    "76": { "top": "78", "right": "#", "left": "555", "bottom": "75", "pos": "0" },
    "77": { "top": "75", "right": "#", "left": "55", "bottom": "#", "pos": "0" },
    "87": { "top": "89", "right": "57", "left": "44", "bottom": "54", "pos": "0" },
    "89": { "top": "22", "right": "51", "left": "32", "bottom": "87", "pos": "0" },
    "555": { "top": "57", "right": "76", "left": "54", "bottom": "56", "pos": "0" }
  };
  
  // Extract and determine matrix size
  const extractValues = (key) => {
    const values = [];
    Object.keys(data).forEach((k) => {
      const value = data[k][key];
      if (value !== "#") values.push(parseInt(value, 10));
    });
    return values;
  };
  
  const leftValues = extractValues("left");
  const rightValues = extractValues("right");
  const topValues = extractValues("top");
  const bottomValues = extractValues("bottom");
  
  const minLeft = Math.min(...leftValues);
  const maxLeft = Math.max(...leftValues);
  const minTop = Math.min(...topValues);
  const maxTop = Math.max(...topValues);
  
  const rows = maxTop - minTop + 1;
  const columns = maxLeft - minLeft + 1;
  
  // Initialize the matrix
  const matrix = Array.from({ length: rows }, () => Array(columns).fill("#"));
  
  // Populate the matrix
  Object.keys(data).forEach((key) => {
    const { left, top } = data[key];
    if (left !== "#" && top !== "#") {
      const leftIdx = parseInt(left, 10) - minLeft;
      const topIdx = parseInt(top, 10) - minTop;
      matrix[topIdx][leftIdx] = key;
    }
  });
  
  // Function to shift elements based on their position
  const shiftElements = () => {
    const newMatrix = Array.from({ length: rows }, () => Array(columns).fill("#"));
  
    Object.keys(data).forEach((key) => {
      const { left, top, right, bottom } = data[key];
      if (left !== "#" && top !== "#") {
        const leftIdx = parseInt(left, 10) - minLeft;
        const topIdx = parseInt(top, 10) - minTop;
  
        // Get new positions
        const rightPos = right !== "#" ? parseInt(right, 10) - minLeft : null;
        const bottomPos = bottom !== "#" ? parseInt(bottom, 10) - minTop : null;
  
        // Calculate new position based on right and bottom if available
        const newLeftIdx = rightPos !== null ? rightPos : leftIdx;
        const newTopIdx = bottomPos !== null ? bottomPos : topIdx;
        // Set the new position
        newMatrix[newTopIdx][newLeftIdx] = key;
      }
    });
  
    return newMatrix;
  };
  
  // Perform shifting iterations
  let iterationCount = 2;
  let updatedMatrix = matrix;
  
  while (iterationCount > 0) {
    updatedMatrix = shiftElements();
    iterationCount--;
  }
  
  // Print the final matrix
  console.log("Final Matrix:");
  updatedMatrix.forEach(row => console.log(row.join(" ")));