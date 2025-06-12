// ==================== GLITCH SCROLL TO BUY FUNCTION ====================
// Note: Function defined in index.html inline script to avoid conflicts
// and ensure immediate availability for onclick handlers

// Test function to verify everything is working
window.testGlitchScroll = function() {
    console.log('🐸 Testing glitch scroll function...');
    console.log('🐸 Function available:', typeof glitchScrollToBuy);
    console.log('🐸 Buy section exists:', !!document.getElementById('buy-ribbit'));
    // Removed automatic call - user must manually call glitchScrollToBuy() for testing
    console.log('🐸 Ready to test - call glitchScrollToBuy() manually');
};

// Console message to confirm function is loaded
console.log('🐸 Glitch scroll function loaded and ready!');
console.log('🐸 Test with: testGlitchScroll() or glitchScrollToBuy()');
console.log('🐸 Buy section ID should be: buy-ribbit');

// ==================== MAIN APPLICATION ====================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Helper function to push analytics events
    function trackUserAction(eventName) {
        window.dataLayer.push({
            'event': 'user_action',
            'event_name': eventName
        });
        console.log('📊 Analytics Event:', eventName);
    }

    // ==================== BUY BUTTON TRACKING ====================
    
    // Track header buy button
    const headerBuyButton = document.querySelector('.buy-button');
    if (headerBuyButton) {
        headerBuyButton.addEventListener('click', () => {
            trackUserAction('buy button clicked');
        });
    }
    
    // Track hero CTA button
    const heroCtaButton = document.querySelector('.cta-button');
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', () => {
            trackUserAction('buy button clicked');
        });
    }
    
    // Track footer Uniswap link
    const footerUniswapLink = document.querySelector('a[href*="app.uniswap.org"]');
    if (footerUniswapLink) {
        footerUniswapLink.addEventListener('click', () => {
            trackUserAction('buy button clicked');
        });
    }
    
    // Track any dynamically created buy buttons in games/animations
    // Use event delegation for dynamically created elements
    document.addEventListener('click', (e) => {
        // Check for buy buttons in game overlays
        if (e.target.textContent.includes('Buy Ribbit') || 
            e.target.textContent.includes('BUY') ||
            (e.target.href && e.target.href.includes('app.uniswap.org'))) {
            trackUserAction('buy button clicked');
        }
        
        // Track frog clicks in game (they show "BUY" text when clicked)
        if (e.target.classList.contains('game-frog') || 
            e.target.innerHTML === '🐸') {
            trackUserAction('buy button clicked');
        }
    });

    // ==================== GAME TRACKING ====================
    
    // Start game button tracking will be added to the existing handler below
    
    // Track game restart buttons (dynamically created)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('frog-restart-btn') && 
            !e.target.textContent.includes('Buy')) {
            trackUserAction('game started');
        }
    });

    // ==================== CONTRACT ADDRESS TRACKING ====================
    
    // Track contract address copying/selection
    const contractElements = document.querySelectorAll('p, span, div');
    contractElements.forEach(element => {
        if (element.textContent.includes('0xb794ad95317f75c44090f64955954c3849315ffe')) {
            // Track text selection
            element.addEventListener('mouseup', () => {
                const selection = window.getSelection();
                if (selection.toString().includes('0xb794ad95317f75c44090f64955954c3849315ffe')) {
                    trackUserAction('contract copied');
                }
            });
            
            // Track double-click for selection
            element.addEventListener('dblclick', () => {
                trackUserAction('contract copied');
            });
            
            // Track copy keyboard shortcut when contract is selected
            element.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                    const selection = window.getSelection();
                    if (selection.toString().includes('0xb794ad95317f75c44090f64955954c3849315ffe')) {
                        trackUserAction('contract copied');
                    }
                }
            });
            
            // Make it easier to select by adding some styling
            element.style.userSelect = 'text';
            element.style.cursor = 'text';
            element.title = 'Click to select contract address';
            element.tabIndex = 0; // Make it focusable for keyboard events
        }
    });

    // ==================== DONATE ADDRESS TRACKING ====================
    
    // Make copyDonateAddress function globally available
    window.copyDonateAddress = function() {
        const donateAddress = '0xCca5B10E6377681D59B41e1a33E03A2eafC97739';
        
        // Copy to clipboard
        navigator.clipboard.writeText(donateAddress).then(() => {
            // Track the event
            trackUserAction('donate address copied');
            
            // Visual feedback
            const donateElement = document.querySelector('.donate-address');
            if (donateElement) {
                const originalText = donateElement.textContent;
                donateElement.textContent = 'Copied! 🐸';
                donateElement.style.color = '#4CAF50';
                
                setTimeout(() => {
                    donateElement.textContent = originalText;
                    donateElement.style.color = '';
                }, 2000);
            }
            
            console.log('🐸 Donate address copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy donate address: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = donateAddress;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            trackUserAction('donate address copied');
            alert('🐸 Donate address copied to clipboard!');
        });
    };
    
    // Global copy event listener as backup
    document.addEventListener('copy', () => {
        const selection = window.getSelection();
        if (selection.toString().includes('0xb794ad95317f75c44090f64955954c3849315ffe')) {
            trackUserAction('contract copied');
        }
    });

    // ==================== RIBBIT TAG COPY TRACKING ====================
    
    // Track copy code button
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            trackUserAction('ribbit tag copied');
        });
    }

    // ==================== SOCIAL LINKS TRACKING ====================
    
    // Track Telegram link
    const telegramLink = document.querySelector('a[href*="t.me/ribbit_eth"]');
    if (telegramLink) {
        telegramLink.addEventListener('click', () => {
            trackUserAction('telegram link clicked');
        });
    }
    
    // Track Twitter link
    const twitterLink = document.querySelector('a[href*="x.com/RibbitCTO"]');
    if (twitterLink) {
        twitterLink.addEventListener('click', () => {
            trackUserAction('twitter link clicked');
        });
    }

    // ==================== EXISTING CODE ====================
    
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

    // Game initialization with analytics tracking
    const startGameButton = document.getElementById('start-game');
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            // Track the game start event
            trackUserAction('game started');
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

    // ==================== YOUTUBE VIDEO TRACKING ====================
    
    // Track YouTube video interactions using proper YouTube IFrame Player API
    function trackYouTubeEvents() {
        const iframe = document.querySelector('iframe[src*="youtube.com"]');
        if (!iframe) {
            console.log('🎥 YouTube iframe not found');
            return;
        }

        // Check if enablejsapi is enabled
        if (!iframe.src.includes('enablejsapi=1')) {
            console.log('🎥 YouTube iframe does not have enablejsapi=1 enabled');
            return;
        }

        // Load YouTube IFrame Player API if not already loaded
        if (!window.YT) {
            // Load the YouTube API script
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.head.appendChild(script);
            
            // Set up the API ready callback
            window.onYouTubeIframeAPIReady = initializeYouTubeTracking;
        } else {
            // API is already loaded
            initializeYouTubeTracking();
        }
    }

    function initializeYouTubeTracking() {
        const iframe = document.querySelector('iframe[src*="youtube.com"]');
        if (!iframe) return;

        // Give the iframe an ID if it doesn't have one
        if (!iframe.id) {
            iframe.id = 'youtube-player-' + Date.now();
        }

        // Initialize the YouTube player
        const player = new YT.Player(iframe.id, {
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady
            }
        });

        let hasTrackedStart = false;
        let progressTracked = {
            25: false,
            50: false,
            75: false,
            90: false
        };

        function onPlayerReady(event) {
            console.log('🎥 YouTube player ready for tracking');
        }

        function onPlayerStateChange(event) {
            const videoData = event.target.getVideoData();
            const videoTitle = videoData.title || 'Unknown Video';
            const videoUrl = `https://www.youtube.com/watch?v=${videoData.video_id}`;
            
            switch(event.data) {
                case YT.PlayerState.PLAYING:
                    if (!hasTrackedStart) {
                        trackUserAction('youtube video started');
                        console.log('🎥 Video started:', videoTitle);
                        hasTrackedStart = true;
                        
                        // Start progress tracking
                        startProgressTracking(event.target);
                    }
                    break;
                    
                case YT.PlayerState.PAUSED:
                    trackUserAction('youtube video paused');
                    console.log('🎥 Video paused:', videoTitle);
                    break;
                    
                case YT.PlayerState.ENDED:
                    trackUserAction('youtube video completed');
                    console.log('🎥 Video completed:', videoTitle);
                    break;
            }
        }

        function startProgressTracking(player) {
            const progressInterval = setInterval(() => {
                if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                    return;
                }

                const currentTime = player.getCurrentTime();
                const duration = player.getDuration();
                const percentage = Math.round((currentTime / duration) * 100);

                // Track progress milestones
                Object.keys(progressTracked).forEach(milestone => {
                    const milestoneNum = parseInt(milestone);
                    if (percentage >= milestoneNum && !progressTracked[milestone]) {
                        progressTracked[milestone] = true;
                        trackUserAction(`youtube video ${milestone}% viewed`);
                        console.log(`🎥 Video ${milestone}% viewed`);
                    }
                });

                // Stop tracking when video ends or reaches 100%
                if (percentage >= 100 || player.getPlayerState() === YT.PlayerState.ENDED) {
                    clearInterval(progressInterval);
                }
            }, 1000); // Check every second
        }

        console.log('🎥 YouTube video tracking initialized (YouTube API method)');
    }
    
    // Initialize YouTube tracking
    trackYouTubeEvents();

    // ==================== GTM FROG ANIMATION TRACKING ====================
    
    // Watch for dynamically added frog animation elements (from GTM tag)
    const frogAnimationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check for frog overlay from GTM animation
                    if (node.id === 'frog-overlay' || node.querySelector('#frog-overlay')) {
                        const overlay = node.id === 'frog-overlay' ? node : node.querySelector('#frog-overlay');
                        
                        // Track buy buttons in GTM animation
                        const buyButtons = overlay.querySelectorAll('button, a');
                        buyButtons.forEach(button => {
                            if (button.textContent.toLowerCase().includes('buy ribbit') || 
                                button.textContent.toLowerCase().includes('buy') ||
                                button.textContent.includes('BUY') ||
                                button.textContent.includes('Swap') ||
                                (button.href && button.href.includes('uniswap'))) {
                                
                                button.addEventListener('click', () => {
                                    trackUserAction('buy button clicked');
                                });
                            }
                            
                            // Track start game buttons in GTM animation (specifically "🎮 play game")
                            if (button.textContent.toLowerCase().includes('play game') || 
                                button.textContent.includes('🎮') ||
                                button.textContent.includes('Start Game') ||
                                button.textContent.includes('Begin')) {
                                
                                button.addEventListener('click', () => {
                                    trackUserAction('game started');
                                });
                            }
                        });
                        
                        // Also watch for any frogs that get clicked (they trigger buy actions)
                        const frogClickHandler = (e) => {
                            if (e.target.innerHTML === '🐸' || 
                                e.target.classList.contains('frog') ||
                                e.target.textContent.includes('🐸')) {
                                trackUserAction('buy button clicked');
                            }
                        };
                        
                        overlay.addEventListener('click', frogClickHandler);
                    }
                    
                    // Check for frog game overlay specifically
                    if (node.id && (node.id.includes('frog-game') || node.id.includes('frog-animation'))) {
                        // Track buy buttons in game overlays
                        const buyButtons = node.querySelectorAll('button, a');
                        buyButtons.forEach(button => {
                            if (button.textContent.includes('Buy') || 
                                button.textContent.includes('BUY') ||
                                (button.href && button.href.includes('uniswap'))) {
                                
                                button.addEventListener('click', () => {
                                    trackUserAction('buy button clicked');
                                });
                            }
                        });
                        
                        // Track game frogs and restart buttons
                        const gameHandler = (e) => {
                            if (e.target.classList.contains('game-frog') || 
                                e.target.innerHTML === '🐸') {
                                trackUserAction('buy button clicked');
                            }
                            
                            // Track restart buttons with "Buy Ribbit" text (from game over screen)
                            if (e.target.classList.contains('frog-restart-btn')) {
                                if (e.target.textContent.includes('Buy Ribbit') || 
                                    e.target.onclick && e.target.onclick.toString().includes('uniswap')) {
                                    trackUserAction('buy button clicked');
                                } else {
                                    trackUserAction('game started');
                                }
                            }
                        };
                        
                        node.addEventListener('click', gameHandler);
                    }
                }
            });
        });
    });
    
    // Start observing for GTM animation elements
    frogAnimationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Copy code function  
function copyCode() {
    const code = '<script src="https://cdn.jsdelivr.net/gh/ribbitcto/ribbit@main/ribbit-tag.js"></script>';
    navigator.clipboard.writeText(code).then(() => {
        const button = document.querySelector('.copy-button');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = 'Copied';
            button.style.background = 'linear-gradient(135deg, #00ff41, #00ff41)';
            button.style.color = '#000';
            button.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'linear-gradient(135deg, #00ff41, #7c3aed)';
                button.style.boxShadow = '0 4px 15px rgba(0, 255, 65, 0.3)';
                button.style.color = '';
            }, 1000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('🐸 RIBBIT code uploaded to clipboard!');
    });
} 
