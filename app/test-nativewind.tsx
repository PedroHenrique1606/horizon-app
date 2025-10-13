import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TestNativeWind() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          🎉 NativeWind Test
        </Text>
      </View>
      
      <View style={styles.card2}>
        <Text style={styles.text}>
          Se você está vendo este texto, o componente está funcionando!
        </Text>
      </View>

      <View className="bg-blue-500 p-4 rounded-lg mt-4">
        <Text className="text-white font-bold">
          Classes Tailwind Test
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#10B981',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  card2: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#111827',
    fontSize: 14,
    textAlign: 'center',
  },
});
