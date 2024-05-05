import React from 'react';

const ChoosePrinter = () => { 
  return (
    <View>
      <TouchableOpacity style={styles.printButtonContainer}>
        <Pressable style={styles.printButton}>
          <Text style={styles.printButtonText}>Print</Text>
        </Pressable>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  printButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  printButton: {
    backgroundColor: 'black',
    paddingHorizontal: 80,
    paddingVertical: 12,
    borderRadius: 30,
  },
  printButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ChoosePrinter;
