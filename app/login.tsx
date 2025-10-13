import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { useValidation } from '@/hooks/useValidation';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const { validateForm } = useValidation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateFields = () => {
    const emailValidation = validateForm(email, password);
    
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message || '');
      return false;
    }
    
    setEmailError('');
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      Toast.show({
        type: 'error',
        text1: 'Erro de Validação',
        text2: 'Por favor, corrija os campos destacados',
        position: 'top',
      });
      return;
    }

    setIsLoggingIn(true);
    
    Toast.show({
      type: 'info',
      text1: 'Entrando...',
      text2: 'Verificando suas credenciais',
      position: 'top',
    });

    try {
      const success = await login(email, password);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Bem-vindo ao Horizon!',
          text2: 'Login realizado com sucesso',
          position: 'top',
        });
        
        setTimeout(() => {
          router.replace('/dashboard');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Credenciais Inválidas',
          text2: 'Email ou senha incorretos',
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro de Conexão',
        text2: 'Tente novamente em alguns instantes',
        position: 'top',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 24,
      paddingTop: 80,
      minHeight: height,
    },
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    logoContainer: {
      marginBottom: 24,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    form: {
      gap: 24,
    },
    inputContainer: {
      gap: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    input: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 18,
      fontSize: 16,
      color: colors.text,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    inputError: {
      borderColor: colors.error,
      borderWidth: 2,
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordToggle: {
      position: 'absolute',
      right: 16,
      top: 18,
      padding: 8,
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      marginTop: 4,
      marginLeft: 4,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 20,
      alignItems: 'center',
      marginTop: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    loginButtonDisabled: {
      backgroundColor: colors.textLight,
      shadowOpacity: 0.1,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 1,
    },
    demoCredentials: {
      marginTop: 32,
      padding: 20,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    demoTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    demoTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginLeft: 8,
    },
    demoText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    loadingContent: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    loadingText: {
      fontSize: 16,
      color: colors.text,
      marginTop: 16,
      fontWeight: '600',
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <Ionicons name="sunny" size={80} color={colors.primary} />
          </Animated.View>
          <Text style={styles.title}>Horizon</Text>
          <Text style={styles.subtitle}>
            Gerencie suas finanças com inteligência e simplicidade
          </Text>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="seu@email.com"
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, passwordError && styles.inputError]}
                placeholder="••••••••"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.loginButton,
                (isLoggingIn || !email || !password) && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoggingIn || !email || !password}
            >
              <Text style={styles.loginButtonText}>
                {isLoggingIn ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.demoCredentials}>
          <View style={styles.demoTitleContainer}>
            <Ionicons name="key" size={16} color={colors.primary} />
            <Text style={styles.demoTitle}>Credenciais de Demonstração</Text>
          </View>
          <Text style={styles.demoText}>
            Email: admin@test.com{'\n'}
            Senha: 123456
          </Text>
        </View>
      </ScrollView>

      {isLoggingIn && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Entrando no Horizon...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
