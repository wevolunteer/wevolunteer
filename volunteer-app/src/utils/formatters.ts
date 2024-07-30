export const processColorByStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "statusPending";
    case "accepted":
      return "statusAccepted";
    case "rejected":
      return "statusRejected";
  }
};
