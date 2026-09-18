/* ==========================================================================
   VALENCE CAPITAL — TREASURY YIELD & FDIC CALCULATOR
   Interactive Capital Range Slider & Real-Time Financial Mathematics
   ========================================================================== */

(function initCalculator() {
  const depositSlider = document.getElementById('depositSlider');
  const liveDepositDisplay = document.getElementById('liveDepositDisplay');
  const annualYieldDisplay = document.getElementById('annualYieldDisplay');
  const dailyYieldDisplay = document.getElementById('dailyYieldDisplay');
  const fdicCoverageDisplay = document.getElementById('fdicCoverageDisplay');
  const traditionalFeeLossDisplay = document.getElementById('traditionalFeeLossDisplay');

  // Multi-Currency FX Widget
  const fxAmountInput = document.getElementById('fxAmountInput');
  const fxCurrencySelect = document.getElementById('fxCurrencySelect');
  const fxOutputAmount = document.getElementById('fxOutputAmount');

  const APY_RATE = 0.0524; // 5.24% Government-backed Treasury APY
  const FDIC_PER_BANK = 250000;
  const MAX_FDIC_LIMIT = 75000000; // $75M program bank sweep network

  const FX_RATES = {
    EUR: 0.92,
    GBP: 0.78,
    JPY: 154.60,
    SGD: 1.34,
    USD: 1.00
  };

  function updateTreasuryCalculations(capital) {
    // 1. Annual & Daily Yield
    const annualEarnings = capital * APY_RATE;
    const dailyEarnings = annualEarnings / 365;

    // 2. FDIC Insurance Calculation (Sweep network distributes into $250k buckets)
    const requiredBanks = Math.ceil(capital / FDIC_PER_BANK);
    const insuredCapacity = Math.min(requiredBanks * FDIC_PER_BANK, MAX_FDIC_LIMIT);

    // 3. Traditional Bank Opportunity Cost (0.01% avg commercial yield + wire fees)
    const legacyYield = capital * 0.0001;
    const missedOpportunity = annualEarnings - legacyYield;

    // Render formatted numbers
    if (liveDepositDisplay) {
      liveDepositDisplay.textContent = '$' + Number(capital).toLocaleString('en-US');
    }

    if (annualYieldDisplay) {
      annualYieldDisplay.textContent = '+$' + Math.round(annualEarnings).toLocaleString('en-US');
    }

    if (dailyYieldDisplay) {
      dailyYieldDisplay.textContent = '+$' + Math.round(dailyEarnings).toLocaleString('en-US') + ' / day';
    }

    if (fdicCoverageDisplay) {
      fdicCoverageDisplay.textContent = '$' + Math.min(capital, insuredCapacity).toLocaleString('en-US') + ' (100% Insured)';
    }

    if (traditionalFeeLossDisplay) {
      traditionalFeeLossDisplay.textContent = '+$' + Math.round(missedOpportunity).toLocaleString('en-US') + ' gained';
    }
  }

  if (depositSlider) {
    depositSlider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      updateTreasuryCalculations(value);
    });

    // Initialize with default value ($5,000,000)
    updateTreasuryCalculations(parseFloat(depositSlider.value));
  }

  // FX Conversion Logic
  function updateFxSwap() {
    if (!fxAmountInput || !fxOutputAmount || !fxCurrencySelect) return;
    const usd = parseFloat(fxAmountInput.value) || 0;
    const curr = fxCurrencySelect.value;
    const rate = FX_RATES[curr] || 1;
    const converted = usd * rate;

    const formatted = curr === 'JPY'
      ? Math.round(converted).toLocaleString('en-US')
      : converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    fxOutputAmount.textContent = `${formatted} ${curr}`;
  }

  if (fxAmountInput) fxAmountInput.addEventListener('input', updateFxSwap);
  if (fxCurrencySelect) fxCurrencySelect.addEventListener('change', updateFxSwap);

  // Initial FX update
  updateFxSwap();
})();
