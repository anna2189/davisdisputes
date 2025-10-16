<?php
/**
 * "Our services" section for the front page.
 * Reuses existing theme styles and color system.
 */
?>
<section class="services-section" id="our-services" style="padding: 60px 0; background: var(--light-bg);">
  <div class="section-container">
    <div class="section-header">
      <h2 class="section-title" style="color: var(--primary-navy);">Our services</h2>
    </div>

    <div class="services-grid offer-grid">
      <!-- Enforcement Strategy -->
      <article class="service-card">
        <a href="<?php echo esc_url( home_url( '/enforcement-strategy/' ) ); ?>" class="service-card__link" aria-label="Learn more about Enforcement Strategy">Enforcement Strategy</a>
        <div class="service-icon">◆</div>
        <h3 class="service-title" style="color: var(--primary-navy);">Enforcement Strategy</h3>
      </article>

      <!-- Litigation Finance Consulting -->
      <article class="service-card">
        <a href="<?php echo esc_url( home_url( '/litigation-finance-consulting/' ) ); ?>" class="service-card__link" aria-label="Learn more about Litigation Finance Consulting">Litigation Finance Consulting</a>
        <div class="service-icon">◆</div>
        <h3 class="service-title" style="color: var(--primary-navy);">Litigation Finance Consulting</h3>
      </article>

      <!-- Strategic Dispute Advisory -->
      <article class="service-card">
        <a href="<?php echo esc_url( home_url( '/strategic-dispute-advisory/' ) ); ?>" class="service-card__link" aria-label="Learn more about Strategic Dispute Advisory">Strategic Dispute Advisory</a>
        <div class="service-icon">◆</div>
        <h3 class="service-title" style="color: var(--primary-navy);">Strategic Dispute Advisory</h3>
      </article>
    </div>
  </div>
</section>