export function binarySearch(array: string[], target: string): number[] {
  let left = 0;
  let right = array.length - 1;
  let partialMatches: number[] = [];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = array[mid];

    if (current === target) {
      // Exact match found!
      partialMatches.push(mid);

      // Check for additional matches to the left of the current index.
      for (let i = mid - 1; i >= 0; i--) {
        if (array[i].startsWith(target)) {
          partialMatches.push(i);
        } else {
          break;
        }
      }

      // Check for additional matches to the right of the current index.
      for (let i = mid + 1; i < array.length; i++) {
        if (array[i].startsWith(target)) {
          partialMatches.push(i);
        } else {
          break;
        }
      }

      return partialMatches;
    } else if (current.startsWith(target)) {
      // Partial match found.
      partialMatches.push(mid);
      if (left === right) {
        // Return all partial matches found.
        return partialMatches;
      }
    }

    if (current < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // If no exact match found, return all partial matches found.
  return partialMatches;
}
