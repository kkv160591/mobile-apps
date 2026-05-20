import { MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"
import { createJob } from "../services/jobApi"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList
} from "react-native"

type Service = {
  name: string
  price: number
}

export default function CreateJobScreen() {

  const [customer, setCustomer] = useState("")
  const [phone, setPhone] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")

  const [serviceName, setServiceName] = useState("")
  const [servicePrice, setServicePrice] = useState("")

  const [services, setServices] = useState<Service[]>([])

  const [inlineEditIndex, setInlineEditIndex] = useState<number | null>(null)
  const [inlineName, setInlineName] = useState("")
  const [inlinePrice, setInlinePrice] = useState("")

  const addService = () => {

    if (!serviceName || !servicePrice) {
      Alert.alert("Validation", "Service name and price required")
      return
    }

    const newService: Service = {
      name: serviceName,
      price: Number(servicePrice)
    }

    setServices(prev => [...prev, newService])

    setServiceName("")
    setServicePrice("")
  }

  const editService = (index: number) => {

    const item = services[index]

    setInlineName(item.name)
    setInlinePrice(String(item.price))
    setInlineEditIndex(index)
  }

  const cancelInlineEdit = () => {
    setInlineEditIndex(null)
    setInlineName("")
    setInlinePrice("")
  }

  const updateServiceInline = () => {

    if (inlineEditIndex === null) return

    const updated = [...services]

    updated[inlineEditIndex] = {
      name: inlineName,
      price: Number(inlinePrice)
    }

    setServices(updated)

    cancelInlineEdit()
  }

  const deleteService = (index: number) => {

    setServices(prev => prev.filter((_, i) => i !== index))

    if (inlineEditIndex === index) {
      cancelInlineEdit()
    }
  }

  const totalPrice = services.reduce((sum, item) => sum + item.price, 0)

  const handleCreateJob = async () => {

    try {

      const job = {
        id: Date.now().toString(),
        vehicle: vehicleNumber,
        customer: customer,
        services: services
      }

      await createJob(job)

      Alert.alert("Success", "Job saved to server")

      // reset form
      setCustomer("")
      setPhone("")
      setVehicleNumber("")
      setVehicleModel("")
      setServices([])

    } catch (err) {
      Alert.alert("Error", "Failed to save job")
    }
  }

  const renderServiceItem = ({ item, index }: { item: Service, index: number }) => {

    if (inlineEditIndex === index) {

      return (
        <View style={[styles.serviceRow, styles.editRow]}>

          <TextInput
            style={styles.fullInput}
            value={inlineName}
            onChangeText={setInlineName}
            placeholder="Service Name"
          />

          <TextInput
            style={styles.fullInput}
            value={inlinePrice}
            keyboardType="numeric"
            onChangeText={setInlinePrice}
            placeholder="Price"
          />

          <View style={styles.editActions}>

            <TouchableOpacity onPress={updateServiceInline}>
              <MaterialIcons name="check-circle" size={26} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={cancelInlineEdit}>
              <MaterialIcons name="cancel" size={26} color="red" />
            </TouchableOpacity>

          </View>

        </View>
      )
    }

    return (
      <View style={styles.serviceRow}>

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>₹{item.price}</Text>
        </View>

        <View style={styles.serviceActions}>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => editService(index)}
          >
            <MaterialIcons name="edit" size={22} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => deleteService(index)}
          >
            <MaterialIcons name="delete" size={22} color="#DC2626" />
          </TouchableOpacity>

        </View>

      </View>
    )
  }

  return (

    <FlatList
      style={styles.container}
      data={services}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderServiceItem}
      ListHeaderComponent={

        <>
          <Text style={styles.title}>Create Job</Text>

          <TextInput
            placeholder="Customer Name"
            style={styles.input}
            value={customer}
            onChangeText={setCustomer}
          />

          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            placeholder="Vehicle Number"
            style={styles.input}
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
          />

          <TextInput
            placeholder="Vehicle Model"
            style={styles.input}
            value={vehicleModel}
            onChangeText={setVehicleModel}
          />

          <Text style={styles.section}>
            Services ({services.length})
          </Text>

          <TextInput
            placeholder="Service Name"
            style={styles.input}
            value={serviceName}
            onChangeText={setServiceName}
          />

          <TextInput
            placeholder="Estimated Price"
            style={styles.input}
            keyboardType="numeric"
            value={servicePrice}
            onChangeText={setServicePrice}
          />

          <TouchableOpacity style={styles.addButton} onPress={addService}>
            <Text style={styles.buttonText}>Add Service</Text>
          </TouchableOpacity>
        </>
      }

      ListFooterComponent={
        <>
          {services.length > 0 && (
            <Text style={styles.total}>
              Estimated Total: ₹{totalPrice}
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleCreateJob}>
            <Text style={styles.buttonText}>Create Job</Text>
          </TouchableOpacity>
        </>
      }

    />

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  },

  addButton: {
    backgroundColor: "#16A34A",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15
  },

  serviceRow: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  serviceInfo: {
    flex: 1
  },

  serviceName: {
    fontSize: 16,
    fontWeight: "600"
  },

  servicePrice: {
    fontSize: 14,
    color: "#555"
  },

  serviceActions: {
    flexDirection: "row"
  },

  iconButton: {
    marginLeft: 12
  },

  editRow: {
    flexDirection: "column",
    backgroundColor: "#EFF6FF"
  },

  fullInput: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },

  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }

})