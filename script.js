// script.js
const ADMIN_USERNAME = 'Aline Menezes';
const ADMIN_PASSWORD = 'aline2024';
let clients = JSON.parse(localStorage.getItem('clients')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];
let currentUser = null;

// Login
document.getElementById('loginBtn')?.addEventListener('click',()=>{
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if(username===ADMIN_USERNAME && password===ADMIN_PASSWORD){
    localStorage.setItem('isAdmin','true');
    window.location.href='admin.html';
  } else { alert('Login inválido. Clientes devem usar o cadastro.'); }
});

// Admin Interface
function loadAdminInterface(){
  renderAgenda();
  renderClientes();
  renderPromocoes();
  renderAniversariantes();
}

function renderClientes(){
  const main = document.getElementById('mainContent');
  main.innerHTML = '<h2>Clientes</h2>';
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Nome</th><th>WhatsApp</th><th>Data de Nascimento</th><th>Ações</th></tr>';
  clients.forEach(c=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${c.name}</td><td>${c.phone}</td><td>${c.birthday}</td>
      <td><button onclick="editClient(${c.id})">Editar</button>
          <button onclick="deleteClient(${c.id})">Excluir</button></td>`;
    table.appendChild(tr);
  });
  main.appendChild(table);
}

function editClient(id){
  const client = clients.find(c=>c.id===id);
  if(!client) return;
  const newName = prompt('Nome completo:', client.name);
  const newPhone = prompt('WhatsApp:', client.phone);
  const newBirthday = prompt('Data de nascimento:', client.birthday);
  if(newName && newPhone && newBirthday){
    client.name=newName; client.phone=newPhone; client.birthday=newBirthday;
    saveClients(); renderClientes();
  }
}

function deleteClient(id){
  if(confirm('Deseja realmente excluir este cliente?')){
    clients = clients.filter(c=>c.id!==id);
    saveClients(); renderClientes();
  }
}

function saveClients(){ localStorage.setItem('clients',JSON.stringify(clients)); }

function renderAgenda(){ const main = document.getElementById('mainContent'); if(!main) return; main.innerHTML='<h2>Agenda</h2><div id="calendarView"></div>'; }

function renderAniversariantes(){
  const main = document.getElementById('mainContent'); if(!main) return;
  const month = new Date().getMonth()+1;
  const aniversariantes = clients.filter(c=>parseInt(c.birthday.split('-')[1])===month);
  let html = '<h2>Aniversariantes do Mês</h2>';
  aniversariantes.forEach(c=>{ html+=`<div>${c.name} <button onclick="sendWhatsApp('${c.phone}','Parabéns ${c.name}! 🎉 Aproveite 10% de desconto neste mês de aniversário!')">Enviar WhatsApp</button></div>`; });
  main.innerHTML+=html;
}

function sendWhatsApp(phone,message){ const url=`https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`; window.open(url,'_blank'); }

function renderPromoco
