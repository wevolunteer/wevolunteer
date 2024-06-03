import { FC, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import Box from "./Box";
import Text from "./Text";

interface InputTextProps {
  label: string;
  error?: string;
}

const InputText: FC<TextInputProps & InputTextProps> = ({ label, error, ...rest }) => {
  const [isSecure, setIsSecure] = useState(rest.secureTextEntry || false);

  return (
    <Box width="100%">
      <Text variant="inputLabel">{label}</Text>
      <Box
        alignItems="center"
        borderWidth={1}
        borderColor="mainBorder"
        borderRadius="m"
        width="100%"
        position="relative"
        height={56}
      >
        <TextInput
          style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}
          {...rest}
          secureTextEntry={isSecure}
        />

        {rest.secureTextEntry && (
          <Box position="absolute" right={16} height="100%" justifyContent="center">
            <Text
              variant="body"
              fontSize={12}
              fontWeight={700}
              fontFamily="DMSansRegular"
              textDecorationLine="underline"
              onPress={() => setIsSecure(!isSecure)}
              color="mainText"
            >
              {isSecure ? "Mostra" : "Nascondi"}
            </Text>
          </Box>
        )}
      </Box>
      {error && (
        <Text variant="error" marginTop="s">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default InputText;
