import { BottomSheet } from '@/components/BottomSheet';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useTheme } from '@/hooks/useTheme';
import { navigateAndReplace, navigateTo } from '@/utils/navigation';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DashboardScreen() {
  useProtectedRoute();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  React.useEffect(() => {
    import('@/utils/events').then(({ eventEmitter }) => {
      const handleOpen = () => setShowAddModal(true);
      eventEmitter.on('openAddTransaction', handleOpen);
      return () => {
        eventEmitter.off('openAddTransaction', handleOpen);
      };
    });
  }, []);

  const recentTransactions = [
    { title: 'Salário', amount: '+R$ 5.000,00', date: 'Hoje', type: 'income' },
    { title: 'Supermercado', amount: '-R$ 250,00', date: 'Ontem', type: 'expense' },
    { title: 'Netflix', amount: '-R$ 45,90', date: '2 dias atrás', type: 'expense' },
    { title: 'Freelance', amount: '+R$ 800,00', date: '3 dias atrás', type: 'income' },
  ];

  const categories = {
    income: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
    expense: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação'],
  };

  const handleSaveTransaction = () => {
    if (!title || !amount || !category) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    Alert.alert('Sucesso', 'Transação adicionada!');
    setShowAddModal(false);
    setTitle('');
    setAmount('');
    setCategory('');
  };

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
      paddingBottom: 16,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface + '80',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    balanceCard: {
      backgroundColor: colors.surface + '60',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    balanceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    balanceIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary + '30',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    balanceLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    balanceValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 2,
      letterSpacing: -0.5,
    },
    balanceChange: {
      fontSize: 12,
      color: colors.success,
      fontWeight: '600',
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
      padding: 16,
      width: '48%',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: 10,
    },
    menuIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    menuTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 4,
    },
    menuValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    transactionItem: {
      backgroundColor: colors.surface + '80',
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
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
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    transactionLeft: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 3,
    },
    transactionDate: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    transactionAmount: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    amountIncome: {
      color: colors.success,
    },
    amountExpense: {
      color: colors.error,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      maxHeight: '85%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    typeSelector: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
    },
    typeButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    typeButtonActive: {
      backgroundColor: colors.primary,
    },
    typeButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    typeButtonTextActive: {
      color: '#FFFFFF',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryChip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryText: {
      fontSize: 13,
      color: colors.text,
    },
    categoryTextActive: {
      color: '#FFFFFF',
    },
    modalSaveButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    modalSaveButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 100,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.userName}>Olá, {user?.name || 'Usuário'}!</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIcon}>
              <Ionicons name="wallet" size={18} color={colors.primary} />
            </View>
            <Text style={styles.balanceLabel}>Saldo Total</Text>
          </View>
          <Text style={styles.balanceValue}>R$ 12.504,10</Text>
          <Text style={styles.balanceChange}>↑ +15% este mês</Text>
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateAndReplace('/transactions')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="trending-up" size={24} color={colors.primary} />
            </View>
            <Text style={styles.menuTitle}>Receitas</Text>
            <Text style={styles.menuValue}>R$ 7.000</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateAndReplace('/transactions')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#EF444420' }]}>
              <Ionicons name="trending-down" size={24} color="#EF4444" />
            </View>
            <Text style={styles.menuTitle}>Despesas</Text>
            <Text style={styles.menuValue}>R$ 2.450</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateAndReplace('/analytics')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="pie-chart" size={24} color={colors.accent} />
            </View>
            <Text style={styles.menuTitle}>Analytics</Text>
            <Text style={styles.menuValue}>Ver mais</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('/accounts')}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#F59E0B20' }]}>
              <Ionicons name="wallet" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.menuTitle}>Contas</Text>
            <Text style={styles.menuValue}>3 contas</Text>
          </TouchableOpacity>
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

      <BottomSheet
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Nova Transação"
      >
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[styles.typeButton, transactionType === 'expense' && styles.typeButtonActive]}
                  onPress={() => {
                    setTransactionType('expense');
                    setCategory('');
                  }}
                >
                  <Text style={[styles.typeButtonText, transactionType === 'expense' && styles.typeButtonTextActive]}>
                    Despesa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeButton, transactionType === 'income' && styles.typeButtonActive]}
                  onPress={() => {
                    setTransactionType('income');
                    setCategory('');
                  }}
                >
                  <Text style={[styles.typeButtonText, transactionType === 'income' && styles.typeButtonTextActive]}>
                    Receita
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Almoço"
                  placeholderTextColor={colors.textSecondary}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor={colors.textSecondary}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria</Text>
                <View style={styles.categoriesGrid}>
                  {categories[transactionType].map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

            <TouchableOpacity 
              style={styles.modalSaveButton}
              onPress={handleSaveTransaction}
            >
              <Text style={styles.modalSaveButtonText}>Salvar</Text>
            </TouchableOpacity>
      </BottomSheet>
    </View>
  );
}
