import { useState, useEffect } from "react"
import { View, Image, Text, TouchableOpacity, FlatList, Alert } from "react-native"
import {styles} from "./home.styles"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from "@/components/Item"
import {itemsStorage, ItemStorage} from "@/storage/itemsStorage"


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home(){
  
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if (!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar")
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }
    await itemsStorage.add(newItem)
    await itemsByStatus()
    Alert.alert("Sucesso", `Adicionado ${description}`)
    setDescription("")
  }

  async function handleRemove(id: string) {
    try{
      await itemsStorage.remove(id)
      await itemsByStatus()
    }catch(error){
      console.log(error)
      Alert.alert("ERRO", "Não foi possível remover")
    }
  }
  function handleClear(){
    Alert.alert("Limpar", "Deseja realmente remover todos?", [
      { text: "Não", style: "cancel"},
      { text: "Sim", onPress: () => onClear()}
    ])
  }

  async function onClear() {
    try{
      itemsStorage.clear()
      setItems([])
    }catch(error){
      Alert.alert("Erro", "Não foi remover todos os itens")
    }
    
  }

 async function itemsByStatus(){
    try{
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    }catch(error){
      console.log (error)
      Alert.alert("Erro", "Não foi possivel filtrar")
    }
  }

  async function handleToggleItemStatus(id:string) {
    try{
      await itemsStorage.toggleStatus(id)
      itemsByStatus()
    }catch(error){
      Alert.alert("Erro", "Não foi possível atualizar o status")
    }
    
  }
  useEffect(() => {
    itemsByStatus()
  }, [filter])

  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")}></Image>
      
    <View style={styles.form}>  
      <Input value={description} placeholder="Digite um item para comprar" onChangeText={setDescription}/>
      <Button title="Acicionar" onPress={handleAdd}/>
    </View>

    <View style={styles.content}>
      <View style={styles.header}>
        {FILTER_STATUS.map((status) => (
          <Filter 
            key={status} 
            size={20} 
            status={status} 
            isActive={status === filter}
            onPress={() => setFilter(status)}
            />
        ))}
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

     <FlatList 
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Item
        data={item} 
        onRemove={() => handleRemove(item.id)}
        onStatus={() => handleToggleItemStatus(item.id)}
        
        />
      )}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={() => <Text style={styles.empty}>Nenhum Item Aqui</Text>}
     /> 

    </View>

    </View>
    
  )
}