let members = JSON.parse(localStorage.getItem('members')) || [];

function showSection(id) {
    document.querySelectorAll('main section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function addMember() {
    let name = prompt("సభ్యుని పేరు:");
    let mobile = prompt("మొబైల్ నంబర్:");
    if(name && mobile) {
        members.push({name, mobile});
        localStorage.setItem('members', JSON.stringify(members));
        renderMembers();
    }
}

function renderMembers() {
    let tbody = document.getElementById('memberBody');
    tbody.innerHTML = members.map(m => `<tr><td>${m.name}</td><td>${m.mobile}</td><td>సవరించు</td></tr>`).join('');
    document.getElementById('count').innerText = members.length;
}

renderMembers();
