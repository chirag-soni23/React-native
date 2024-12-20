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
    backgroundColor: '#f7f8fa',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#007bff',
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 16,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
    textAlign: 'center',
    letterSpacing: 1,
  },
  scrollView: {
    maxHeight: 400,
  },
  studentCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f1f3f8',
    borderRadius: 12,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  studentInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#ff4081',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
