import { Theme } from "@/config/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@shopify/restyle";
import { format } from "date-fns";
import { FC, useState } from "react";
import { Pressable, TextInputProps } from "react-native";
import InputText from "./InputText";

const SIZES = {
  s: 48,
  m: 56,
  l: 64,
};

interface InputTimeProps {
  label?: string;
  error?: string;
  size?: keyof typeof SIZES;
}

const InputTime: FC<TextInputProps & InputTimeProps> = ({ value, onChangeText, ...props }) => {
  const [currentDate, setCurrentDate] = useState(new Date(value || new Date()));
  const [show, setShow] = useState(false);
  const theme = useTheme<Theme>();

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <InputText {...props} value={value} editable={false} />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="time"
          value={currentDate}
          is24Hour={false}
          style={{ backgroundColor: theme.colors.accentText }}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setShow(false);
              setCurrentDate(selectedDate);
              onChangeText && onChangeText(format(selectedDate, "HH:mm"));
            }
          }}
        />
      )}
    </>
  );
};

export default InputTime;
