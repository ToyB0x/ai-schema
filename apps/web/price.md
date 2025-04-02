---
layout: home

hero:
  name: "プラン選択"
  text: "Find the Perfect Plan for Your Needs"
  tagline: "スケーラブルなプランで、あなたのビジネスの成長をサポートします。"
  actions:
    - theme: brand
      text: Get Started
      link: "#pricing"
    - theme: alt
      text: Contact Sales
      link: "#contact"
---

<div class="pricing-container" id="pricing">
  <h1>Pricing Plans</h1>
  <div class="pricing-subtitle">Choose the plan that fits your needs</div>
  
  <div class="pricing-toggle">
    <span class="active">Monthly</span>
    <label class="switch">
      <input type="checkbox" id="billing-toggle">
      <span class="slider round"></span>
    </label>
    <span>Yearly <span class="save-badge">Save 20%</span></span>
  </div>

  <div class="pricing-grid">
    <div class="pricing-card">
      <div class="card-header">
        <h2>Free</h2>
        <div class="price">
          <span class="currency">$</span>
          <span class="amount">0</span>
          <span class="period">/month</span>
        </div>
        <div class="description">Perfect for individuals and small teams just getting started.</div>
      </div>
      <div class="card-features">
        <ul>
          <li>Up to 3 team members</li>
          <li>5 projects</li>
          <li>Basic analytics</li>
          <li>24-hour support response time</li>
        </ul>
      </div>
      <div class="card-action">
        <a href="#" class="pricing-button">Get Started</a>
      </div>
    </div>

    <div class="pricing-card popular">
      <div class="popular-badge">Most Popular</div>
      <div class="card-header">
        <h2>Pro</h2>
        <div class="price">
          <span class="currency">$</span>
          <span class="amount">20</span>
          <span class="period">/user/month</span>
        </div>
        <div class="description">For growing teams that need more power and flexibility.</div>
      </div>
      <div class="card-features">
        <ul>
          <li>Unlimited team members</li>
          <li>Unlimited projects</li>
          <li>Advanced analytics & reporting</li>
          <li>4-hour support response time</li>
          <li>Custom integrations</li>
          <li>API access</li>
        </ul>
      </div>
      <div class="card-action">
        <a href="#" class="pricing-button primary">Choose Pro</a>
      </div>
    </div>

    <div class="pricing-card">
      <div class="card-header">
        <h2>Enterprise</h2>
        <div class="price">
          <span class="contact-sales">Contact Sales</span>
        </div>
        <div class="description">For large organizations with specific needs and requirements.</div>
      </div>
      <div class="card-features">
        <ul>
          <li>Everything in Pro</li>
          <li>Dedicated account manager</li>
          <li>Custom SLA</li>
          <li>1-hour support response time</li>
          <li>On-premises deployment option</li>
          <li>24/7 phone support</li>
          <li>Custom training & onboarding</li>
        </ul>
      </div>
      <div class="card-action">
        <a href="#" class="pricing-button">Contact Sales</a>
      </div>
    </div>
  </div>

  <div class="pricing-faq">
    <h2>よくある質問</h2>
    <div class="faq-grid">
      <div class="faq-item">
        <h3>プランはいつでも変更できますか？</h3>
        <p>はい、いつでもプランをアップグレードまたはダウングレードできます。変更は即時に反映され、料金は日割りで計算されます。</p>
      </div>
      <div class="faq-item">
        <h3>支払い方法はどのようなものがありますか？</h3>
        <p>クレジットカード、銀行振込、PayPalなど、様々な支払い方法に対応しています。Enterprise プランでは請求書払いも可能です。</p>
      </div>
      <div class="faq-item">
        <h3>無料トライアルはありますか？</h3>
        <p>Pro プランには14日間の無料トライアルがあります。クレジットカード情報なしで開始でき、トライアル期間中にいつでもキャンセル可能です。</p>
      </div>
      <div class="faq-item">
        <h3>返金ポリシーはどうなっていますか？</h3>
        <p>30日間の返金保証を提供しています。サービスにご満足いただけない場合は、購入から30日以内に全額返金いたします。</p>
      </div>
    </div>
  </div>
</div>

<style>
/* Modern Pricing Layout */
.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: var(--vp-c-text-1);
}

.pricing-container h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
}

/* Pricing toggle switch */
.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
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

/* Pricing Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

/* Pricing Cards */
.pricing-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.pricing-card.popular {
  border: 2px solid var(--vp-c-brand-1);
  z-index: 2;
}

.popular-badge {
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

.card-header {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
  background: linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.price {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.currency {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-right: 4px;
}

.period {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
  margin-top: 1rem;
  margin-left: 4px;
}

.contact-sales {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  min-height: 2.5rem;
}

.card-features {
  padding: 1.5rem;
  flex: 1;
}

.card-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-features li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  font-size: 0.95rem;
}

.card-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.card-action {
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
  background: linear-gradient(0deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.pricing-button {
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

.pricing-button:hover {
  background-color: var(--vp-c-brand-soft);
}

.pricing-button.primary {
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border: none;
}

.pricing-button.primary:hover {
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1-rgb), 0.4);
}

/* FAQ Section */
.pricing-faq {
  max-width: 900px;
  margin: 0 auto;
}

.pricing-faq h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
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
}

.faq-item p {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-container h1 {
    font-size: 2rem;
  }
}

/* Hide default home elements */
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