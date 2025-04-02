---
layout: home

hero:
  name: "Pricing"
  text: "Find the Perfect Plan for Your Needs"
  tagline: "Scalable plans to support your business growth"
  actions:
    - theme: brand
      text: Get Started
      link: "#pricing"
    - theme: alt
      text: Contact Sales
      link: "#contact"
---

<div class="pricing-section" id="pricing">

# Choose Your Plan

<div class="pricing-toggle">
  <span class="active">Monthly</span>
  <label class="switch">
    <input type="checkbox" id="billing-toggle">
    <span class="slider round"></span>
  </label>
  <span>Yearly <span class="save-badge">Save 20%</span></span>
</div>

<div class="pricing-container">
  <div class="pricing-plan">
    <div class="plan-header">
      <h2>Free</h2>
      <div class="plan-price">
        <span>$</span>0
        <span class="period">/month</span>
      </div>
      <p>Perfect for individuals and small teams just getting started</p>
    </div>
    <div class="plan-features">
      <div class="feature">Up to 3 team members</div>
      <div class="feature">5 projects</div>
      <div class="feature">Basic analytics</div>
      <div class="feature">24-hour support</div>
    </div>
    <div class="plan-action">
      <a href="#" class="plan-button">Get Started</a>
    </div>
  </div>

  <div class="pricing-plan popular">
    <div class="popular-tag">Most Popular</div>
    <div class="plan-header">
      <h2>Pro</h2>
      <div class="plan-price">
        <span>$</span>20
        <span class="period">/user/month</span>
      </div>
      <p>For growing teams that need more power and flexibility</p>
    </div>
    <div class="plan-features">
      <div class="feature">Unlimited team members</div>
      <div class="feature">Unlimited projects</div>
      <div class="feature">Advanced analytics & reporting</div>
      <div class="feature">4-hour support response time</div>
      <div class="feature">Custom integrations</div>
      <div class="feature">API access</div>
    </div>
    <div class="plan-action">
      <a href="#" class="plan-button primary">Choose Pro</a>
    </div>
  </div>

  <div class="pricing-plan">
    <div class="plan-header">
      <h2>Enterprise</h2>
      <div class="plan-price enterprise">
        Contact Sales
      </div>
      <p>For large organizations with specific needs and requirements</p>
    </div>
    <div class="plan-features">
      <div class="feature">Everything in Pro</div>
      <div class="feature">Dedicated account manager</div>
      <div class="feature">Custom SLA</div>
      <div class="feature">1-hour support response</div>
      <div class="feature">On-premises deployment</div>
      <div class="feature">24/7 phone support</div>
      <div class="feature">Custom training</div>
    </div>
    <div class="plan-action">
      <a href="#" class="plan-button">Contact Sales</a>
    </div>
  </div>
</div>

## Frequently Asked Questions

<div class="faq-section">
  <div class="faq-item">
    <h3>Can I change plans at any time?</h3>
    <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and are prorated for your billing period.</p>
  </div>
  <div class="faq-item">
    <h3>What payment methods do you accept?</h3>
    <p>We accept credit cards, bank transfers, and PayPal. For Enterprise plans, we also offer invoice billing.</p>
  </div>
  <div class="faq-item">
    <h3>Is there a free trial?</h3>
    <p>The Pro plan comes with a 14-day free trial. You can start without a credit card and cancel anytime during the trial period.</p>
  </div>
  <div class="faq-item">
    <h3>What's your refund policy?</h3>
    <p>We offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll refund your payment in full within 30 days of purchase.</p>
  </div>
</div>

</div>

<style>
/* Modern Pricing Layout */
.pricing-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: var(--vp-c-text-1);
}

.pricing-section h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Pricing toggle switch */
.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 3rem;
  font-weight: 500;
}

.pricing-toggle span {
  padding: 0 12px;
}

.pricing-toggle span.active {
  color: var(--vp-c-brand-1);
}

.save-badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 4px;
  font-weight: 600;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--vp-c-bg-soft);
  transition: .4s;
  border: 1px solid var(--vp-c-divider);
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 2px;
  background-color: var(--vp-c-brand-1);
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--vp-c-bg-soft);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Pricing Container */
.pricing-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Pricing Plans */
.pricing-plan {
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.pricing-plan:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.pricing-plan.popular {
  border: 2px solid var(--vp-c-brand-1);
  z-index: 2;
}

.popular-tag {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-bottom-left-radius: 8px;
  z-index: 3;
}

.plan-header {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
  background: linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.plan-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  border-bottom: none;
  padding-bottom: 0;
}

.plan-price {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.plan-price span {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-right: 4px;
}

.plan-price .period {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
  margin-top: 1rem;
  margin-left: 4px;
}

.plan-price.enterprise {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: block;
  padding-top: 1rem;
}

.plan-header p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0;
  min-height: 2.5rem;
}

.plan-features {
  padding: 1.5rem;
  flex: 1;
}

.feature {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  font-size: 0.95rem;
}

.feature::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.plan-action {
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
  background: linear-gradient(0deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.plan-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: transparent;
  width: 100%;
}

.plan-button:hover {
  background-color: var(--vp-c-brand-soft);
}

.plan-button.primary {
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border: none;
}

.plan-button.primary:hover {
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1-rgb), 0.4);
}

/* FAQ Section */
.pricing-section h2 {
  text-align: center;
  font-size: 2rem;
  margin: 4rem 0 2rem;
  color: var(--vp-c-text-1);
}

.faq-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.faq-item {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.faq-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  border-bottom: none;
  padding-bottom: 0;
}

.faq-item p {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pricing-container {
    flex-direction: column;
    align-items: center;
  }
  
  .pricing-plan {
    width: 100%;
    max-width: 400px;
  }
  
  .faq-section {
    grid-template-columns: 1fr;
  }
  
  .pricing-section h1 {
    font-size: 2rem;
  }
}

/* Hide default elements we don't need */
.VPHome .VPHero .container {
  margin-bottom: 0 !important;
}

.VPContent .VPHome {
  padding-bottom: 0 !important;
}
</style>

<script>
// This will be client-side JavaScript that would toggle between monthly/yearly billing
// Since Vitepress compiles this, we'd include the JS for full interactivity
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('billing-toggle');
    if (toggle) {
      toggle.addEventListener('change', function() {
        // This would update prices in a real implementation
        console.log('Billing period toggled:', this.checked ? 'yearly' : 'monthly');
      });
    }
  });
}
</script>