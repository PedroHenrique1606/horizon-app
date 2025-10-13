import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function DockNavbar() {
  const { colors } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: 'Início', icon: 'home', route: '/dashboard' },
    { name: 'Transações', icon: 'swap-horizontal', route: '/transactions' },
    { name: 'Analytics', icon: 'pie-chart', route: '/analytics' },
    { name: 'Perfil', icon: 'person', route: '/profile' },
  ];

  const isAppScreen = ['/dashboard', '/transactions', '/analytics', '/profile'].includes(pathname);

  if (!isAppScreen) return null;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.surface + 'E6',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
      paddingBottom: 20,
      paddingTop: 8,
    },
    navRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    navText: {
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
    },
    navTextActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    navTextInactive: {
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => router.replace(item.route)}
            >
              <Ionicons
                name={isActive ? (item.icon as any) : (item.icon + '-outline' as any)}
                size={24}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text style={[styles.navText, isActive ? styles.navTextActive : styles.navTextInactive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
