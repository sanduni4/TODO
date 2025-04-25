import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from 'react-native';
import { useTaskStore } from '../hooks/useTaskStore';
import { useNavigation } from '@react-navigation/native';
// Make sure to install/expo-vector-icons if not already

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTask = useTaskStore(state => state.addTask);
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing fields', 'Please enter both title and description');
      return;
    }
    addTask(title.trim(), description.trim());
    navigation.goBack();
  };

  return (
    <ImageBackground 
      source={require('../assets/home.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerRightPlaceholder} />
        

        <View style={styles.container}>
        <Text style={styles.headerTitle}>Add Task</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.descriptionInput]}
            multiline
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 8,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 120,
    marginBottom : 60,
    color: '#333',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom:20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
    marginBottom: 12,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    position: 'absolute',
    bottom: 240,
    right: 20,
    backgroundColor: '#4da6ff', // Light blue
    padding: 16,
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});