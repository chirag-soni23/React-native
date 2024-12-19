import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import studentData from '@/studentData.json';
import { Ionicons } from '@expo/vector-icons'; // Add Ionicons for better visuals

interface Student {
  id: number;
  name: string;
  rollNo: string;
  parentName: string;
  parentMobile: string;
}

interface StudentData {
  class9: Student[];
  class10: Student[];
  class11: Student[];
  class12: Student[];
}

export default function TabTwoScreen() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleCardPress = (classKey: string) => {
    setSelectedClass(classKey);
  };

  const handleBackPress = () => {
    setSelectedClass(null);
  };

  const data = studentData as StudentData;

  return (
    <View style={styles.container}>
      {/* Show Class Cards if no class is selected */}
      {!selectedClass && (
        <View style={styles.cardContainer}>
          {['class9', 'class10', 'class11', 'class12'].map((classKey) => (
            <TouchableOpacity
              key={classKey}
              style={styles.card}
              onPress={() => handleCardPress(classKey)}
            >
              <Text style={styles.cardTitle}>{classKey.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Show Student Details for selected class */}
      {selectedClass && (
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>{selectedClass.toUpperCase()} Students</Text>
          <ScrollView style={styles.scrollView}>
            {data[selectedClass]?.map((student: Student) => (
              <View key={student.id} style={styles.studentCard}>
                <Text style={styles.studentText}>ID: {student.id}</Text>
                <Text style={styles.studentText}>Name: {student.name}</Text>
                <Text style={styles.studentText}>Roll No: {student.rollNo}</Text>
                <Text style={styles.studentText}>Parent Name: {student.parentName}</Text>
                <Text style={styles.studentText}>Parent's Mobile: {student.parentMobile}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Lighter background for the whole screen
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#4c69f5', 
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', 
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff', 
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  scrollView: {
    maxHeight: 400,
    marginTop: 10,
  },
  studentCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  studentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginLeft: 10,
  },
});
