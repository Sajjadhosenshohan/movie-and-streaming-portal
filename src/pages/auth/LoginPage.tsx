import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <LoginForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;