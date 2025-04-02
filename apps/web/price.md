# Pricing

Choose the plan that's right for you.

<div class="pricing-grid">
  <div class="plan">
    <h2>Free</h2>
    <p class="price">$0</p>
    <p>For individuals and small teams getting started.</p>
    <ul>
      <li>Basic Features</li>
      <li>Community Support</li>
      <li>Up to 3 users</li>
    </ul>
    <a href="#" class="button">Get Started</a>
  </div>
  <div class="plan featured">
    <h2>Pro</h2>
    <p class="price">$20 <span class="per-user">/ user / month</span></p>
    <p>For growing teams that need more power and support.</p>
    <ul>
      <li>All Free features</li>
      <li>Advanced Features</li>
      <li>Priority Support</li>
      <li>Unlimited users</li>
    </ul>
    <a href="#" class="button primary">Choose Pro</a>
  </div>
  <div class="plan">
    <h2>Enterprise</h2>
    <p class="price">Custom</p>
    <p>For large organizations with specific needs.</p>
    <ul>
      <li>All Pro features</li>
      <li>Dedicated Support</li>
      <li>Custom Integrations</li>
      <li>SLA</li>
    </ul>
    <a href="#" class="button">Contact Sales</a>
  </div>
</div>

<style>
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.plan {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plan:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.plan.featured {
  border-color: var(--vp-c-brand-1);
  border-width: 2px;
  position: relative;
  overflow: hidden;
}

.plan.featured::before {
  content: 'Most Popular';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  padding: 0.25rem 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}


.plan h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: none; /* Remove default heading border */
  padding-bottom: 0; /* Remove default heading padding */
  margin-top: 0; /* Remove default heading margin */
}

.plan.featured h2 {
  margin-top: 1.5rem; /* Adjust for the "Most Popular" banner */
}


.price {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: var(--vp-c-brand-1);
}

.price .per-user {
  font-size: 1rem;
  font-weight: normal;
  color: var(--vp-c-text-2);
}

.plan ul {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
  color: var(--vp-c-text-1);
}

.plan li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.plan li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
}

.button {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.button.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.button.primary:hover {
  background-color: var(--vp-c-brand-2);
}
</style>