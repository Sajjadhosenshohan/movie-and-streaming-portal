import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

// Schema for form validation
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuthStore();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data.name, data.email, data.password);
    navigate('/');
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create an Account
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            leftIcon={<User size={18} className="text-gray-400" />}
            error={errors.name?.message}
            fullWidth
            {...register('name')}
          />
          
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            leftIcon={<Mail size={18} className="text-gray-400" />}
            error={errors.email?.message}
            fullWidth
            {...register('email')}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="********"
            leftIcon={<Lock size={18} className="text-gray-400" />}
            error={errors.password?.message}
            fullWidth
            {...register('password')}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            placeholder="********"
            leftIcon={<Lock size={18} className="text-gray-400" />}
            error={errors.confirmPassword?.message}
            fullWidth
            {...register('confirmPassword')}
          />
          
          <div className="flex items-center mb-6">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-purple-500 hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-purple-500 hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            fullWidth
            leftIcon={<UserPlus size={18} />}
          >
            Create Account
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:text-purple-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;