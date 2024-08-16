import { format, parse, parseISO } from "date-fns";

export const processColorByStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "statusPending";
    case "approved":
      return "statusAccepted";
    case "rejected":
      return "statusRejected";
  }
};

export const convertToDDMMYYYY = (dateString: string): string => {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, "dd/MM/yyyy");
  } catch (err) {
    // eslint-disable-line
    return "";
  }
};

export const convertToYYYYMMDD = (dateString: string): string => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  return format(parsedDate, "yyyy-MM-dd");
};
