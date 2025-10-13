import { PageTransition } from '@/components/PageTransition';
import { useTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const analyticsData = {
    month: {
      income: 7000,
      expense: 2000,
      categories: [
        { name: 'Alimentação', amount: 800, color: '#FF6384' },
        { name: 'Moradia', amount: 600, color: '#36A2EB' },
        { name: 'Transporte', amount: 300, color: '#FFCE56' },
        { name: 'Entretenimento', amount: 200, color: '#4BC0C0' },
        { name: 'Outros', amount: 100, color: '#9966FF' },
      ],
    },
    quarter: {
      income: 21000,
      expense: 6500,
      categories: [
        { name: 'Alimentação', amount: 2400, color: '#FF6384' },
        { name: 'Moradia', amount: 1800, color: '#36A2EB' },
        { name: 'Transporte', amount: 900, color: '#FFCE56' },
        { name: 'Entretenimento', amount: 600, color: '#4BC0C0' },
        { name: 'Outros', amount: 800, color: '#9966FF' },
      ],
    },
    year: {
      income: 84000,
      expense: 25000,
      categories: [
        { name: 'Alimentação', amount: 9600, color: '#FF6384' },
        { name: 'Moradia', amount: 7200, color: '#36A2EB' },
        { name: 'Transporte', amount: 3600, color: '#FFCE56' },
        { name: 'Entretenimento', amount: 2400, color: '#4BC0C0' },
        { name: 'Outros', amount: 2200, color: '#9966FF' },
      ],
    },
  };

  const currentData = analyticsData[selectedPeriod as keyof typeof analyticsData];
  const totalExpense = currentData.expense;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 120,
    },
    periodSelector: {
      backgroundColor: colors.surface + '80',
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    periodRow: {
      flexDirection: 'row',
    },
    periodButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 8,
    },
    periodButtonActive: {
      backgroundColor: colors.primary,
    },
    periodText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    periodTextActive: {
      color: '#FFFFFF',
    },
    summaryCard: {
      backgroundColor: colors.surface + '80',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    summaryIncome: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.success,
    },
    summaryExpense: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.error,
    },
    summaryBalance: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
    summaryDivider: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 8,
    },
    categoryItem: {
      marginBottom: 12,
    },
    categoryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    categoryPercentage: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: colors.secondary,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      borderRadius: 4,
    },
  });

  return (
    <PageTransition>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Acompanhe seus gastos e receitas</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.periodSelector}>
          <View style={styles.periodRow}>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('month')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>Mês</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'quarter' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('quarter')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'quarter' && styles.periodTextActive]}>Trimestre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('year')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'year' && styles.periodTextActive]}>Ano</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Resumo Financeiro ({selectedPeriod === 'month' ? 'Mês' : selectedPeriod === 'quarter' ? 'Trimestre' : 'Ano'})
          </Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Receitas:</Text>
            <Text style={styles.summaryIncome}>+R$ {currentData.income.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Despesas:</Text>
            <Text style={styles.summaryExpense}>-R$ {currentData.expense.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryDivider]}>
            <Text style={styles.summaryLabel}>Saldo:</Text>
            <Text style={styles.summaryBalance}>R$ {(currentData.income - currentData.expense).toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Despesas por Categoria</Text>
          {currentData.categories.map((category, index) => {
            const percentage = (category.amount / totalExpense) * 100;
            return (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryPercentage}>{percentage.toFixed(1)}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: category.color }]} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      </View>
    </PageTransition>
  );
}
