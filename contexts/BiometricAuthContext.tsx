import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface BiometricAuthContextType {
  isBiometricEnabled: boolean;
  isBiometricAvailable: boolean;
  enableBiometric: () => Promise<boolean>;
  disableBiometric: () => Promise<void>;
  authenticateWithBiometric: () => Promise<boolean>;
  checkBiometricAvailability: () => Promise<boolean>;
}

const BiometricAuthContext = createContext<BiometricAuthContextType | undefined>(undefined);

const BIOMETRIC_STORAGE_KEY = '@horizon_biometric_enabled';

export function BiometricAuthProvider({ children }: { children: React.ReactNode }) {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    loadBiometricSettings();
    checkBiometricAvailability();
  }, []);

  const loadBiometricSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem(BIOMETRIC_STORAGE_KEY);
      setIsBiometricEnabled(enabled === 'true');
    } catch (error) {
      console.error('Erro ao carregar configurações biométricas:', error);
    }
  };

  const checkBiometricAvailability = async (): Promise<boolean> => {
    try {
      const available = await mockBiometricCheck();
      setIsBiometricAvailable(available);
      return available;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade biométrica:', error);
      setIsBiometricAvailable(false);
      return false;
    }
  };

  const mockBiometricCheck = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  const enableBiometric = async (): Promise<boolean> => {
    try {
      const available = await checkBiometricAvailability();
      if (!available) {
        throw new Error('Biometria não disponível');
      }

      const success = await mockBiometricEnrollment();
      if (success) {
        await AsyncStorage.setItem(BIOMETRIC_STORAGE_KEY, 'true');
        setIsBiometricEnabled(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao habilitar biometria:', error);
      return false;
    }
  };

  const mockBiometricEnrollment = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const disableBiometric = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(BIOMETRIC_STORAGE_KEY);
      setIsBiometricEnabled(false);
    } catch (error) {
      console.error('Erro ao desabilitar biometria:', error);
    }
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      if (!isBiometricEnabled || !isBiometricAvailable) {
        return false;
      }

      const success = await mockBiometricAuth();
      return success;
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
      return false;
    }
  };

  const mockBiometricAuth = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;
        resolve(success);
      }, 1500);
    });
  };

  const value: BiometricAuthContextType = {
    isBiometricEnabled,
    isBiometricAvailable,
    enableBiometric,
    disableBiometric,
    authenticateWithBiometric,
    checkBiometricAvailability,
  };

  return (
    <BiometricAuthContext.Provider value={value}>
      {children}
    </BiometricAuthContext.Provider>
  );
}

export function useBiometricAuth() {
  const context = useContext(BiometricAuthContext);
  if (context === undefined) {
    throw new Error('useBiometricAuth deve ser usado dentro de um BiometricAuthProvider');
  }
  return context;
}
