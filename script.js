document.getElementById('convert').addEventListener('click', () => {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload an SVG file.');
        return;
    }
    if (file.type !== 'image/svg+xml') {
        alert('Please upload a valid SVG file.');
        return;
    }
    const reader = new FileReader();
    const preview = document.getElementById('preview');
    const loadingText = document.getElementById('loading-text');
    const downloadLink = document.getElementById('download');
    loadingText.style.display = 'block';
    preview.style.display = 'none';
    downloadLink.classList.remove('enabled'); // Disable download link initially
    reader.onload = function(event) {
        const svgText = event.target.result;
        const img = new Image();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');
            preview.src = pngUrl;
            preview.style.display = 'block';
            loadingText.style.display = 'none';
            downloadLink.href = pngUrl;
            downloadLink.classList.add('enabled'); // Enable download link
        };
        img.onerror = function() {
            alert('Failed to load SVG image.');
            loadingText.style.display = 'none';
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgText);
    };
    reader.readAsText(file);
});
