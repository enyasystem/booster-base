import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p>At Booster Base Nigeria Limited, we collect:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Personal information (name, email, phone number)</li>
              <li>Business information</li>
              <li>Technical information (IP address, browser type)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Process your transactions</li>
              <li>Send you important updates and notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Data Protection</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, or destruction.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
