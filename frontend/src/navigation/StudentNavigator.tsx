import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';

// Student Features
import StudentDrawer from '../features/student/components/StudentDrawer';
import StudentDashboard from '../features/student/screens/StudentDashboard';
import { 
  MaterialsScreen, 
  AttendanceScreen, 
  JosephineScreen, 
  ProfileScreen 
} from '../features/student/screens/StudentScreens';

const Drawer = createDrawerNavigator();

export default function StudentNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <StudentDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { width: 320, backgroundColor: 'transparent' },
        overlayColor: 'rgba(0,0,0,0.7)',
        sceneContainerStyle: { backgroundColor: '#09090b' },
      }}
    >
      <Drawer.Screen name="Chat" component={StudentDashboard} />
      <Drawer.Screen name="Materials" component={MaterialsScreen} />
      <Drawer.Screen name="Attendance" component={AttendanceScreen} />
      <Drawer.Screen name="Josephine" component={JosephineScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}