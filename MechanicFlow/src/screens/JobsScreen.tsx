import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

import JobCard from "../components/JobCard"
import StatusTabs from "../components/StatusTabs"
import { getJobs } from "../services/jobApi"

export default function JobsScreen() {

  const navigation = useNavigation()

  const [jobs, setJobs] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const data = await getJobs()

      // 🔥 TEMP FIX: normalize backend data → UI format
      const formattedJobs = data.map((j: any) => ({
        ...j,
        services: j.services || [],
        price: j.price || 0
      }))

      setJobs(formattedJobs)

    } catch (err) {
      console.log("Fetch Jobs Error:", err)
    }
  }

  const filteredJobs = jobs.filter(job => {
    if (statusFilter === "all") return true
    return job.status === statusFilter
  })

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Jobs</Text>

      <StatusTabs
        selected={statusFilter}
        onChange={setStatusFilter}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard job={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateJob" as never)}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f6f8"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5
  }

})