
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
});
