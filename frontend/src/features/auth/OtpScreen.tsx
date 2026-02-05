import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function OtpScreen({ navigation, route }: any) {
  const { verifyOTP, sendOTP, isLoading: authLoading } = useAuth();
  const mode = route.params?.mode || 'signup'; // 'signup', 'login', or 'reset'
  const email = route.params?.email || '';
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const otpArray = value.slice(0, 4).split('');
      const newOtp = [...otp];
      otpArray.forEach((char, i) => {
        if (i + index < 4) {
          newOtp[i + index] = char;
        }
      });
      setOtp(newOtp);
      const lastFilledIndex = Math.min(index + otpArray.length - 1, 3);
      inputRefs.current[lastFilledIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter the complete 4-digit code');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await verifyOTP(email, otpCode);
      
      if (result.success) {
        if (mode === 'reset') {
          navigation.navigate('ResetPassword', { email, otp: otpCode });
        } else {
          // Login/signup success - AuthContext handles navigation
        }
      } else {
        Alert.alert('Verification Failed', result.message || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      const result = await sendOTP(email);
      
      if (result.success) {
        Alert.alert('OTP Sent', 'A new verification code has been sent to your email');
        setResendTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        Alert.alert('Failed', result.message || 'Could not send OTP. Please try again.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-2 border-b border-border">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2" disabled={loading}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-6">
        {/* Icon */}
        <View className="items-center mt-8 mb-6">
          <View className="w-20 h-20 bg-primary/20 rounded-full items-center justify-center border border-primary">
            <Ionicons name="mail-open-outline" size={40} color="#6366f1" />
          </View>
        </View>

        <Text className="text-2xl font-bold text-white text-center">Verification Code</Text>
        <Text className="text-muted mt-2 mb-2 text-center">
          We sent a 4-digit code to
        </Text>
        <Text className="text-white font-semibold text-center mb-8">
          {email}
        </Text>

        {/* OTP Input Boxes */}
        <View className="flex-row justify-center space-x-3 mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              className="w-14 h-14 bg-surface border border-border rounded-xl text-white text-2xl text-center font-bold"
              style={{ fontSize: 24 }}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={4}
              editable={!loading}
              selectTextOnFocus
            />
          ))}
        </View>

        <View className="flex-1" />

        <Button 
          label={loading ? "Verifying..." : "Verify"}
          className="mb-4"
          onPress={handleVerify}
          disabled={loading || otp.join('').length !== 4}
          icon={loading ? <ActivityIndicator size="small" color="white" /> : undefined}
        />
        
        <TouchableOpacity 
          className="self-center py-2"
          onPress={handleResend}
          disabled={!canResend || loading}
        >
          {canResend ? (
            <Text className="text-primary font-bold">Resend Code</Text>
          ) : (
            <Text className="text-muted">
              Resend code in <Text className="text-white font-semibold">{resendTimer}s</Text>
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}