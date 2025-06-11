document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Game initialization
    const startGameButton = document.getElementById('start-game');
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            // Initialize the game
            if (typeof startGame === 'function') {
                startGame();
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(feature);
    });
});

// Copy code function
function copyCode() {
    // Full frog animation code to copy (stored here instead of in the display)
    const fullCode = `<script>
// Frog Jump Animation - GTM Ready Version (ES5 Compatible)
(function() {
    'use strict';
    
    // Check if URL contains "ribbit" parameter or hash
    function hasRibbitParam() {
        var queryString = window.location.search.toLowerCase();
        var hashString = window.location.hash.toLowerCase();
        
        // Debug logging
        console.log('🐸 Debug - Full URL:', window.location.href);
        console.log('🐸 Debug - Query string:', window.location.search);
        console.log('🐸 Debug - Hash string:', window.location.hash);
        console.log('🐸 Debug - Query string (lowercase):', queryString);
        console.log('🐸 Debug - Hash string (lowercase):', hashString);
        
        // Check hash fragment for "ribbit"
        if (hashString.indexOf('ribbit') !== -1) {
            console.log('🐸 Debug - Found ribbit in hash fragment!');
            return true;
        }
        
        // Simple check - look for "ribbit" anywhere in the query string
        if (queryString.indexOf('ribbit') !== -1) {
            console.log('🐸 Debug - Found ribbit in query string!');
            return true;
        }
        
        // More thorough check - parse parameters manually for better compatibility
        if (queryString.length > 1) {
            var params = queryString.substring(1).split('&');
            console.log('🐸 Debug - Parsed params:', params);
            
            for (var i = 0; i < params.length; i++) {
                var param = params[i].split('=');
                var key = param[0] ? param[0].toLowerCase() : '';
                var value = param[1] ? decodeURIComponent(param[1]).toLowerCase() : '';
                
                console.log('🐸 Debug - Checking param:', key, '=', value);
                
                if (key.indexOf('ribbit') !== -1 || value.indexOf('ribbit') !== -1) {
                    console.log('🐸 Debug - Found ribbit in param:', key, '=', value);
                    return true;
                }
            }
        }
        
        console.log('🐸 Debug - No ribbit found in URL');
        return false;
    }
    
    // Only run if ribbit parameter is found
    if (!hasRibbitParam()) {
        console.log('🐸 Ribbit parameter not found in URL - animation skipped');
        return;
    }
    
    // Safety check - don't run if overlay already exists
    if (document.getElementById('frog-overlay')) {
        console.log('🐸 Frog animation already running!');
        return;
    }
    
    // Configuration (can be overridden via GTM variables)
    var config = {
        numFrogs: Math.floor(Math.random() * 30) + 20, // 20-50 frogs
        audioUrl: null, // Set via GTM variable if needed
        uniswapUrl: 'https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0xb794ad95317f75c44090f64955954c3849315ffe'
    };
    
    // Override config with GTM variables if available
    if (typeof window.gtmFrogConfig !== 'undefined') {
        var gtmConfig = window.gtmFrogConfig;
        for (var key in gtmConfig) {
            if (gtmConfig.hasOwnProperty(key)) {
                config[key] = gtmConfig[key];
            }
        }
    }

    // Create overlay container
    var overlay = document.createElement('div');
    overlay.id = 'frog-overlay';
    overlay.style.cssText = 'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100vw;' +
        'height: 100vh;' +
        'background: rgba(135, 206, 235, 0.3);' +
        'z-index: 10000;' +
        'pointer-events: none;' +
        'overflow: hidden;';

    // Add close button
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'buy ribbit <span style="margin-left: 8px; font-size: 12px;">✕</span>';
    closeBtn.style.cssText = 'position: fixed;' +
        'top: 20px;' +
        'right: 20px;' +
        'z-index: 10001;' +
        'padding: 10px 15px;' +
        'background: #4CAF50;' +
        'color: white;' +
        'border: none;' +
        'border-radius: 5px;' +
        'cursor: pointer;' +
        'font-size: 14px;' +
        'pointer-events: auto;' +
        'display: flex;' +
        'align-items: center;' +
        'gap: 8px;' +
        'font-family: Arial, sans-serif;';
    
    closeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Check if the click was on the X (span element)
        if (e.target.tagName === 'SPAN') {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            // GTM Event for tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'frog_animation_closed', {
                    'event_category': 'engagement',
                    'event_label': 'close_button'
                });
            }
        } else {
            // GTM Event for tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'frog_animation_buy_clicked', {
                    'event_category': 'conversion',
                    'event_label': 'buy_ribbit'
                });
            }
            window.open(config.uniswapUrl, '_blank');
        }
    };

    // Create frog element
    function createFrog() {
        var frog = document.createElement('div');
        var size = Math.random() * 30 + 20; // 20-50px
        
        frog.innerHTML = '🐸';
        frog.style.cssText = 'position: absolute;' +
            'font-size: ' + size + 'px;' +
            'user-select: none;' +
            'transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);' +
            'will-change: transform, left, top;';

        // Random starting position
        var startX = Math.random() * (window.innerWidth - size);
        var startY = window.innerHeight + size;
        
        frog.style.left = startX + 'px';
        frog.style.top = startY + 'px';

        return frog;
    }

    // Animate frog jumping
    function animateFrog(frog) {
        var jumpHeight = Math.random() * 200 + 100; // 100-300px jump
        var jumpDistance = Math.random() * 300 + 50; // 50-350px horizontal
        var direction = Math.random() > 0.5 ? 1 : -1; // left or right
        
        var currentX = parseFloat(frog.style.left);
        var currentY = parseFloat(frog.style.top);
        
        function jump() {
            // Clean up if frog is off screen or overlay is removed
            if (currentY < -60 || !document.getElementById('frog-overlay')) {
                if (frog.parentNode) {
                    frog.parentNode.removeChild(frog);
                }
                return;
            }

            // Calculate new position
            var newX = Math.max(0, Math.min(window.innerWidth - 50, 
                currentX + (jumpDistance * direction * (Math.random() * 0.5 + 0.5))));
            var newY = currentY - jumpHeight;
            
            // Apply jump animation
            frog.style.transform = 'rotate(' + (direction * 15) + 'deg) scale(' + (1 + Math.random() * 0.3) + ')';
            frog.style.left = newX + 'px';
            frog.style.top = newY + 'px';
            
            currentX = newX;
            currentY = newY;
            
            // Schedule next jump
            setTimeout(function() {
                if (frog.parentNode) {
                    frog.style.transform = 'rotate(0deg) scale(1)';
                    setTimeout(jump, Math.random() * 800 + 400); // 400-1200ms between jumps
                }
            }, 500);
        }
        
        // Start jumping after a random delay
        setTimeout(jump, Math.random() * 2000);
    }

    // Add styles for better animation
    var style = document.createElement('style');
    style.id = 'frog-animation-styles';
    style.textContent = '#frog-overlay div:not(button) {' +
        'animation: bounce 0.5s infinite alternate;' +
        '}' +
        '@keyframes bounce {' +
        '0% { transform: translateY(0px) rotate(0deg); }' +
        '100% { transform: translateY(-10px) rotate(2deg); }' +
        '}';
    
    // Only add styles if not already present
    if (!document.getElementById('frog-animation-styles')) {
        document.head.appendChild(style);
    }

    // Add overlay to page
    document.body.appendChild(overlay);
    overlay.appendChild(closeBtn);

    // Create multiple frogs
    for (var i = 0; i < config.numFrogs; i++) {
        (function(index) {
            setTimeout(function() {
                // Check if overlay still exists before creating frog
                if (document.getElementById('frog-overlay')) {
                    var frog = createFrog();
                    overlay.appendChild(frog);
                    animateFrog(frog);
                }
            }, index * 200); // Stagger frog creation
        })(i);
    }

    // Add custom sound effect if URL is provided
    if (config.audioUrl) {
        try {
            var audio = new Audio(config.audioUrl);
            audio.volume = 0.1;
            audio.play().catch(function() {
                console.log('🐸 Audio playback failed (user interaction required)');
            });
        } catch(e) {
            console.log('🐸 Audio error:', e.message);
        }
    }

    // GTM Event for tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'frog_animation_started', {
            'event_category': 'engagement',
            'event_label': 'animation_loaded',
            'value': config.numFrogs
        });
    }

    console.log('🐸 ' + config.numFrogs + ' frogs are now jumping across your screen! Click the button to swap!');
    
    // Auto-cleanup after 60 seconds to prevent memory leaks
    setTimeout(function() {
        var overlayElement = document.getElementById('frog-overlay');
        if (overlayElement && overlayElement.parentNode) {
            overlayElement.parentNode.removeChild(overlayElement);
            console.log('🐸 Frog animation auto-cleanup completed');
        }
         }, 60000);
 })();
</script>`;
     
     navigator.clipboard.writeText(fullCode).then(() => {
        const button = document.querySelector('.copy-button');
        const originalText = button.textContent;
        button.textContent = '✅ Copied GTM Code!';
        button.style.background = '#45a049';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = fullCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const button = document.querySelector('.copy-button');
        const originalText = button.textContent;
        button.textContent = '✅ Copied GTM Code!';
        button.style.background = '#45a049';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
} 
