import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal
} from "react-native"
import { useState } from "react"
import { RouteProp, useNavigation, NavigationProp } from "@react-navigation/native"
import { RootStackParamList } from "../types/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type JobDetailRouteProp = RouteProp<RootStackParamList, "JobDetail">

type Props = {
  route: JobDetailRouteProp
}

type Service = {
  id: string
  name: string
  estimatedPrice: number
  actualPrice?: number
}

export default function JobDetailScreen({ route }: Props) {

  type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    "JobDetail"
  >

  const navigation = useNavigation<NavigationType>()

  const { job } = route.params

  const [services, setServices] = useState<Service[]>(job.services)
  const [status, setStatus] = useState(job.status)

  const [showModal, setShowModal] = useState(false)
  const [newService, setNewService] = useState("")
  const [newPrice, setNewPrice] = useState("")

  const addService = () => {
    if (!newService || !newPrice) return

    const service: Service = {
      id: Date.now().toString(),
      name: newService,
      estimatedPrice: Number(newPrice)
    }

    setServices([...services, service])
    setNewService("")
    setNewPrice("")
  }

  const removeService = (id: string) => {
    if (status === "completed") return
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const updateActualPrice = (id: string, value: string) => {

    const updated = services.map(s => {
      if (s.id === id) {
        return {
          ...s,
          actualPrice: Number(value)
        }
      }
      return s
    })

    setServices(updated)
  }

  const total = services.reduce(
    (sum, s) => sum + (s.actualPrice ?? s.estimatedPrice),
    0
  )

  const markComplete = () => {
    setStatus("completed")

    Alert.alert(
      "Job Completed",
      "View invoice now?",
      [
        { text: "Later", style: "cancel" },
        {
          text: "View Invoice",
          onPress: () =>
            navigation.navigate("Invoice", {
              job: { ...job, services, status }
            })
        }
      ]
    )
  }

  const renderService = ({ item }: { item: Service }) => (

    <View style={styles.serviceCard}>

      <View style={styles.serviceHeader}>
        <Text style={styles.serviceName}>{item.name}</Text>

        {status !== "completed" && (
          <TouchableOpacity onPress={() => removeService(item.id)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.estimated}>
        Estimated ₹{item.estimatedPrice}
      </Text>

      <TextInput
        placeholder="Actual Price"
        keyboardType="numeric"
        style={styles.priceInput}
        editable={status !== "completed"}
        value={item.actualPrice ? String(item.actualPrice) : ""}
        onChangeText={(v) => updateActualPrice(item.id, v)}
      />

    </View>
  )

  return (

    <View style={styles.container}>

      <Text style={styles.vehicle}>{job.vehicle}</Text>
      <Text style={styles.customer}>{job.customer}</Text>

      <Text style={styles.section}>Services</Text>

      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
      />

      {/* ADD SERVICE BUTTON */}
      {status !== "completed" && (
        <TouchableOpacity
          style={styles.addServiceBtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.addServiceText}>+ Add Service</Text>
        </TouchableOpacity>
      )}

      {/* TOTAL */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>
          Total ₹{total}
        </Text>
      </View>

      {/* ACTION BUTTONS */}

      {status !== "completed" && (
        <TouchableOpacity
          style={styles.completeBtn}
          onPress={markComplete}
        >
          <Text style={styles.completeText}>
            Finalize Job
          </Text>
        </TouchableOpacity>
      )}

      {status === "completed" && (
        <TouchableOpacity
          style={styles.invoiceBtn}
          onPress={() =>
            navigation.navigate("Invoice", {
              job: { ...job, services, status }
            })
          }
        >
          <Text style={styles.invoiceText}>
            View Invoice
          </Text>
        </TouchableOpacity>
      )}

      {/* MODAL */}

      <Modal visible={showModal} transparent animationType="slide">

        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>Add Service</Text>

            <TextInput
              placeholder="Service Name"
              style={styles.input}
              value={newService}
              onChangeText={setNewService}
            />

            <TextInput
              placeholder="Estimated Price"
              keyboardType="numeric"
              style={styles.input}
              value={newPrice}
              onChangeText={setNewPrice}
            />

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                addService()
                setShowModal(false)
              }}
            >
              <Text style={styles.addText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F8"
  },

  vehicle: {
    fontSize: 22,
    fontWeight: "bold"
  },

  customer: {
    marginBottom: 20
  },

  section: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10
  },

  serviceCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  serviceName: {
    fontWeight: "600",
    fontSize: 16
  },

  delete: {
    color: "#DC2626"
  },

  estimated: {
    marginTop: 4,
    color: "#555"
  },

  priceInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8
  },

  addServiceBtn: {
    backgroundColor: "#E0E7FF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },

  addServiceText: {
    color: "#2563EB",
    fontWeight: "bold"
  },

  totalBox: {
    marginTop: 20
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold"
  },

  completeBtn: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },

  completeText: {
    color: "white",
    fontWeight: "bold"
  },

  invoiceBtn: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },

  invoiceText: {
    color: "white",
    fontWeight: "bold"
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10
  },

  addBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center"
  },

  addText: {
    color: "white",
    fontWeight: "bold"
  }

})