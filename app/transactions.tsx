import { PageTransition } from '@/components/PageTransition';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TransactionsScreen() {
  const { colors } = useTheme();

  const transactions = [
    { id: '1', title: 'Salário', amount: '+R$ 5.000,00', date: '2024-07-25', type: 'income', category: 'Renda' },
    { id: '2', title: 'Aluguel', amount: '-R$ 1.500,00', date: '2024-07-20', type: 'expense', category: 'Moradia' },
    { id: '3', title: 'Supermercado', amount: '-R$ 320,00', date: '2024-07-18', type: 'expense', category: 'Alimentação' },
    { id: '4', title: 'Freelance', amount: '+R$ 800,00', date: '2024-07-15', type: 'income', category: 'Renda Extra' },
    { id: '5', title: 'Netflix', amount: '-R$ 45,90', date: '2024-07-10', type: 'expense', category: 'Entretenimento' },
    { id: '6', title: 'Transporte', amount: '-R$ 120,00', date: '2024-07-08', type: 'expense', category: 'Transporte' },
    { id: '7', title: 'Investimento', amount: '+R$ 1.000,00', date: '2024-07-05', type: 'income', category: 'Investimentos' },
    { id: '8', title: 'Restaurante', amount: '-R$ 180,00', date: '2024-07-03', type: 'expense', category: 'Alimentação' },
    { id: '9', title: 'Academia', amount: '-R$ 90,00', date: '2024-07-01', type: 'expense', category: 'Saúde' },
    { id: '10', title: 'Presente', amount: '-R$ 150,00', date: '2024-06-28', type: 'expense', category: 'Lazer' },
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
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    filterButton: {
      backgroundColor: colors.surface + '80',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 8,
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
    filterText: {
      color: colors.text,
      marginLeft: 4,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 120,
    },
    transactionCard: {
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
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    transactionInfo: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    transactionDetails: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    amountIncome: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.success,
    },
    amountExpense: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.error,
    },
  });

  return (
    <PageTransition>
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.title}>Transações</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={16} color={colors.text} />
          <Text style={styles.filterText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {transactions.map((transaction) => (
          <TouchableOpacity 
            key={transaction.id}
            style={styles.transactionCard}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={transaction.type === 'income' ? 'trending-up' : 'trending-down'}
                size={20}
                color={transaction.type === 'income' ? colors.success : colors.error}
              />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionDetails}>{transaction.category} - {transaction.date}</Text>
            </View>
            <Text style={transaction.type === 'income' ? styles.amountIncome : styles.amountExpense}>
              {transaction.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    </PageTransition>
  );
}
