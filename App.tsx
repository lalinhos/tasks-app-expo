import { useEffect, useState } from 'react';
import {
StyleSheet, Text, View, TextInput, TouchableOpacity,
SafeAreaView, Platform, StatusBar as RNStatusBar,
Image, Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TaskList } from './src/components/TaskList';
import { addTask, deleteTask, getAllTasks, updateTask, TaskItem } from './src/utils/handle-api';

export default function App() {
const [tasks, setTasks] = useState<TaskItem[]>([]);
const [text, setText] = useState("");
const [isUpdating, setIsUpdating] = useState(false);
const [taskId, setTaskId] = useState("");

useEffect(() => {
getAllTasks(setTasks);
}, []);


const updateMode = (id: string, t: string) => {
setIsUpdating(true);
setText(t);
setTaskId(id);
};

const limparTudo = () => {
setTasks([]);
};

return (
<SafeAreaView style={styles.principal}>

<View style={styles.cabecalho}>
<Image
source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4697/4697260.png' }}
style={{ width: 40, height: 40, marginBottom: 5 }}
/>
<Text style={styles.titulo}>Meu App de Tarefas</Text>
<Text>Total de itens: {tasks.length}</Text>
</View>

<View style={styles.inputArea}>
<TextInput
style={styles.meuInput}
placeholder="Escreva aqui..."
value={text}
onChangeText={(v) => setText(v)}
maxLength={30}
keyboardType="default"
/>

<TouchableOpacity
style={styles.botaoAdd}
onPress={
isUpdating
? () => updateTask(taskId, text, setTasks, setText, setIsUpdating)
: () => addTask(text, setText, setTasks)
}
>
<Text style={{ color: 'white', fontWeight: 'bold' }}>
{isUpdating ? "EDITAR" : "ADD"}
</Text>
</TouchableOpacity>
</View>

<TaskList
tasks={tasks}
onUpdate={updateMode}
onDelete={(id) => deleteTask(id, setTasks)}
/>

<View style={{ padding: 10 }}>
<Button
title="Apagar lista toda"
color="red"
onPress={limparTudo}
/>
</View>

<StatusBar style="auto" />
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topo: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  minhaLogo: {
    width: 45,
    height: 45,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  textoContador: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  areaInput: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  campoTexto: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  botaoAzul: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  espacoBotao: {
    padding: 20,
    marginTop: 10,
  }
});