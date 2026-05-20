import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function JobCard({ job }: any) {

  const navigation = useNavigation<any>()

  const totalPrice = job.services.reduce(
    (sum: number, s: any) => sum + (s.actualPrice ?? s.estimatedPrice),
    0
  )

  return (

    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("JobDetail", { job })}
    >

      <View style={styles.row}>
        <Text style={styles.vehicle}>{job.vehicle}</Text>
        <Text style={styles.price}>₹{totalPrice}</Text>
      </View>

      <Text style={styles.customer}>{job.customer}</Text>

      <Text style={styles.services}>
        {job.services.length} service{job.services.length > 1 ? "s" : ""}
      </Text>

      <View style={styles.footer}>

        <Text style={styles.status}>
          {job.status.toUpperCase()}
        </Text>

      </View>

    </TouchableOpacity>

  )

}

const styles = StyleSheet.create({

card:{
backgroundColor:"white",
padding:16,
borderRadius:12,
marginBottom:12
},

row:{
flexDirection:"row",
justifyContent:"space-between"
},

vehicle:{
fontSize:16,
fontWeight:"bold"
},

price:{
fontSize:16,
fontWeight:"bold",
color:"#16A34A"
},

customer:{
marginTop:4
},

services:{
marginTop:3,
color:"#555"
},

footer:{
marginTop:10
},

status:{
fontSize:12,
fontWeight:"bold",
color:"#2563EB"
}

})