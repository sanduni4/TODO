import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useTaskStore } from '../hooks/useTaskStore';

type EditTaskRouteProp = RouteProp<RootStackParamList, 'EditTask'>;

export default function EditTask() {
  const route = useRoute<EditTaskRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const task = useTaskStore(state => state.tasks.find(t => t.id === id));
  const editTask = useTaskStore(state => state.editTask);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleUpdate = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Validation', 'Title and Description cannot be empty');
      return;
    }

    editTask(id, title, description);
    navigation.goBack();
  };

  if (!task) {
    return (
      <ImageBackground 
        source={require('../assets/home.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.errorText}>Task not found</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

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

        <View style={styles.container}>
          <Text style={styles.headerTitle}>Edit Task</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description"
            placeholderTextColor="#888"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Task</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

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
    marginBottom: 60,
    color: '#333',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 20,
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
    backgroundColor: '#4da6ff',
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  }
});