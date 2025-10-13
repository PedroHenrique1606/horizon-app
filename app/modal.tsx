import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>🎉 Modal Screen</Text>
        <Text style={styles.description}>
          Este é um exemplo de modal usando estilos nativos do React Native!
        </Text>
        
        <View style={styles.features}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>✨ Gradientes</Text>
            <Text style={styles.featureText}>Suporte a gradientes e efeitos</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>🎨 Customização</Text>
            <Text style={styles.featureText}>Personalize facilmente com StyleSheet</Text>
          </View>
        </View>

        <Link href="/" dismissTo asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>← Voltar para Home</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  modal: {
    backgroundColor: '#3b82f6',
    padding: 32,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    maxWidth: 400,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
  },
  features: {
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
  },
  featureTitle: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#3b82f6',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});