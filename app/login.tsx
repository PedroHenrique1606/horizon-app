import { useAuth } from '@/contexts/AuthContext';
import { useBiometricAuth } from '@/contexts/BiometricAuthContext';
import { useTheme } from '@/hooks/useTheme';
import { useValidation } from '@/hooks/useValidation';
import { navigateAndReset } from '@/utils/navigation';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
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
  const { 
    isBiometricEnabled, 
    isBiometricAvailable, 
    authenticateWithBiometric 
  } = useBiometricAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  
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

  const focusEmail = () => {
    emailInputRef.current?.focus();
  };

  const focusPassword = () => {
    passwordInputRef.current?.focus();
  };

  const handleBiometricLogin = async () => {
    if (!isBiometricEnabled || !isBiometricAvailable) {
      Toast.show({
        type: 'error',
        text1: 'Biometria Indisponível',
        text2: 'A biometria não está habilitada ou disponível',
        position: 'top',
      });
      return;
    }

    setIsLoggingIn(true);
    
    Toast.show({
      type: 'info',
      text1: 'Autenticação Biométrica',
      text2: 'Use Face ID ou Touch ID para fazer login',
      position: 'top',
    });

    try {
      const success = await authenticateWithBiometric();
      if (success) {
        const loginSuccess = await login('admin@test.com', '123456');
        if (loginSuccess) {
          Toast.show({
            type: 'success',
            text1: 'Login Biométrico Realizado!',
            text2: 'Bem-vindo ao Horizon',
            position: 'top',
          });
          
          setTimeout(() => {
            navigateAndReset('/dashboard');
          }, 1500);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Falha na Autenticação',
          text2: 'Biometria não reconhecida ou cancelada',
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro na Biometria',
        text2: 'Tente novamente ou use login tradicional',
        position: 'top',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

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
          navigateAndReset('/dashboard');
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
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
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
      top: '50%',
      marginTop: -18,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
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
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginHorizontal: 16,
      fontWeight: '500',
    },
    biometricButton: {
      backgroundColor: colors.surface + '80',
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    biometricButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
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
            <Image 
              source={require('../assets/images/horizon-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Text style={styles.subtitle}>
            Gerencie suas finanças com inteligência e simplicidade
          </Text>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={focusEmail} activeOpacity={0.7}>
              <Text style={styles.label}>Email</Text>
            </TouchableOpacity>
            <TextInput
              ref={emailInputRef}
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
            <TouchableOpacity onPress={focusPassword} activeOpacity={0.7}>
              <Text style={styles.label}>Senha</Text>
            </TouchableOpacity>
            <View style={styles.passwordContainer}>
              <TextInput
                ref={passwordInputRef}
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

            {isBiometricEnabled && isBiometricAvailable && (
              <>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>ou</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.biometricButton}
                  onPress={handleBiometricLogin}
                  disabled={isLoggingIn}
                >
                  <Ionicons name="finger-print" size={24} color={colors.primary} />
                  <Text style={styles.biometricButtonText}>
                    Entrar com Biometria
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
