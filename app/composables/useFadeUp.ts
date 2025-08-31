import { onMounted, onUnmounted } from 'vue';

interface FadeUpOptions {
    threshold?: number;
    rootMargin?: string;
    className?: string;
    activeClass?: string;
}

export function useFadeUp(options: FadeUpOptions = {}) {
    const { 
        threshold = 0.1, 
        rootMargin = '0px',
        className = 'fade-up',
        activeClass = 'animate'
    } = options;

    let observer: IntersectionObserver | null = null;

    const initFadeUp = () => {
        const elements = document.querySelectorAll(`.${className}`);
        
        if (!elements.length) return;

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(activeClass);
                }
            });
        }, {
            threshold,
            rootMargin
        });

        elements.forEach(element => {
            observer?.observe(element);
        });
    };

    onMounted(() => {
        initFadeUp();
    });

    onUnmounted(() => {
        if (observer) {
            observer.disconnect();
        }
    });

    return {
        initFadeUp
    };
}