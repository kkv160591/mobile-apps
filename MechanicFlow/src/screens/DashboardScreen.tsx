import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const stats = [
  { id: 1, title: "Today's Jobs", value: 8 },
  { id: 2, title: "Pending", value: 3 },
  { id: 3, title: "Completed", value: 5 },
  { id: 4, title: "Revenue", value: "₹12k" }
]

const jobs = [
  { id: 1, vehicle: "Honda Activa", customer: "Raj", status: "In Progress" },
  { id: 2, vehicle: "Swift", customer: "Amit", status: "Pending" },
  { id: 3, vehicle: "Pulsar 150", customer: "Vikas", status: "Completed" }
]

export default function DashboardScreen() {

  const navigation: any = useNavigation()

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Garage Dashboard</Text>

      {/* Stats Cards */}

      <View style={styles.statsContainer}>
        {stats.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        ))}
      </View>

      {/* Create Job Button */}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateJob")}
      >
        <Text style={styles.createText}>Create Job</Text>
      </TouchableOpacity>

      {/* Recent Jobs */}

      <Text style={styles.sectionTitle}>Recent Jobs</Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.vehicle}>{item.vehicle}</Text>
            <Text>Customer: {item.customer}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8"
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "bold"
  },

  cardTitle: {
    color: "#666"
  },

  createButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  createText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  jobCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10
  },

  vehicle: {
    fontSize: 16,
    fontWeight: "bold"
  }

})