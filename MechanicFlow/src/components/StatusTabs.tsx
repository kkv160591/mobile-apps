import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const tabs = ["all","active","progress","completed"]

export default function StatusTabs({selected,onChange}:any){

  return (

    <View style={styles.container}>

      {tabs.map(tab => (

        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            selected === tab && styles.active
          ]}
          onPress={() => onChange(tab)}
        >

          <Text
            style={[
              styles.text,
              selected === tab && styles.activeText
            ]}
          >
            {tab.toUpperCase()}
          </Text>

        </TouchableOpacity>

      ))}

    </View>

  )

}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    marginBottom:15
  },

  tab:{
    paddingVertical:8,
    paddingHorizontal:14,
    borderRadius:8,
    marginRight:10,
    backgroundColor:"#eee"
  },

  active:{
    backgroundColor:"#2563EB"
  },

  text:{
    fontWeight:"600"
  },

  activeText:{
    color:"white"
  }

})