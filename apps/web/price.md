---
layout: home
---

# Pricing

<div style="text-align: center; margin-bottom: 2rem; color: var(--vp-c-text-2);">
Choose the plan that's right for you.
</div>

<div class="features">
  <div class="feature plan">
    <h2>Free</h2>
    <p class="price">$0</p>
    <p class="details">For individuals and small teams getting started.</p>
    <ul>
      <li>Basic Features</li>
      <li>Community Support</li>
      <li>Up to 3 users</li>
    </ul>
    <a href="#" class="button">Get Started</a>
  </div>
  <div class="feature plan featured">
    <h2>Pro</h2>
    <p class="price">$20 <span class="per-user">/ user / month</span></p>
    <p class="details">For growing teams that need more power and support.</p>
    <ul>
      <li>All Free features</li>
      <li>Advanced Features</li>
      <li>Priority Support</li>
      <li>Unlimited users</li>
    </ul>
    <a href="#" class="button primary">Choose Pro</a>
  </div>
  <div class="feature plan">
    <h2>Enterprise</h2>
    <p class="price">Custom</p>
    <p class="details">For large organizations with specific needs.</p>
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
/* Apply styles to features to mimic pricing table */
.VPFeatures .items {
  gap: 1.5rem !important; /* Adjust gap between plans */
}

.feature.plan {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem !important; /* Override default feature padding */
  margin: 0 !important; /* Override default feature margin */
  text-align: center;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Make plans equal height */
}

.feature.plan:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.feature.plan.featured {
  border-color: var(--vp-c-brand-1);
  border-width: 2px;
  position: relative;
  /* overflow: hidden; */ /* Removed to prevent cutting off hover shadow */
}

/* "Most Popular" Banner - Adjusted for better positioning within feature */
.feature.plan.featured::before {
  content: 'Most Popular';
  position: absolute;
  top: -1px; /* Align with top border */
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  padding: 0.25rem 1rem;
  font-size: 0.75rem; /* Slightly smaller */
  font-weight: 600; /* Bold */
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  line-height: 1.5;
  z-index: 1; /* Ensure banner is above other content */
}


/* Override default feature title styles */
.feature.plan h2 {
  font-size: 1.4rem !important; /* Adjusted size */
  font-weight: 600 !important;
  margin-bottom: 1rem !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  line-height: 1.4 !important;
  color: var(--vp-c-text-1) !important; /* Ensure title color */
}

.feature.plan.featured h2 {
  margin-top: 1.8rem !important; /* Make space for the banner */
}

.price {
  font-size: 2.2rem; /* Adjusted size */
  font-weight: 700; /* Bolder */
  margin: 0.5rem 0 1rem 0; /* Adjusted margin */
  color: var(--vp-c-brand-1);
  line-height: 1.2;
}

.price .per-user {
  font-size: 0.9rem; /* Adjusted size */
  font-weight: 400; /* Normal weight */
  color: var(--vp-c-text-2);
}

/* Feature details text */
.feature.plan .details {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  flex-grow: 1; /* Push list and button down */
  min-height: 3em; /* Ensure space even if text is short */
}


.feature.plan ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0; /* Adjusted margin */
  text-align: left;
  color: var(--vp-c-text-1);
  font-size: 0.9rem; /* Consistent font size */
}

.feature.plan li {
  margin-bottom: 0.6rem; /* Slightly more space */
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.4;
}

.feature.plan li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.button {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: transparent;
  padding: 0.6rem 1.5rem; /* Adjusted padding */
  border-radius: 20px; /* Pill shape */
  text-decoration: none;
  font-weight: 600; /* Bold */
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-top: auto; /* Push button to bottom */
  width: fit-content; /* Prevent button stretching */
  align-self: center; /* Center button horizontally */
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

/* Hide default home elements we don't need */
.VPHome .name,
.VPHome .text,
.VPHome .tagline,
.VPHome .actions {
  display: none !important;
}

.VPHome .image-src {
    display: none !important;
}

/* Adjust padding for the features section */
.VPFeatures {
    padding: 48px 24px !important; /* Adjust top/bottom padding */
}

/* Ensure features container takes reasonable width */
.VPFeatures .container {
    max-width: 1152px !important; /* Match default theme width */
    margin: 0 auto;
}

/* Remove top padding from content following features */
.VPFeatures + .VPContent {
    padding-top: 0 !important;
}

</style>