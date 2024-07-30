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
