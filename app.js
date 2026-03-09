/* Start of App Logic */
const grid = document.getElementById('issue-grid');
const countTxt = document.getElementById('issue-count-display');
const searchInput = document.getElementById('search-input');
const loader = document.getElementById('loader-container');


const commonNames = ["Ariful Islam", "Sabbir Ahmed", "Nusrat Jahan", "Tanvir Hossain", "Rashed Khan", "Sumi Akter"];

async function loadData(filter = 'all', query = '') {
    // Show loading state
    grid.innerHTML = ''; 
    grid.appendChild(loader);
    loader.classList.remove('hidden');
    
    try {
        let url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
        
        // Search API 
        if (query) {
            url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;
        }

        const res = await fetch(url);
        const result = await res.json();
        
        const issues = Array.isArray(result) ? result : result.data;
        
        if (!issues) throw new Error("Invalid data format");

        let filtered = issues;
        // Tab filtering only if not searching
        if (!query && filter !== 'all') {
            filtered = issues.filter(i => i.status === filter);
        }

        // show the spinner
        setTimeout(() => {
            renderGrid(filtered);
            loader.classList.add('hidden');
        }, 500);

    } catch (err) {
        grid.innerHTML = `<p style="color:red; text-align:center; grid-column:span 4">Error: ${err.message}</p>`;
        loader.classList.add('hidden');
    }
}

function renderGrid(data) {
    grid.innerHTML = '';
    countTxt.innerText = `${data.length} Issues`;

    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: span 4; text-align:center; padding:40px; color:#94a3b8">No matching issues found.</p>';
        return;
    }

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `issue-card ${item.status === 'open' ? 'card-open' : 'card-closed'}`;
        
        // Dynamic Authors
        const humanAuthor = commonNames[index % commonNames.length];
        
        // Dynamic Label 
        let labelsHTML = `
            <span class="lbl lbl-bug"><img src="assets/BugDroid.png" width="12"> BUG</span>
            <span class="lbl lbl-help"><img src="assets/Help wanted.png" width="12"> HELP WANTED</span>
        `;
        
        if (item.labels && item.labels.includes('enhancement')) {
            labelsHTML = `<span class="lbl lbl-enhancement"><img src="assets/Sparkle.png" width="12"> ENHANCEMENT</span>`;
        }

        card.innerHTML = `
            <div class="card-top">
                <img src="assets/${item.status === 'open' ? 'Open-Status' : 'Closed-Status'}.png" width="18">
                <span class="priority-badge p-${item.priority.toLowerCase()}">${item.priority.toUpperCase()}</span>
            </div>
            <h4 style="font-size: 15px; margin-bottom: 8px;">${item.title}</h4>
            <p style="color:#64748b; font-size:12px; line-height:1.4">${item.description.substring(0, 60)}...</p>
            <div class="label-row">${labelsHTML}</div>
            <div style="font-size:11px; color:#94a3b8">
                #${item.id} by ${humanAuthor} <br> ${item.createdAt}
            </div>
        `;
        
        card.onclick = () => openModal(item.id, humanAuthor);
        grid.appendChild(card);
    });
}

/* Modal Details */
async function openModal(id, authorName) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data || data;

    const modalBody = document.getElementById('modal-data');
    modalBody.innerHTML = `
        <h2 style="margin-bottom:10px">${issue.title}</h2>
        <div style="display:flex; gap:10px; color:#64748b; font-size:13px; margin-bottom:20px">
            <span style="background:#f1f5f9; padding:2px 10px; border-radius:15px">${issue.status}</span>
            <span>• Opened by <strong>${authorName}</strong></span>
            <span>• ${issue.createdAt}</span>
        </div>
        <div class="modal-highlight">DOCUMENTATION</div>
        <p style="color:#475569; line-height:1.6; margin-bottom:25px">${issue.description}</p>
        <div style="display:flex; justify-content:space-between">
            <div>
                <p style="font-size:12px; color:#94a3b8">Assignee</p>
                <strong>${authorName}</strong>
            </div>
            <div style="text-align:right">
                <p style="font-size:12px; color:#94a3b8">Priority</p>
                <span style="background:#f1f5f9; padding:2px 10px; border-radius:15px; font-size:11px; font-weight:700">${issue.priority.toUpperCase()}</span>
            </div>
        </div>
    `;
    document.getElementById('issue-modal').classList.remove('hidden');
}

/* Controls & Event Listeners */
document.getElementById('search-trigger').onclick = () => {
    loadData('all', searchInput.value);
};

searchInput.onkeyup = (e) => {
    if (e.key === 'Enter') loadData('all', searchInput.value);
};

document.getElementById('close-x').onclick = () => document.getElementById('issue-modal').classList.add('hidden');
document.getElementById('close-footer-btn').onclick = () => document.getElementById('issue-modal').classList.add('hidden');

document.getElementById('btn-all').onclick = () => { setActive('btn-all'); loadData('all'); };
document.getElementById('btn-open').onclick = () => { setActive('btn-open'); loadData('open'); };
document.getElementById('btn-closed').onclick = () => { setActive('btn-closed'); loadData('closed'); };

function setActive(id) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    searchInput.value = ''; 
}

loadData();