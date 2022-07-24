import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';
import { RoundedButton } from '../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  console.log(subject);

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="What would you like to focus on?"
          onChangeText={setSubject}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={spacing.xxl} onPress={() => addSubject(subject) } />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  button: {
    justifyContent: "center"
  },
  textInput: {
    flex: 0.8,
    marginRight: spacing.sm
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: "row",
    justifyContent: "center"
  }
});