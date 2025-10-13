import { PageTransition } from '@/components/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const menuItems = [
    { icon: 'analytics', title: 'Relatórios', description: 'Análises detalhadas' },
    { icon: 'card', title: 'Cartões', description: 'Gerenciar cartões' },
    { icon: 'business', title: 'Contas', description: 'Suas contas' },
    { icon: 'settings', title: 'Configurações', description: 'Ajustes do app' },
  ];

  const recentTransactions = [
    { title: 'Salário', amount: '+R$ 5.000,00', date: 'Hoje', type: 'income' },
    { title: 'Supermercado', amount: '-R$ 250,00', date: 'Ontem', type: 'expense' },
    { title: 'Netflix', amount: '-R$ 45,90', date: '2 dias atrás', type: 'expense' },
    { title: 'Freelance', amount: '+R$ 800,00', date: '3 dias atrás', type: 'income' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    notificationButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface + '80',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 120,
    },
    balanceCard: {
      backgroundColor: colors.primary + '20',
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.primary + '40',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    balanceLabel: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '600',
    },
    balanceValue: {
      fontSize: 40,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    balanceActions: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 12,
      gap: 8,
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 14,
    },
    menuGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    menuItem: {
      backgroundColor: colors.surface + '80',
      borderRadius: 16,
      padding: 20,
      width: '48%',
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    menuIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 4,
    },
    menuDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    transactionItem: {
      backgroundColor: colors.surface + '80',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    transactionLeft: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    transactionDate: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    amountIncome: {
      color: colors.success,
    },
    amountExpense: {
      color: colors.error,
    },
  });

  return (
    <PageTransition>
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.userName}>Olá, {user?.name || 'Usuário'}!</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Total</Text>
          <Text style={styles.balanceValue}>R$ 12.504,10</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/add-transaction')}
            >
              <Ionicons name="add-circle" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Nova</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/accounts')}
            >
              <Ionicons name="wallet" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Contas</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={24} color={colors.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Transações Recentes</Text>

        {recentTransactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Ionicons
                name={transaction.type === 'income' ? 'trending-up' : 'trending-down'}
                size={20}
                color={transaction.type === 'income' ? colors.success : colors.error}
              />
            </View>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.amountIncome : styles.amountExpense,
              ]}
            >
              {transaction.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
      </View>
    </PageTransition>
  );
}
