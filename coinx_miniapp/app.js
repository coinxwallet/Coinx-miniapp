
// Basic Mini App interactions for Coinxwallet (frontend-only).
// This is a client-side mock that integrates Telegram Web App SDK when available.
(function(){
  const tronAddress = 'TFdaN3zUoKCWWYjDqYWKaC3ECyzPwmDP4V';

  // Telegram WebApp integration
  let tg = window.Telegram ? window.Telegram.WebApp : null;
  if(tg){
    try{ tg.ready(); tg.expand(); }catch(e){ console.log('tg ready error', e) }
    const unsafe = tg.initDataUnsafe || {};
    const user = (unsafe.user && unsafe.user.first_name) ? unsafe.user : null;
    if(user){
      document.querySelector('.subtitle').innerText = 'Hi, ' + (user.first_name||'') + ' — Private exchange';
    }
  } else {
    document.querySelector('.subtitle').innerText = 'Open via Telegram to authenticate';
  }

  // UI controls
  const depositBtn = document.getElementById('depositBtn');
  const withdrawBtn = document.getElementById('withdrawBtn');
  const dashboard = document.getElementById('dashboard');
  const deposit = document.getElementById('deposit');
  const withdraw = document.getElementById('withdraw');
  const copyBtn = document.getElementById('copyBtn');
  const addrEl = document.getElementById('tronAddress');
  const markPaid = document.getElementById('markPaid');
  const withdrawForm = document.getElementById('withdrawForm');

  addrEl.innerText = tronAddress;

  depositBtn.addEventListener('click', ()=>{
    dashboard.classList.add('hidden');
    deposit.classList.remove('hidden');
    withdraw.classList.add('hidden');
  });
  withdrawBtn.addEventListener('click', ()=>{
    dashboard.classList.add('hidden');
    deposit.classList.add('hidden');
    withdraw.classList.remove('hidden');
  });

  copyBtn.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(tronAddress);
      copyBtn.innerText = 'Copied';
      setTimeout(()=> copyBtn.innerText='Copy',1200);
    }catch(e){ alert('Copy failed — long-press the address'); }
  });

  markPaid.addEventListener('click', ()=>{
    alert('Marked as paid. Admin will verify and credit your balance shortly.');
    // In future: call backend API to create a pending deposit record
  });

  withdrawForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const to = document.getElementById('wAddress').value.trim();
    const amt = document.getElementById('wAmount').value.trim();
    if(!to || !amt){ alert('Enter address and amount'); return; }
    // Send withdrawal request to admin via Telegram deep link
    const payload = {to, amt, user: (tg && tg.initDataUnsafe.user)?tg.initDataUnsafe.user: {id:'unknown'}};
    // For now, open a "mailto" like action: we'll show popup and copy payload to clipboard for manual processing.
    const txt = `Withdraw request:\nUser: ${payload.user.first_name || 'unknown'}\nAddress: ${to}\nAmount: ${amt}`;
    // copy to clipboard and alert
    navigator.clipboard.writeText(txt).then(()=>{
      alert('Withdraw request copied to clipboard. Please send this to admin chat.');
      if(tg) tg.close();
    }).catch(()=>{
      alert('Could not copy request. Please screenshot and send to admin.');
    });
  });

})();