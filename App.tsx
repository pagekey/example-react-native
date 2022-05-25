import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined,
  About: undefined,
}

function AboutScreen({navigation, route}: Props) {
  const [state, setState] = useState({
    aboutText: 'initial value'
  });

  return (
    <View>
      <Text>About</Text>
      <Text>No big deal</Text>
      <Text>{state.aboutText}</Text>
      <View style={styles.paddedButtons}>
        <Button
          title="Click me now"
          onPress={(e) => setState({aboutText: 'YEAAAAAAAAAAAAAAAAAAH!'})}
        />
      </View>
      <View style={styles.paddedButtons}>
        <Button
          title="Store something"
          onPress={async (e) => {
            try {
              await AsyncStorage.setItem('my_key', 'a great value (that is not encrypted)');
            } catch(e) {
              console.log("WHOA there is aproblem") // TODO handle this
            }
          }}
        />
      </View>
    </View>
  );
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'MyStack'>;

function HomeScreen({navigation, route}: Props) {

  const [state, setState] = useState({
    homeScreenExtra: 'loading...'
  });
  useEffect(() => {
    AsyncStorage.getItem('my_key').then(value => {
      setState({homeScreenExtra: `I just got this: ${value}`})
    });
  });

  return (
    <View style={styles.container}>
      <Text>Open up wehflwejfklwefklj.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button 
        title="click me to do something"
        onPress={(e) => navigation.navigate('About')}
      />
      <Text>{state.homeScreenExtra}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome'}} />
        <Stack.Screen name="About" component={AboutScreen} options={{title: 'About Us'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddedButtons: {
    margin: 10,
    padding: 10,
  },
});
