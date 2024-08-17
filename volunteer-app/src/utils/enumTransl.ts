import { t } from "i18next";

export const tActivityStatus = (status: string) => {
  switch (status) {
    case "pending":
      return t("pending", "In attesa");
    case "accepted":
      return t("accepted", "Accettato");
    case "rejected":
      return t("rejected", "Rifiutato");
    case "canceled":
      return t("canceled", "Rinunciato");
    default:
      return status;
  }
};
