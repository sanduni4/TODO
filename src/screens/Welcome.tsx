// src/screens/Welcome.tsx
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function Welcome({ navigation }: Props) {
  return (
    <TouchableOpacity 
      style={styles.fullScreen} 
      activeOpacity={1}
      onPress={() => navigation.navigate('Home')}
    >
      <ImageBackground 
        source={require('../assets/welcome.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Left-aligned TODO text */}
          <View style={styles.todoContainer}>
            <Text style={styles.todoLetter}>T</Text>
            <Text style={styles.todoLetter}>O</Text>
            <Text style={styles.todoLetter}>D</Text>
            <Text style={styles.todoLetter}>O</Text>
          </View>

          {/* Right-aligned vertical lines */}
          <View style={styles.linesContainer}>
            <View style={[styles.line, styles.line1]} />
            <View style={[styles.line, styles.line2]} />
            <View style={[styles.line, styles.line3]} />
          </View>

          {/* Bottom app info */}
          <View style={styles.appInfoContainer}>
            <Text style={styles.appInfoText}>APP</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  todoContainer: {
    position: 'absolute',
    right: 70,
    top: '25%',
  },
  todoLetter: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginVertical: 2,
  },
  linesContainer: {
    position: 'absolute',
    left: 40, // Horizontal spacing from right
    top: 20, // 20px from bottom
    height: '90%', // Takes 60% of screen height from bottom
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 25, // Space between lines
  },
  line: {
    width: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  line1: {
    height: '80%', // Longest line
  },
  line2: {
    height: '60%', // Medium line
  },
  line3: {
    height: '40%', // Shortest line
  },
  appInfoContainer: {
    position: 'absolute',
    bottom: 40,
    left: '40%',
    alignItems: 'center',
    marginBottom: 30,
  },
  appInfoText: {
    fontSize: 72,
    color: '#fff',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});