/* ==========================================================================
   VALENCE CAPITAL — AUTONOMOUS CAPITAL LEDGER
   Real-Time Streaming Transactions, Telemetry Dials & Category Filters
   ========================================================================== */

(function initLedger() {
  const transactionsContainer = document.getElementById('ledgerTransactions');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const liveYieldCounter = document.getElementById('liveYieldCounter');

  if (!transactionsContainer) return;

  const initialTransactions = [
    {
      name: 'Automated Treasury Sweep',
      category: 'yield',
      categoryLabel: '5.24% APY Yield',
      icon: '📈',
      date: 'Just now',
      amount: '+$4,218.40',
      isPositive: true,
      status: 'Settled'
    },
    {
      name: 'Stripe Global Gateway Batch',
      category: 'yield',
      categoryLabel: 'Merchant Inflow',
      icon: '💳',
      date: '14 min ago',
      amount: '+$148,920.00',
      isPositive: true,
      status: 'Settled'
    },
    {
      name: 'Amazon Web Services (AWS)',
      category: 'spend',
      categoryLabel: 'Cloud Infrastructure',
      icon: '☁️',
      date: '1 hour ago',
      amount: '-$14,350.22',
      isPositive: false,
      status: 'Completed'
    },
    {
      name: 'USD / EUR Automated Hedging',
      category: 'fx',
      categoryLabel: 'Treasury FX Swap',
      icon: '💱',
      date: '2 hours ago',
      amount: '+$85,000.00',
      isPositive: true,
      status: 'Settled'
    },
    {
      name: 'Sequoia Series B Tranche Wire',
      category: 'yield',
      categoryLabel: 'Equity Financing',
      icon: '🏦',
      date: 'Today, 09:15 AM',
      amount: '+$5,000,000.00',
      isPositive: true,
      status: 'Verified'
    },
    {
      name: 'OpenAI Enterprise Compute Cluster',
      category: 'spend',
      categoryLabel: 'AI Infrastructure',
      icon: '⚡',
      date: 'Yesterday',
      amount: '-$28,400.00',
      isPositive: false,
      status: 'Completed'
    }
  ];

  let currentCategory = 'all';

  function renderTransactions(filter = 'all') {
    transactionsContainer.innerHTML = '';
    const filtered = filter === 'all' 
      ? initialTransactions 
      : initialTransactions.filter(tx => tx.category === filter);

    filtered.forEach(tx => {
      const row = document.createElement('div');
      row.className = 'tx-row';
      row.innerHTML = `
        <div class="tx-entity">
          <div class="tx-icon-frame">${tx.icon}</div>
          <div>
            <div class="tx-name">${tx.name}</div>
            <div class="tx-category-badge">${tx.categoryLabel}</div>
          </div>
        </div>
        <div class="tx-date text-secondary font-mono">${tx.date}</div>
        <div class="tx-category-badge">${tx.category.toUpperCase()}</div>
        <div class="tx-amount font-mono ${tx.isPositive ? 'positive' : 'negative'}">${tx.amount}</div>
        <div class="tx-status-pill font-mono">
          <span class="status-pulse"></span>
          ${tx.status}
        </div>
      `;
      transactionsContainer.appendChild(row);
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      renderTransactions(currentCategory);
    });
  });

  // Initial Render
  renderTransactions('all');

  // Simulated Live Inflow Streamer (Every 18 seconds)
  const incomingQueue = [
    {
      name: 'Daily Treasury Sweep Yield',
      category: 'yield',
      categoryLabel: '5.24% Yield Compound',
      icon: '📈',
      date: 'Just now',
      amount: '+$842.15',
      isPositive: true,
      status: 'Settled'
    },
    {
      name: 'GitHub Enterprise Copilot Tier',
      category: 'spend',
      categoryLabel: 'Developer Tools',
      icon: '💻',
      date: 'Just now',
      amount: '-$1,240.00',
      isPositive: false,
      status: 'Completed'
    },
    {
      name: 'Stripe Europe Inbound Wire',
      category: 'fx',
      categoryLabel: 'EUR Auto-Sweep',
      icon: '💶',
      date: 'Just now',
      amount: '+$34,500.00',
      isPositive: true,
      status: 'Settled'
    }
  ];

  let queueIdx = 0;
  setInterval(() => {
    const nextTx = incomingQueue[queueIdx % incomingQueue.length];
    queueIdx++;

    initialTransactions.unshift(nextTx);
    if (initialTransactions.length > 8) {
      initialTransactions.pop();
    }

    if (currentCategory === 'all' || currentCategory === nextTx.category) {
      renderTransactions(currentCategory);
      const firstRow = transactionsContainer.firstElementChild;
      if (firstRow) {
        firstRow.classList.add('new-incoming');
      }
    }
  }, 16000);

  // Live Compounding APY Ticker
  if (liveYieldCounter) {
    let currentTotalYield = 284392.40;
    setInterval(() => {
      currentTotalYield += (Math.random() * 0.45) + 0.15;
      liveYieldCounter.textContent = '$' + currentTotalYield.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }, 1200);
  }
})();
