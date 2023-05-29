import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const [selectedDates, setSelectedDates] = useState({});

  const handleDayPress = (day) => {
    const selectedDay = day.dateString;
    const updatedDates = { ...selectedDates };

    if (updatedDates[selectedDay]) {
      delete updatedDates[selectedDay];
    } else {
      updatedDates[selectedDay] = { selected: true };
    }

    setSelectedDates(updatedDates);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={selectedDates}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: '#282A3A',
            calendarBackground: '#282A3A',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default MyCalendar;
