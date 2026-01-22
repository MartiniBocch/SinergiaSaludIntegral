(function(){

  const STORAGE_KEY = 'gs_theme_mode';
  const html = document.documentElement;

  function applyMode(mode){
    if(mode === 'light'){
      html.classList.add('light-mode');
      document.getElementById('modeToggle').textContent = 'Dark';
    } else {
      html.classList.remove('light-mode');
      document.getElementById('modeToggle').textContent = 'Light';
    }
    localStorage.setItem(STORAGE_KEY, mode);
  }

  document.addEventListener('DOMContentLoaded', ()=>{

    applyMode(localStorage.getItem(STORAGE_KEY) || 'dark');

    document.getElementById('modeToggle').addEventListener('click',()=> {
      applyMode(html.classList.contains('light-mode') ? 'dark' : 'light');
    });

    document.querySelectorAll('[data-setstyle]').forEach(btn=>{
      btn.addEventListener('click', ()=> applyMode(btn.dataset.setstyle));
    });

    const form = document.getElementById('bookingForm');
    const msg = document.getElementById('formMessage');
    const FORM_ENDPOINT = 'https://formspree.io/f/YOUR-ID-HERE';

    form.addEventListener('submit', async e=>{
      e.preventDefault();
      msg.textContent='Sending...';

      const data = new FormData(form);
      const res = await fetch(FORM_ENDPOINT,{method:'POST',body:data,headers:{'Accept':'application/json'}});

      msg.textContent = res.ok ? 'Sent — I will reply shortly.' : 'Error — please try email method.';
      if(res.ok) form.reset();
    });

  });

  window.mailtoFallback = function(){
    const f = new FormData(document.getElementById('bookingForm'));
    window.location.href = `mailto:georgesymusic@gmail.com?subject=Booking Request&body=${encodeURIComponent([...f.entries()].map(v=>v.join(': ')).join("\n"))}`;
  };

})();
