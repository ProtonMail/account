const searchParams = new URLSearchParams(window.location.search);

export const getDefaultConfigPlan = ({ Cycle = 12, Currency = 'EUR' } = {}) => ({
  Currency: searchParams.get('currency') || Currency,
  Cycle: +(searchParams.get('billing') || Cycle),
  Name: searchParams.get('plan') || 'vpnplus'
});

export const cycleString = ({ Cycle }, isMonth = false) => (Cycle === 12 && !isMonth) ? 'year' : 'month';
