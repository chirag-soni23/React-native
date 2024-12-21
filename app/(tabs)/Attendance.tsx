import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box';
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
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set());

  const handleCardPress = (classKey: keyof StudentData) => {
    setSelectedClass(classKey);
  };

  const handleBackPress = () => {
    setSelectedClass(null);
    setSelectedStudents(new Set());
  };

  const data = studentData as unknown as StudentData;

  const handleCheckboxChange = (studentId: number) => {
    setSelectedStudents((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(studentId)) {
        newSelected.delete(studentId);
      } else {
        newSelected.add(studentId);
      }
      return newSelected;
    });
  };

  const cardColors = ['#FF7518', '#17ADAD', '#F4C636', '#007bff'];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Attendance Dashboard</Text>
      {!selectedClass && (
        <View style={styles.cardContainer}>
          {['9th class', '10th class', '11th class', '12th class'].map((classKey, index) => (
            <TouchableOpacity
              key={classKey}
              style={[styles.card, { backgroundColor: cardColors[index % cardColors.length] }]}
              onPress={() => handleCardPress(classKey as keyof StudentData)}
            >
              <Text style={styles.cardTitle}>{classKey.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedClass && (
        <View style={styles.selectedClassContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>{selectedClass.toUpperCase()} Students</Text>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Select</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell]}>Roll No</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell]}>Name</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell]}>Parent Name</Text>
              </View>
              {/* Table Rows */}
              {data[selectedClass]?.map((student: Student) => (
                <View key={student.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, { flex: 1 }]}>
                    <CheckBox
                      style={styles.checkbox}
                      onClick={() => handleCheckboxChange(student.id)}
                      isChecked={selectedStudents.has(student.id)}
                    />
                  </View>
                  <Text style={styles.tableCell}>{student.rollNo}</Text>
                  <Text style={styles.tableCell}>{student.name}</Text>
                  <Text style={styles.tableCell}>{student.parentName}</Text>
                </View>
              ))}
            </View>
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
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    backgroundColor: '#232F54',
    paddingVertical: 15,
    marginHorizontal: -20,
    marginTop: -20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  card: {
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
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
    textAlign: 'center',
    letterSpacing: 1,
  },
  selectedClassContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  tableCell: {
    flex: 2,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  tableHeaderCell: {
    color: '#fff',
    fontWeight: '700',
  },
  checkbox: {
    marginLeft: 15,
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#ff4081',
    paddingVertical: 5,
    paddingHorizontal: 20,
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
