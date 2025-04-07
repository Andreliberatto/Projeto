function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) value = value.replace(/^(\d{3})/, '$1.');
    if (value.length > 7) value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
    if (value.length > 11) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
    input.value = value.substring(0, 14);
}

function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) value = '(' + value;
    if (value.length > 3) value = value.substring(0, 3) + ') ' + value.substring(3);
    if (value.length > 10) value = value.substring(0, 10) + '-' + value.substring(10);
    input.value = value.substring(0, 15);
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contratoForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    let currentStep = 0;
    showStep(currentStep);
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
                updateProgressBar();
            } else if (btn.type === 'submit') {
                form.querySelector('.form-step.active').classList.remove('active');
                document.getElementById('confirmation').style.display = 'block';
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
                updateProgressBar();
            }
        });
    });
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
    }
    
    function updateProgressBar() {
        progressSteps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
});