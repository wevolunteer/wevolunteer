import { FC, useEffect, useState } from "react";
import InputTextBottomSheet, { InputTextBottomSheetProps } from "../ui/InputTextBottomSheet";
import { DateInterval } from "./DateFilter";
import { format } from "date-fns";

interface Props extends Omit<InputTextBottomSheetProps, "value" | "onChange"> {
  value: string | null;
  onChange?: (value: string | null) => void;
}

const DateMaskInputBottomSheet: FC<Props> = ({ value, onChange, ...props }) => {
  const [internalValue, setInternalValue] = useState<string>(value?.split("-").reverse().join("/") || "");

  useEffect(() => {
    if (internalValue.length === 10) {
      // DD/MM/YYYY to YYYY-MM-DD
      const date = internalValue.split("/").reverse().join("-");
      onChange?.(date);
    }
  }, [internalValue]);
  
  return (
    <InputTextBottomSheet
      value={internalValue}
      onTextInput={(e) => {
        if (e.nativeEvent.text === "") {
          setInternalValue(prev => prev.substring(0, prev.length - 1));
        }
      }}
      onChangeText={(text) => {
        const masked = dateMask(text);

        setInternalValue(masked);
      }}
      size="s"
      placeholder="DD/MM/YYYY"
      keyboardType="numeric"
      {...props}
    />
  );
};

function dateMask(value: string) {
  if (/[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\s]+/g.test(value)) {
    value = value.replace(/[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\s]+/g, "");
    return value;
  }

  if (value.length > 10) {
    return value.substring(0, 10);
  }

  switch (value.length) {
    case 1:
      if (parseInt(value) > 3) {
        value = "3";
      }
      break;
    case 2:
      if (parseInt(value) > 31) {
        value = "31";
      }
      break;
    case 3:
    case 4:
      if (value[2] !== "/") {
        value = value.substring(0, 2) + "/" + value[2];
      }
      if (parseInt(value[3]) > 1) {
        value = value.substring(0, 3) + "1";
      }
      break;
    case 5:
      if (parseInt(value.substring(3, 5)) > 12) {
        value = value.substring(0, 3) + "12";
      }
      break;
    case 6:
    case 7:
      if (value[5] !== "/") {
        value = value.substring(0, 5) + "/" + value[5];
      }
      if (parseInt(value[6]) < 1 || parseInt(value[6]) > 2) {
        value = value.substring(0, 6) + "1";
      }
      break;
    default:
      break;
  }

  return value;
}

export default DateMaskInputBottomSheet;
