export function getDaysRemaining(endDateStr:string) {
    const today = new Date();
    const endDate = new Date(endDateStr);
  
    // Clear time part for accurate day difference
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
  
    const diffTime = endDate.getTime() - today.getTime(); // in milliseconds
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days
  
    return diffDays.toString();
  }