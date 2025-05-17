export const formatToDateDMY = (isoDateString: string): string => {
  if (!isoDateString) return '';

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date to DD/MM/YYYY:', error);
    return '';
  }
};

export const formatToDateYMD = (isoDateString: string): string => {
  if (!isoDateString) return '';

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date to YYYY-MM-DD:', error);
    return '';
  }
};

export const parseDateDMYtoISO = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return '';
    }

    const date = new Date(year, month - 1, day);
    return date.toISOString();
  } catch (error) {
    console.error('Error parsing DD/MM/YYYY to ISO:', error);
    return '';
  }
};

export const formatCustomDate = (isoDateString: string, format: string): string => {
  if (!isoDateString) return '';

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  } catch (error) {
    console.error('Error formatting date with custom format:', error);
    return '';
  }
};

export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

export const getCurrentDateDMY = (): string => {
  return formatToDateDMY(getCurrentDateISO());
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const addDays = (isoDateString: string, days: number): string => {
  if (!isoDateString) return '';

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    date.setDate(date.getDate() + days);
    return date.toISOString();
  } catch (error) {
    console.error('Error adding days to date:', error);
    return '';
  }
};

export const daysBetween = (startDateString: string, endDateString: string): number => {
  try {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 0;
    }

    const differenceMs = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error calculating days between dates:', error);
    return 0;
  }
};

export const formatToDateDMYY = (isoDateString: string): string => {
  if (!isoDateString) return '';

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date to DD/MM/YY:', error);
    return '';
  }
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString("vi-VN");
};