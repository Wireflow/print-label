import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;

const CreateLabel = () => {
  const [cashPrice, setCashPrice] = useState('');
  const [cardPrice, setCardPrice] = useState('');
  const [printer, setPrinter] = useState('');
  const [tax, setTax] = useState(false);
  const [toggleAnimation] = useState(new Animated.Value(0));

  const onPress = async () => {
    console.log(CalendarModule);
    try {
      const message = await CalendarModule.createName('Hello');
      console.log(message);
    } catch (error) {
      console.error('Failed to create name:', error);
    }
    CalendarModule.createName('Nader');
  };

  const handleCashInput = text => {
    setCashPrice(text);
    const cash = parseFloat(text);
    if (!isNaN(cash)) {
      const taxRate = 0.04;
      const updatedCardPrice = (cash * (1 + taxRate)).toFixed(2);
      setCardPrice(updatedCardPrice);
    } else {
      setCardPrice('');
    }
  };

  const handleTaxToggle = () => {
    setTax(!tax);
    Animated.timing(toggleAnimation, {
      toValue: tax ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const handlePrint = async () => {
    if (cashPrice !== '' && cardPrice !== '') {
      const htmlContent = `
        <html>
          <head>
            <style>
              .cash-price {
                color: black;
                font-size: 50px;
                font-weight: bold;
                padding-left: 30px;
                left: 20px;
              }
              .tax {
                color: black;
                font-size: 40px;
                font-weight: bold;
                padding-left: 30px;
                padding-top: 10px;
                left: 20px;
              }
            
            </style>
          </head>
          <body>
              <h2 class="tax">${tax ? 'Plus Tax' : 'No Tax'}</h2>
              <h2 class="cash-price">Cash Price: $${cashPrice}</h2>
              <h2 class="cash-price">Card Price: $${cardPrice}</h2>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: 'prices',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      const filePath = pdf.filePath;

      const selectPrinter = async () => {
        const selectedPrinter = await RNPrint.selectPrinter({x: 100, y: 100});
        setPrinter({selectedPrinter});
      };

      try {
        await RNPrint.print({filePath: filePath, printerURL: {printer}});
      } catch (error) {
        console.error('Printing failed:', error);
      }
    } else {
      alert('Please enter both cash and card prices.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a label</Text>
      <View style={styles.content}>
        <View style={styles.taxToggleContainer}>
          <Pressable
            onPress={handleTaxToggle}
            style={[
              styles.taxToggle,
              {backgroundColor: tax ? 'gray' : 'white'},
            ]}>
            <Animated.View
              style={[
                styles.toggleIndicator,
                {
                  transform: [
                    {
                      translateX: toggleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 60],
                      }),
                    },
                  ],
                  backgroundColor: tax ? 'green' : 'red',
                },
              ]}>
              <Text style={styles.toggleText}>{tax ? 'Tax' : 'No Tax'}</Text>
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Cash Price</Text>
            <TextInput
              onChangeText={handleCashInput}
              placeholder="Enter cash price"
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Card Price</Text>
            <TextInput value={cardPrice} style={styles.input} />
          </View>
        </View>
      </View>
      <View style={styles.printButtonContainer}>
        <Pressable onPress={onPress} style={styles.printButton}>
          <Text style={styles.printButtonText}>Print</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  taxToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    position: 'relative',
  },
  taxToggle: {
    borderWidth: 2,
    borderColor: 'gray',
    width: 130,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleIndicator: {
    width: 70,
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    marginHorizontal: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'gray',
    paddingHorizontal: 10,
    fontSize: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
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

export default CreateLabel;
