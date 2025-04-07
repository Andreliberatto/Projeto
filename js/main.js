document.addEventListener('DOMContentLoaded', function() {

    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
document.getElementById('current-year').textContent = new Date().getFullYear();
        
        const linkedinLink = document.querySelector('a[aria-label="LinkedIn"]');
        const githubLink = document.querySelector('a[aria-label="GitHub"]');
        
        linkedinLink.href = "https://www.linkedin.com/in/andr%C3%A9-liberatto-129495238/";
        githubLink.href = "https://andreliberatto.github.io/portfolio/";

        document.getElementById('current-year').textContent = new Date().getFullYear();
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
        
        document.getElementById('phone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) value = '(' + value;
            if (value.length > 3) value = value.substring(0, 3) + ') ' + value.substring(3);
            if (value.length > 10) value = value.substring(0, 10) + '-' + value.substring(10);
            e.target.value = value.substring(0, 15);
        });