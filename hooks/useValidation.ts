export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function useValidation() {
  const validateEmail = (email: string): ValidationResult => {
    if (!email) {
      return { isValid: false, message: 'Email é obrigatório' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Email inválido' };
    }
    
    return { isValid: true };
  };

  const validatePassword = (password: string): ValidationResult => {
    if (!password) {
      return { isValid: false, message: 'Senha é obrigatória' };
    }
    
    if (password.length < 6) {
      return { isValid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
    }
    
    return { isValid: true };
  };

  const validateForm = (email: string, password: string): ValidationResult => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return passwordValidation;
    }
    
    return { isValid: true };
  };

  return {
    validateEmail,
    validatePassword,
    validateForm,
  };
}
