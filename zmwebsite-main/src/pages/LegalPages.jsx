import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

export function PrivacyPolicyPage({ navigate }) {
  const breadcrumbs = [{ label: 'Privacy Policy' }];
  return (
    <div className="legal-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />
      <section className="page-hero-banner">
        <div className="container">
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-sub">ZM Printing & Design Ltd. Corporate Data Protection Commitment</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="legal-content">
            <h2>1. Information We Collect</h2>
            <p>
              When you submit a quotation request, upload artwork vectors, or contact our merchandising department, ZM Printing & Design Ltd. collects buyer names, company affiliations, email addresses, phone/WhatsApp contact information, and tech pack specifications solely for quotation, prototype sampling, and garment manufacturing execution.
            </p>
            <h2>2. Proprietary Artwork & Design Protection</h2>
            <p>
              We treat all artwork files, logo vectors, Pantone combinations, and technical garment specifications submitted by buyers under strict non-disclosure terms. Your brand assets will never be shared, licensed, or repurposed for third parties.
            </p>
            <h2>3. Contact & Inquiries</h2>
            <p>
              For data privacy inquiries, contact our management desk at <strong>info@zmprintingbd.com</strong> or our registered office at House # 30, Road # 02, Block # B, Turag, Dhaka-1230, Bangladesh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TermsPage({ navigate }) {
  const breadcrumbs = [{ label: 'Terms & Conditions' }];
  return (
    <div className="legal-page">
      <Breadcrumbs items={breadcrumbs} navigate={navigate} />
      <section className="page-hero-banner">
        <div className="container">
          <h1 className="page-hero-title">Terms & Conditions</h1>
          <p className="page-hero-sub">Commercial Manufacturing & Order Execution Terms</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="legal-content">
            <h2>1. Orders & Prototyping</h2>
            <p>
              All production runs are initiated upon buyer approval of physical strike-off samples or signed lab dips. Tolerances in color registration adhere to standardized international AATCC/ISO guidelines.
            </p>
            <h2>2. Minimum Order Quantities (MOQ)</h2>
            <p>
              Standard MOQs are 500 units per colorway for micro-injected badges and screen prints, unless otherwise specified in formal commercial agreements.
            </p>
            <h2>3. Delivery & Dispatch</h2>
            <p>
              Production timelines commence upon receipt of fabric panels or raw trim materials. Dispatches are coordinated directly to designated garment sewing units in Bangladesh or overseas freight forwarders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
