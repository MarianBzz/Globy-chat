import { Text, TouchableOpacity } from 'react-native';

const Btn = ({
  bgColor,
  btnLabel,
  textColor,
  Press,
}: {
  bgColor: string;
  btnLabel: string;
  textColor: string;
  Press: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 10,
        alignItems: 'center',
        width: 300,
        paddingVertical: 10,
        marginVertical: 10,
      }}
    >
      <Text style={{ color: textColor, fontSize: 22, fontWeight: 'bold' }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;
