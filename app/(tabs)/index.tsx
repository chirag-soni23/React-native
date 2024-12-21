import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import marksData from '@/marksData.json';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  parentName: string;
  parentMobile: string;
  marks: {
    Math: number;
    English: number;
    Science: number;
    History: number;
    Geography: number;
  };
}

interface StudentData {
  class9: Student[];
  class10: Student[];
  class11: Student[];
  class12: Student[];
}

export default function TabTwoScreen() {
  const [selectedClass, setSelectedClass] = useState<keyof StudentData | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const handleCardPress = (classKey: keyof StudentData) => {
    setSelectedClass(classKey);
  };

  const handleBackPress = () => {
    setSelectedClass(null);
  };

  const handleViewMarks = (studentId: number) => {
    setSelectedStudentId(studentId);
  };

  const handleBackToList = () => {
    setSelectedStudentId(null);
  };

  const data = marksData as unknown as StudentData;
  const cardColors = ['#FF7518', '#17ADAD', '#F4C636', '#007bff'];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Marks Dashboard</Text>

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

      {selectedClass && !selectedStudentId && (
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>{selectedClass?.toUpperCase()} Students</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.studentTable}>
              <View style={styles.studentTableRow}>
                <Text style={styles.studentTableHeader}>ID</Text>
                <Text style={styles.studentTableHeader}>Name</Text>
                <Text style={styles.studentTableHeader}>Action</Text>
              </View>
              {/* Ensure selectedClass is defined before using it as a key */}
              {selectedClass && data[selectedClass]?.map((student: Student) => (
                <View key={student.id} style={styles.studentTableRow}>
                  <Text style={styles.studentTableCell}>{student.id}</Text>
                  <Text style={styles.studentTableCell}>{student.name}</Text>
                  <TouchableOpacity 
                    onPress={() => handleViewMarks(student.id)} 
                    style={styles.viewButton}
                  >
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {selectedStudentId && (
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
            <Text style={styles.backText}>Back to List</Text>
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>Student Marks</Text>
          <ScrollView style={styles.scrollView}>
            {selectedClass && data[selectedClass]?.map((student: Student) => {
              if (student.id === selectedStudentId) {
                return (
                  <View key={student.id} style={styles.studentCard}>
                    <Text style={styles.studentInfo}>ID: {student.id}</Text>
                    <Text style={styles.studentInfo}>Name: {student.name}</Text>
                    <Text style={styles.studentInfo}>Roll No: {student.rollNo}</Text>
                    <Text style={styles.studentInfo}>Parent Name: {student.parentName}</Text>
                    <Text style={styles.studentInfo}>Parent's Mobile: {student.parentMobile}</Text>

                    <View style={styles.marksTable}>
                      <View style={styles.marksTableRow}>
                        <Text style={styles.marksTableHeader}>Subject</Text>
                        <Text style={styles.marksTableHeader}>Marks</Text>
                      </View>
                      {Object.keys(student.marks).map((subject) => (
                        <View key={subject} style={styles.marksTableRow}>
                          <Text style={styles.marksTableCell}>{subject}</Text>
                          <Text style={styles.marksTableCell}>
                            {student.marks[subject as keyof typeof student.marks]}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              }
              return null;
            })}
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
    backgroundColor: '#2c2c54', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: -20, 
    marginTop:-20
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
  studentTable: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  studentTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studentTableHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  studentTableCell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#ff4081',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
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
  marksTable: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  marksTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  marksTableHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  marksTableCell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
