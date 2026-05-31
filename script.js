let isRunning = false;

function startBoosting() {
    if (isRunning) return;
    
    const linkInput = document.getElementById('videoLink').value;
    const multiplier = parseInt(document.getElementById('multiplier').value);
    const grid = document.getElementById('videoGrid');
    const statusText = document.getElementById('statusText');
    const progressBar = document.getElementById('progressBar');

    if (!linkInput) {
        alert("দয়া করে একটি ভিডিও লিংক দিন!");
        return;
    }

    isRunning = true;
    grid.innerHTML = ""; 
    statusText.innerText = `ভিডিও লোড হচ্ছে... ${multiplier}x ভিউ বসানো হবে।`;
    
    // প্রগ্রেস বার এনিমেশন
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) clearInterval(interval);
    }, 50);

    // ভিডিও টাইপ নির্ণয় এবং লুপ চালানো
    for (let i = 0; i < multiplier; i++) {
        const card = document.createElement('div');
        card.className = 'video-card';

        let embedHtml = '';
        
        if (linkInput.includes('tiktok.com')) {
            // টিকটকের জন্য সরাসরি লিংক ব্যবহার করা হচ্ছে
            embedHtml = `<iframe src="${linkInput}" width="100%" height="250" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
        } else if (linkInput.includes('instagram.com') || linkInput.includes('instagr.am')) {
             // ইনস্টাগ্রামের জন্য লিংক ব্যবহার করা হচ্ছে
             embedHtml = `<iframe src="${linkInput}" width="100%" height="250" frameborder="0" scrolling="no"></iframe>`;
        } else {
            // সাধারণ ভিডিও ফাইল (.mp4) হলে
            embedHtml = `<video controls autoplay muted loop><source src="${linkInput}"></video>`;
        }

        card.innerHTML = `
            <div style="font-size:10px; color:#00ffcc; margin-bottom:2px;">View #${i + 1}</div>
            ${embedHtml}
        `;
        
        grid.appendChild(card);
    }

    statusText.innerText = `✅ সফলভাবে ${multiplier}টি ভিউ প্লে করা হচ্ছে!`;
    
    setTimeout(() => {
        isRunning = false;
        progressBar.style.width = '100%';
    }, 2000);
}
