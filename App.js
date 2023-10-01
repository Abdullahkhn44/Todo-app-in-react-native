import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';

export default function App() {
  const [isshow, setisShow] = useState(false);
  const [istext, isSetText] = useState('');
  const [istask, setisTask] = useState([]);

  const add = () => {
    setisShow(true);
  };
  const deleteItem = (taskId) => {
    setisTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  
  const Save = () => {
    if (istext.trim() === '') return; // Avoid saving empty tasks
    var todoData = {
      id: new Date().getTime(), // Use getTime() to get a unique ID
      title: istext,
      checked: false, // Add a 'checked' property to each task item and initialize it to false
    };
    setisTask([...istask, todoData]);
    setisShow(false);
    isSetText('');
  };

  const check = (taskId) => {
    setisTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const renderList = ({ item }) => {
    const renderRightActions = () => (
      <RectButton
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          width: 80,
        }}
        onPress={() => deleteItem(item.id)} // Call the deleteItem function passing the item.id
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </RectButton>
    );
    return (
      <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <Text
          style={[
            styles.title,
            item.checked && {
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              fontSize: 22,
              fontWeight: '700',
            },
          ]}
        >
          {item.title}
        </Text>

        <TouchableOpacity
          onPress={() => check(item.id)} // Pass the item.id to the check function
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            left: 250,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.checked && (
            <Image
              source={require('./icons/radio.png')} // Add the checkmark icon image source
              style={{ height: 20, width: 20 }}
            />
          )}
        </TouchableOpacity>
      </View>
      </Swipeable>
    
      )
    
     
      
    
  
 
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>

        <TouchableOpacity
          onPress={check}
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            left: 250,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}></TouchableOpacity>
          
         
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To-dos</Text>
      </View>

      {istask.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.tickImage}
            source={require('./icons/tick2.png')}
          />
          <Text style={styles.emptyText}>No to-dos</Text>
        </View>
      ) : null}

      <FlatList
        style={styles.list}
        data={istask}
        renderItem={renderList}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 80}}
      />

      {isshow && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus={true}
              placeholder="Input Task"
              style={styles.txtInput}
              value={istext}
              onChangeText={isSetText}
              selectionColor="seagreen"
            />
            <TouchableOpacity onPress={Save} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {!isshow && (
        <TouchableOpacity onPress={add} style={styles.addButton}>
          <Image style={styles.addImage} source={require('./icons/add.png')} />
        </TouchableOpacity>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  list: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: 'skyblue',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  txtInput: {
    backgroundColor: '#DCDCD9',
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: 'seagreen',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'seagreen',
    borderRadius: 30,
    padding: 12,
    elevation: 4,
  },
  addImage: {
    height: 24,
    width: 24,
    tintColor: 'white',
  },
  tickImage: {
    height: 100,
    width: 100,
  },
});
