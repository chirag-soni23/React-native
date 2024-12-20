import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import studentData from '@/studentData.json';

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
  const [selectedClass, setSelectedClass] = useState<keyof StudentData | null>(null);

  const handleCardPress = (classKey: keyof StudentData) => {
    setSelectedClass(classKey);
  };

  const handleBackPress = () => {
    setSelectedClass(null);
  };

  const data = studentData as StudentData;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Attendance Dashboard</Text>

      {!selectedClass && (
        <View style={styles.cardContainer}>
          {['class9', 'class10', 'class11', 'class12'].map((classKey) => (
            <TouchableOpacity
              key={classKey}
              style={styles.card}
              onPress={() => handleCardPress(classKey as keyof StudentData)}
            >
              <Text style={styles.cardTitle}>{classKey.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedClass && (
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>{selectedClass.toUpperCase()} Students</Text>
          <ScrollView style={styles.scrollView}>
            {data[selectedClass]?.map((student: Student) => (
              <View key={student.id} style={styles.studentCard}>
                <Text style={styles.studentInfo}>ID: {student.id}</Text>
                <Text style={styles.studentInfo}>Name: {student.name}</Text>
                <Text style={styles.studentInfo}>Roll No: {student.rollNo}</Text>
                <Text style={styles.studentInfo}>Parent Name: {student.parentName}</Text>
                <Text style={styles.studentInfo}>Parent's Mobile: {student.parentMobile}</Text>
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
    backgroundColor: '#f4f7fc',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#6200ea',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 400,
  },
  studentCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  studentInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  backButton: {
    marginBottom: 15,
    backgroundColor: '#ff4081',
    paddingVertical: 12,
    borderRadius: 8,
  },
  backText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
