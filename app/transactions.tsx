import { BottomSheet } from '@/components/BottomSheet';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TransactionsScreen() {
  useProtectedRoute();
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  React.useEffect(() => {
    import('@/utils/events').then(({ eventEmitter }) => {
      const handleOpen = () => setShowOptionsModal(true);
      eventEmitter.on('openTransactionOptions', handleOpen);
      return () => {
        eventEmitter.off('openTransactionOptions', handleOpen);
      };
    });
  }, []);

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
      paddingBottom: 100,
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
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface + '80',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 3,
    },
    optionDescription: {
      fontSize: 13,
      color: colors.textSecondary,
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
  });

  return (
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

      <BottomSheet
        visible={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        title="Ações"
        height={280}
      >
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            setShowOptionsModal(false);
            setShowAddModal(true);
          }}
        >
          <View style={[styles.optionIcon, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="add-circle" size={24} color={colors.primary} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Adicionar Transação</Text>
            <Text style={styles.optionDescription}>Registrar nova receita ou despesa</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            setShowOptionsModal(false);
            Alert.alert('Remover', 'Selecione uma transação para remover');
          }}
        >
          <View style={[styles.optionIcon, { backgroundColor: colors.error + '20' }]}>
            <Ionicons name="trash" size={24} color={colors.error} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Remover Transação</Text>
            <Text style={styles.optionDescription}>Excluir transação existente</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </BottomSheet>

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
