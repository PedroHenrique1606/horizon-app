import { useTheme } from '@/hooks/useTheme';
import { navigateAndReplace } from '@/utils/navigation';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function DockNavbar() {
  const { colors } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: 'Início', icon: 'home', route: '/dashboard' as const },
    { name: 'Transações', icon: 'swap-horizontal', route: '/transactions' as const },
    { name: 'Analytics', icon: 'pie-chart', route: '/analytics' as const },
    { name: 'Perfil', icon: 'person', route: '/profile' as const },
  ];

  const appScreens = ['/dashboard', '/transactions', '/analytics', '/profile'];
  const shouldShow = appScreens.includes(pathname);

  if (!shouldShow) return null;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border + '40',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
      paddingBottom: 16,
      paddingTop: 6,
    },
    navRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      position: 'relative',
      height: 60,
      justifyContent: 'space-around',
    },
    navItem: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      flex: 1,
    },
    navText: {
      fontSize: 11,
      marginTop: 3,
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

  const handleAddPress = () => {
    if (pathname === '/dashboard') {
      import('@/utils/events').then(({ eventEmitter }) => {
        eventEmitter.emit('openAddTransaction');
      });
    } else if (pathname === '/transactions') {
      import('@/utils/events').then(({ eventEmitter }) => {
        eventEmitter.emit('openTransactionOptions');
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => navigateAndReplace(item.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? (item.icon as any) : (item.icon + '-outline' as any)}
                size={22}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text style={[
                styles.navText,
                isActive ? styles.navTextActive : styles.navTextInactive
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleAddPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="add"
            size={22}
            color={colors.primary}
          />
          <Text style={[styles.navText, { color: colors.primary, fontWeight: '600' }]}>
            Adicionar
          </Text>
        </TouchableOpacity>

        {navItems.slice(2).map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => navigateAndReplace(item.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? (item.icon as any) : (item.icon + '-outline' as any)}
                size={22}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text style={[
                styles.navText,
                isActive ? styles.navTextActive : styles.navTextInactive
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
