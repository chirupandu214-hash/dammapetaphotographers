const App = {
    members: JSON.parse(localStorage.getItem('dpa_members')) || [],
    init() {
        document.getElementById('loader').style.display = 'none';
        this.render();
    },
    save() {
        localStorage.setItem('dpa_members', JSON.stringify(this.members));
        this.render();
    },
    render() {
        const tbody = document.getElementById('memberBody');
        tbody.innerHTML = this.members.map(m => `
            <tr><td>${m.id}</td><td>${m.name}</td><td>${m.mobile}</td>
            <td><button onclick="App.deleteMember('${m.id}')">Delete</button></td></tr>
        `).join('');
        document.getElementById('totalMembers').innerText = this.members.length;
    },
    addMember(name, mobile) {
        const member = { id: 'DPA-' + Date.now(), name, mobile };
        this.members.push(member);
        this.save();
        alert(`Login Created: User: ${mobile}@gmail.com, Pass: ${mobile}`);
    },
    deleteMember(id) {
        this.members = this.members.filter(m => m.id !== id);
        this.save();
    }
};

document.getElementById('memberForm').onsubmit = (e) => {
    e.preventDefault();
    App.addMember(document.getElementById('mName').value, document.getElementById('mMobile').value);
    document.getElementById('memberModal').style.display = 'none';
};

function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
window.onload = () => App.init();
