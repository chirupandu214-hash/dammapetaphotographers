/**
 * DPA Portal - Core Management Script
 * Version: 1.0 (Production Ready)
 */

const DPA = {
    // Data Management
    db: {
        members: JSON.parse(localStorage.getItem('dpa_members')) || [],
        fees: JSON.parse(localStorage.getItem('dpa_fees')) || [],
        bharosa: JSON.parse(localStorage.getItem('dpa_bharosa')) || []
    },

    saveAll() {
        localStorage.setItem('dpa_members', JSON.stringify(this.db.members));
        localStorage.setItem('dpa_fees', JSON.stringify(this.db.fees));
        localStorage.setItem('dpa_bharosa', JSON.stringify(this.db.bharosa));
        this.updateDashboard();
    },

    // UI Navigation
    showSection(sectionId) {
        document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
    },

    // Dashboard Analytics
    updateDashboard() {
        document.getElementById('totalMembers').innerText = this.db.members.length;
        const totalFees = this.db.fees.reduce((acc, curr) => acc + Number(curr.amount), 0);
        document.getElementById('totalFees').innerText = `₹${totalFees}`;
    },

    // Member Logic
    addMember(formData) {
        const member = {
            id: 'DPA-' + Date.now(),
            ...formData,
            joinDate: new Date().toLocaleDateString()
        };
        this.db.members.push(member);
        this.saveAll();
        alert(`Member Added! \nUsername: ${member.email} \nPassword: ${member.mobile}`);
    }
};

// Initial Render
window.onload = () => {
    DPA.updateDashboard();
};
