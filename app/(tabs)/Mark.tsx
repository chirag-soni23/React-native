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

  const handleCardPress = (classKey: keyof StudentData) => {
    setSelectedClass(classKey);
  };

  const handleBackPress = () => {
    setSelectedClass(null);
  };

  // Using the imported JSON data
  const data = marksData as StudentData;

  return (
    <View style={styles.container}>
      {/* Class cards display */}
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

      {/* Student details and marks */}
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

                {/* Display Marks in a Table Format */}
                <View style={styles.marksTable}>
                  <View style={styles.marksTableRow}>
                    <Text style={styles.marksTableHeader}>Subject</Text>
                    <Text style={styles.marksTableHeader}>Marks</Text>
                  </View>
                  {Object.keys(student.marks).map((subject) => (
                    <View key={subject} style={styles.marksTableRow}>
                      <Text style={styles.marksTableCell}>{subject}</Text>
                      <Text style={styles.marksTableCell}>{student.marks[subject as keyof typeof student.marks]}</Text>
                    </View>
                  ))}
                </View>
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#6200ea',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 18,
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
  },
  scrollView: {
    maxHeight: 400,
  },
  studentCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f1f1f1',
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
