import { Tabs } from 'expo-router';
import React from 'react';
import { FaClipboardUser } from "react-icons/fa6";
import { FaRegListAlt } from "react-icons/fa";
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color }) => <FaClipboardUser size={24} color='white'/>,
        }}
      />
      <Tabs.Screen
        name="Attendance"
        options={{
          title: 'Marks',
          tabBarIcon: ({ color }) => <FaRegListAlt size={24} color='white'/>,
        }}
      />
    </Tabs>
  );
}
