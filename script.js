// State Management
let members = JSON.parse(localStorage.getItem('dpa_members')) || [];

function init() {
    document.getElementById('loader').style.display = 'none';
    renderMembers();
    updateDashboard();
}

function showSection(id) {
    document.querySelectorAll('main section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function renderMembers() {
    const tbody = document.getElementById('memberBody');
    tbody.innerHTML = members.map(m => `
        <tr><td>${m.id}</td><td>${m.name}</td><td>${m.mobile}</td>
        <td><button onclick="deleteMember('${m.id}')">Delete</button></td></tr>
    `).join('');
    document.getElementById('totalMembers').innerText = members.length;
}

document.getElementById('memberForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newMember = {
        id: 'DPA' + Date.now(),
        name: document.getElementById('mName').value,
        mobile: document.getElementById('mMobile').value
    };
    members.push(newMember);
    localStorage.setItem('dpa_members', JSON.stringify(members));
    renderMembers();
    document.getElementById('memberModal').style.display = 'none';
});

function updateDashboard() {
    const ctx = document.getElementById('memberChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: { labels: ['Active', 'Pending'], datasets: [{ data: [members.length, 0], backgroundColor: '#2563eb' }] }
    });
}

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
window.onload = init;
