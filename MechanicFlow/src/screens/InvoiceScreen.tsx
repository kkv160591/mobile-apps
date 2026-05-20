import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../types/navigation"
import { generateInvoice } from "../utils/generateInvoice"

type Props = {
  route: RouteProp<RootStackParamList, "Invoice">
}

export default function InvoiceScreen({ route }: Props) {

  const { job } = route.params

  const total = job.services.reduce(
    (sum, s) => sum + (s.actualPrice ?? s.estimatedPrice),
    0
  )

  return (

    <View style={styles.container}>

      <Text style={styles.title}>INVOICE</Text>

      <Text>Customer: {job.customer}</Text>
      <Text>Vehicle: {job.vehicle}</Text>

      <FlatList
        data={job.services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Text>₹{item.actualPrice ?? item.estimatedPrice}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total ₹{total}</Text>

      <TouchableOpacity
        style={styles.printBtn}
        onPress={() => generateInvoice(job)}
      >
        <Text style={styles.printText}>Print / Share Invoice</Text>
      </TouchableOpacity>

    </View>

  )
}

const styles = StyleSheet.create({
  container:{ flex:1,padding:20 },
  title:{ fontSize:22,fontWeight:"bold",marginBottom:20 },
  row:{ flexDirection:"row",justifyContent:"space-between",marginTop:10 },
  total:{ marginTop:20,fontSize:18,fontWeight:"bold" },
  printBtn:{
    backgroundColor:"#111827",
    padding:15,
    marginTop:20,
    borderRadius:10,
    alignItems:"center"
  },
  printText:{ color:"white",fontWeight:"bold" }
})