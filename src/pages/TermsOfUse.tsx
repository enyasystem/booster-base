import React from 'react';
import Layout from '../components/Layout';

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Booster Base Nigeria Limited's services, you accept and agree to be bound by these Terms of Use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Services</h2>
            <p>We provide ICT solutions, training, and related services subject to these terms. Our services include but are not limited to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>IT consulting and solutions</li>
              <li>Software development</li>
              <li>Technical training</li>
              <li>Hardware sales and support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. User Obligations</h2>
            <p>Users of our services agree to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Provide accurate information</li>
              <li>Maintain the security of their account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use services in a responsible manner</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
