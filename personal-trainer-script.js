 // Opção 1: Usar DOMContentLoaded
 document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formularioContato');
    if (form) {
        form.addEventListener('submit', enviarParaWhatsApp);
    }
});

// Opção 2: Colocar a função separada
function enviarParaWhatsApp(e) {
    e.preventDefault();
    
    try {
        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        
        const numeroDestino = "553499159246"; // Substitua pelo seu número
        
        const mensagem = `Olá, me chamo ${nome}, meu whatsapp é ${whatsapp} e meu e-mail é ${email}, quero ser minha melhor versão!`;        
        console.log('Mensagem:', mensagem);
        
        const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(mensagem)}`;
        
        console.log('Link do WhatsApp:', linkWhatsapp);
        
        window.open(linkWhatsapp, '_blank');
    } catch (erro) {
        console.error('Erro ao processar o formulário:', erro);
        alert('Ocorreu um erro ao processar o formulário. Por favor, tente novamente.');
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.before-after-wrapper');
    const comparisonSlider = document.querySelector('.comparison-slider');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.comparison-item').length;

    // Função para o slider de antes/depois
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.before-image');
        let isResizing = false;

        // Função para atualizar a posição
        const updateImages = (x) => {
            const sliderRect = slider.getBoundingClientRect();
            const position = Math.max(0, Math.min(100, (x - sliderRect.left) / sliderRect.width * 100));
            beforeImage.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        };

        // Mouse events
        handle.addEventListener('mousedown', () => isResizing = true);
        window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            updateImages(e.clientX);
        });
        window.addEventListener('mouseup', () => isResizing = false);

        // Touch events
        handle.addEventListener('touchstart', () => isResizing = true);
        window.addEventListener('touchmove', (e) => {
            if (!isResizing) return;
            updateImages(e.touches[0].clientX);
        });
        window.addEventListener('touchend', () => isResizing = false);

        // Clique na imagem
        slider.addEventListener('click', (e) => {
            const sliderRect = slider.getBoundingClientRect();
            const clickPosition = e.clientX - sliderRect.left;
            const halfWidth = sliderRect.width / 2;

            if (clickPosition < halfWidth) {
                beforeImage.style.width = '100%';
                handle.style.left = '100%';
            } else {
                beforeImage.style.width = '0%';
                handle.style.left = '0%';
            }

            // Retorna à posição original após 1 segundo
            setTimeout(() => {
                beforeImage.style.width = '50%';
                handle.style.left = '50%';
            }, 1000);
        });
    });

    // Navegação entre slides
    function updateSlidePosition() {
        comparisonSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlidePosition();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    });
});



