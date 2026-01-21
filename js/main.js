// Charge les données depuis data/portfolio.json et remplit la page
async function loadData(){
  try{
    const res = await fetch('data/portfolio.json');
    const data = await res.json();
    document.title = data.name + ' — ' + data.title;
    document.getElementById('hero-name').textContent = data.name + ' — ' + data.title;
    document.getElementById('hero-blurb').textContent = data.blurb;
    document.getElementById('about-text').textContent = data.about;
    document.getElementById('contact-text').textContent = data.contact.description;
    document.getElementById('contact-email').innerHTML = 'Email: <a href="mailto:'+data.contact.email+'">'+data.contact.email+'</a>';
    document.getElementById('contact-phone').textContent = 'Tel: ' + data.contact.phone;
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // compétences
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    data.skills.forEach(s => {
      const el = document.createElement('div'); el.className='skill'; el.textContent = s; skillsList.appendChild(el);
    });

    // projets web
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    data.projects.forEach(p => {
      const card = document.createElement('article'); card.className='project';
      card.innerHTML = `<h3>${p.name}</h3><p>${p.description}</p><div class="meta"><small>${p.stack.join(' • ')}</small><div><a class="btn" href="${p.link}" target="_blank">Voir</a></div></div>`;
      projectsList.appendChild(card);
    });

    // apps mobile
    //const mobileList = document.getElementById('mobile-list');
    //mobileList.innerHTML = '';
    //data.mobile.forEach(a => {
    //  const card = document.createElement('article'); card.className='project';
    //  card.innerHTML = `<h3>${a.name}</h3><p>${a.description}</p><div class="meta"><small>${a.stack.join(' • ')}</small><div><a class="btn" href="${a.store || '#'}" target="_blank">Détails</a></div></div>`;
    //  mobileList.appendChild(card);
    //});

    // bouton de téléchargement du CV (si fourni)
    const resumeBtn = document.getElementById('download-resume');
    if(data.resume){ resumeBtn.href = data.resume; resumeBtn.target = '_blank'; } else { resumeBtn.style.display='none'; }

  }catch(err){
    console.error('Erreur chargement données:',err);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadData();
  document.getElementById('nav-toggle').addEventListener('click', ()=>{
    const nav = document.querySelector('.nav'); nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
  // Gestion du formulaire de contact (Formspree par défaut). Remplacez data-formspree-endpoint dans le HTML.
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const statusEl = document.getElementById('contact-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const endpoint = contactForm.dataset.formspreeEndpoint;
      // If EmailJS configuration is present, user can use EmailJS instead (see README)
      const useEmailJS = contactForm.dataset.emailjsService && window.emailjs;
      try{
        submitBtn.disabled = true; submitBtn.textContent = 'Envoi...';
        if(useEmailJS){
          // Example: set data-emailjs-service, data-emailjs-template, data-emailjs-user on the form
          await emailjs.sendForm(contactForm.dataset.emailjsService, contactForm.dataset.emailjsTemplate, contactForm);
          statusEl.style.color = 'lightgreen';
          statusEl.textContent = 'Message envoyé (EmailJS). Merci !';
          contactForm.reset();
        } else if(endpoint && endpoint.includes('formspree.io')){
          const formData = new FormData(contactForm);
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
          });
          const json = await res.json().catch(()=>null);
          if(res.ok){
            statusEl.style.color = 'lightgreen';
            statusEl.textContent = 'Message envoyé. Je vous répondrai bientôt.';
            contactForm.reset();
          } else {
            statusEl.style.color = '#ffb4b4';
            // Formspree returns errors in json.errors
            const errMsg = (json && json.error) ? json.error : (json && json.errors && json.errors.map(e=>e.message).join(', ')) || 'Erreur envoi du formulaire.';
            statusEl.textContent = 'Erreur: ' + errMsg;
          }
        } else {
          statusEl.style.color = '#ffd6a5';
          statusEl.textContent = 'Formulaire non configuré. Configurez Formspree ou EmailJS (voir README).';
        }
      }catch(err){
        console.error('Contact send error',err);
        const statusEl = document.getElementById('contact-status');
        statusEl.style.color = '#ffb4b4';
        statusEl.textContent = 'Une erreur est survenue lors de l\'envoi.';
      }finally{
        submitBtn.disabled = false; submitBtn.textContent = 'Envoyer';
      }
    });
  }
});
