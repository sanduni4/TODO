import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../hooks/useTaskStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

const TaskItem: React.FC<Props> = ({ id, title, description, isCompleted = false }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const deleteTask = useTaskStore(state => state.deleteTask);
  const markComplete = useTaskStore(state => state.markComplete);
  
  const [isTaskCompleted, setIsTaskCompleted] = useState(isCompleted);

  const handleEdit = () => {
    Alert.alert(
      'Edit Task',
      'Are you sure you want to edit this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Edit',
          onPress: () => navigation.navigate('EditTask', { id }),
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(id),
        },
      ]
    );
  };

  const handleToggleComplete = (newValue: boolean) => {
    setIsTaskCompleted(newValue);
    markComplete(id);
  };

  return (
    <View style={[styles.container, isTaskCompleted && styles.completed]}>
      <View style={styles.content}>
        <Text 
          style={[styles.title, isTaskCompleted && styles.completedText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text 
          style={[styles.description, isTaskCompleted && styles.completedText]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>

      <View style={styles.actions}>
        <Switch
          value={isTaskCompleted}
          onValueChange={handleToggleComplete}
          trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
          thumbColor={isTaskCompleted ? '#fff' : '#fff'}
          ios_backgroundColor="#e0e0e0"
        />
        
        <TouchableOpacity onPress={handleDelete} style={styles.textButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        
          <TouchableOpacity onPress={handleEdit} style={styles.textButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          
         
     
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4da6ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#f5f5f5',
    borderLeftColor: '#4CAF50',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  textButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  editText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 12,
  },
  deleteText: {
    color: '#F44336',
    fontWeight: '600',
    fontSize: 12,
  },
});