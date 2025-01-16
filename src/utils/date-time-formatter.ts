export function currentMiliseconds() {
  return new Date().getTime();
}

export function dateTimeFormatter(inputDate: string | number, formatNo: number | string): string {
  if (!inputDate) return "";

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date(inputDate);
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = currentDate.toLocaleString('en-US', { month: 'long' });
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';
  const Hour = hour === 12 ? 12 : hour === 0 ? 12 : hour % 12;

  if (formatNo === "January 1, 12:00 AM") return `${month} ${day}, ${Hour}:${minute.toString().padStart(2, '0')} ${period}`;
  else if (formatNo === "Jan 1, 2000, 12:00 AM") return `${month.substring(0, 3)} ${day}, ${year}, ${Hour}:${minute.toString().padStart(2, '0')} ${period}`;
  else if (formatNo === "Jan 1, 12:00 AM") return `${month.substring(0, 3)} ${day}, ${Hour}:${minute.toString().padStart(2, '0')} ${period}`;
  else if (formatNo === "January 1") return `${month} ${day}`;
  else if (formatNo === "Jan 1") return `${month.substring(0, 3)} ${day}`;
  else if (formatNo === "Jan 1, 2000") return `${month.substring(0, 3)} ${day}, ${year}`;
  else if (formatNo === "Saturday, Jan 1") return `${dayOfWeek}, ${month.substring(0, 3)} ${day}`;
  else if (formatNo === "Saturday, January 1, 2000, 12:00 AM") return `${dayOfWeek}, ${month} ${day}, ${year}, ${Hour}:${minute.toString().padStart(2, '0')} ${period}`;
  else if (formatNo === "12:00 AM") return `${Hour}:${minute.toString().padStart(2, '0')} ${period}`;
  else return "";
}

export function stringToMilliseconds(dateString: string): number {
  const dateObject = new Date(dateString);
  const timestampInMilliseconds = dateObject.getTime();
  return timestampInMilliseconds;
}

export function millisecondsToString(milliseconds: number): string {
  const date = new Date(milliseconds);

  // Get the individual components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Create the formatted date string
  const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateString;
}
