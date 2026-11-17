// 1. Live Search Bar Filtering
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.campus-card');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        cards.forEach(card => {
            const match = card.textContent.toLowerCase().includes(query);
            card.style.display = match ? '' : 'none';
        });
    });
}
// 2. Category & "saved" Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click' , () => {
        filterBtns.forEach(b => {
            b.classList.remove('btn-dark' , 'active');
            b.classList.add('btn-outline-dark');
        });
        btn.classList.replace('btn-outline-dark' , 'btn-dark');
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = '';
            } else if (category === 'saved') {
                card.style.display = card.getAttribute('data-saved') === 'true' ? '' : 'none' ;
            } else {
                card.style.display = card.getAttribute('data-category') === category ? '' : 'none';
            }
        });
    });
});
// 3. Save Event Button Toggle
const saveBtns = document.querySelectorAll('.rsvp-btn , .save-btn');
saveBtns.forEach(btn => {
    btn.addEventListener('click' , () => {
        const card = btn.closest('.campus-card');
        const isSaved = card.getAttribute('data-saved') === 'true';
        if (!isSaved) {
            card.setAttribute('data-saved' , 'true');
            btn.textContent = '★ Saved' ;
            btn.classList.replace('btn-outline-dark' , 'btn-warning');
        } else {
            card.setAttribute('data-saved' , 'false');
            btn.textContent = 'Save' ;
            btn.classList.replace('btn-warning' , 'btn-outline-dark');
        }
    });
});
// 4. Dining Hall Switcher (Ritchie Marketplace vs. Caine Student Center)
const ritchieBtn = document.getElementById('ritchieBtn');
const caineBtn = document.getElementById('caineBtn');
const diningTitle = document.getElementById('diningTitle');
const diningHours = document.getElementById('diningHours');

if (ritchieBtn && caineBtn) {
  caineBtn.addEventListener('click', () => {
    caineBtn.classList.replace('btn-outline-dark', 'btn-dark');
    caineBtn.classList.add('active');
    ritchieBtn.classList.replace('btn-dark', 'btn-outline-dark');
    ritchieBtn.classList.remove('active');

    if (diningTitle) diningTitle.textContent = 'Caine Student Center Hours';
    if (diningHours) {
      diningHours.innerHTML = `
        <li><strong>Mon – Fri:</strong> 11:00 AM – 11:00 PM (Bulldog Bistro, Beanz & Grill)</li>
        <li><strong>Sat – Sun:</strong> 3:00 PM – 10:00 PM</li>
        <li><strong>Paws 'N Go Market:</strong> Open 24/7</li>
      `;
    }

    cards.forEach(card => {
      card.style.display = card.getAttribute('data-hall') === 'caine' ? '' : 'none';
    });
  });

  ritchieBtn.addEventListener('click', () => {
    ritchieBtn.classList.replace('btn-outline-dark', 'btn-dark');
    ritchieBtn.classList.add('active');
    caineBtn.classList.replace('btn-dark', 'btn-outline-dark');
    caineBtn.classList.remove('active');

    if (diningTitle) diningTitle.textContent = 'Ritchie Marketplace Hours';
    if (diningHours) {
      diningHours.innerHTML = `
        <li><strong>Breakfast:</strong> 7:30 AM – 9:00 AM</li>
        <li><strong>Lunch:</strong> 11:00 AM – 2:00 PM</li>
        <li><strong>Dinner:</strong> 5:00 PM – 7:00 PM</li>
      `;
    }

    cards.forEach(card => {
      card.style.display = card.getAttribute('data-hall') === 'caine' ? 'none' : '';
    });
  });
}
// 5. Initial API Inegration Setup (Adrian, Mi Campus Weather / Map Data)
async function loadCampusData() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.8984&longitude=-84.0627&current_weather=true&temperature_unit=farenheit');
        const data = await response.json();
        console.log('Adrian Campus Weather API connected:' , data.current_weather);
    } catch (error) {
        console.log('API placeholder setup ready:' , error);
    }
}
loadCampusData();