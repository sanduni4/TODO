import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useTaskStore } from '../hooks/useTaskStore';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks);
  const navigation = useNavigation();
  useEffect(() => {
    useTaskStore.getState().loadTasksFromStorage();
  }, []);
  return (
    <ImageBackground 
      source={require('../assets/home.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View >
        <Text style={styles.hederText}>Task List</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask' as never)}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>

        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>No Tasks</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                id={item.id}
                title={item.title}
                description={item.description}
                isCompleted={item.isCompleted}
              />
            )}
            style={styles.list}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  hederText:{
    fontSize: 44,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 120,
    color: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'transparent',
    
  },
  addButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    padding: 12,
    margin: 30,
    marginHorizontal: 100,
    paddingVertical: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#00',
    fontWeight: 'bold',
    fontSize: 24,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 140,
    fontSize: 38,
    color: '#888',
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  list: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 8,
  },
});