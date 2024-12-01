import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign in to Mark3d</Text>
        
        {/* Google Sign In Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>
		  Sign in with {" "}
            <Text style={styles.coloredG}>G</Text>
            <Text style={styles.coloredO}>o</Text>
            <Text style={styles.coloredO2}>o</Text>
            <Text style={styles.coloredG2}>g</Text>
            <Text style={styles.coloredL}>l</Text>
            <Text style={styles.coloredE}>e</Text>
            
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or sign in with email</Text>
          <View style={styles.divider} />
        </View>

        {/* Email/Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username or Email</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <View style={styles.passwordHeader}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 30,
  },
  title: {
    fontFamily: "Work Sans",
    fontSize: 28,
    // fontWeight: '600',
		fontWeight: "bold",
    color: '#441752',
    textAlign: 'center',
    marginBottom: 60,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 40,
  },
  googleButtonText: {
    fontSize: 22,
    fontWeight: '500',
  },
  coloredG: { color: '#4285F4' },
  coloredO: { color: '#EA4335' },
  coloredO2: { color: '#FBBC05' },
  coloredG2: { color: '#4285F4' },
  coloredL: { color: '#34A853' },
  coloredE: { color: '#EA4335' },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    color: '#000000',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  inputContainer: {
    marginBottom: 22,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  forgotText: {
    color: '#8E8E8E',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  signInButton: {
    backgroundColor: '#441752',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  signUpLink: {
    color: '#441752',
    fontSize: 14,
    // fontWeight: '500',
		fontWeight: "bold",
  },
});

export default SignInScreen;

