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
    // Complete frog animation + game code to copy (includes everything)
    const fullCode = `<script>
// Frog Animation Script for GTM
// Check for ribbit parameter before running
(function() {
    'use strict';
    
    // Check if animation should run based on URL parameters
    function hasRibbitParam() {
        var urlParams = new URLSearchParams(window.location.search);
        var hashParams = window.location.hash;
        
        console.log('🐸 Checking URL for ribbit trigger...');
        console.log('🐸 Current URL:', window.location.href);
        console.log('🐸 Search params:', window.location.search);
        console.log('🐸 Hash:', hashParams);
        
        // Check URL hash for #ribbit
        if (hashParams.includes('ribbit')) {
            console.log('🐸 Found ribbit in hash!');
            return true;
        }
        
        // Check query parameters for ribbit
        if (urlParams.has('ribbit')) {
            console.log('🐸 Found ribbit in query parameters!');
            return true;
        }
        
        console.log('🐸 No ribbit parameter found, animation will not run');
        return false;
    }
    
    // Only run if ribbit parameter is present
    if (!hasRibbitParam()) {
        console.log('🐸 Frog animation skipped - no ribbit parameter');
        return;
    }
    
    console.log('🐸 Ribbit parameter detected! Starting frog animation...');
    
    // Check if animation is already running
    if (document.getElementById('frog-overlay')) {
        console.log('🐸 Frog animation already running!');
        return;
    }

    // ==================== EXACT WORKING GAME CODE FROM GAME.JS (ES5 VERSION) ====================
    // 🐸 RIBBIT CLICKER GAME
    // Create game overlay
    var gameOverlay = document.createElement('div');
    gameOverlay.id = 'frog-animation-game-overlay';
    gameOverlay.style.cssText = 'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100vw;' +
        'height: 100vh;' +
        'background: rgba(135, 206, 235, 0.2);' +
        'backdrop-filter: blur(2px);' +
        'z-index: 9999;' +
        'pointer-events: auto;' +
        'overflow: hidden;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        'display: none;';

    // Add game styles
    var gameStyles = document.createElement('style');
    gameStyles.textContent = '.frog-game-ui {' +
        'position: fixed;' +
        'top: 20px;' +
        'right: 20px;' +
        'z-index: 10002;' +
        'display: flex;' +
        'flex-direction: column;' +
        'gap: 10px;' +
        'align-items: flex-end;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-score {' +
        'background: rgba(255, 255, 255, 0.95);' +
        'padding: 15px 25px;' +
        'border-radius: 25px;' +
        'font-size: 24px;' +
        'font-weight: bold;' +
        'color: #2E8B57;' +
        'box-shadow: 0 4px 15px rgba(0,0,0,0.3);' +
        'backdrop-filter: blur(10px);' +
        'font-family: "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-lily-counter {' +
        'background: rgba(220, 20, 60, 0.9);' +
        'padding: 12px 20px;' +
        'border-radius: 25px;' +
        'font-size: 18px;' +
        'font-weight: bold;' +
        'color: white;' +
        'box-shadow: 0 4px 15px rgba(0,0,0,0.3);' +
        'font-family: "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-lily-pad {' +
        'position: fixed;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'width: 100px;' +
        'height: 100px;' +
        'background: radial-gradient(circle, #32CD32 0%, #228B22 70%, #006400 100%);' +
        'border-radius: 60% 40% 60% 40%;' +
        'border: 3px solid #006400;' +
        'z-index: 10000;' +
        'box-shadow: 0 0 20px rgba(34, 139, 34, 0.6);' +
        'animation: frog-lily-float 3s ease-in-out infinite;' +
        '}' +
        '@keyframes frog-lily-float {' +
        '0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }' +
        '50% { transform: translate(-50%, -50%) scale(1.05) rotate(2deg); }' +
        '}' +
        '.game-frog {' +
        'position: fixed;' +
        'font-size: 35px;' +
        'cursor: pointer;' +
        'z-index: 10001;' +
        'transition: all 0.2s ease;' +
        'user-select: none;' +
        'animation: frog-hop 0.8s ease-in-out infinite;' +
        '}' +
        '.game-frog:hover {' +
        'transform: scale(1.3);' +
        'filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,255,0,0.8));' +
        '}' +
        '@keyframes frog-hop {' +
        '0%, 100% { transform: translateY(0px) rotate(-5deg); }' +
        '25% { transform: translateY(-12px) rotate(0deg); }' +
        '50% { transform: translateY(-20px) rotate(5deg); }' +
        '75% { transform: translateY(-8px) rotate(0deg); }' +
        '}' +
        '@keyframes frog-explode {' +
        '0% { transform: scale(1) rotate(0deg); opacity: 1; }' +
        '50% { transform: scale(2.5) rotate(180deg); opacity: 0.9; }' +
        '100% { transform: scale(0) rotate(360deg); opacity: 0; }' +
        '}' +
        '.frog-buy-text {' +
        'position: fixed;' +
        'font-size: 48px;' +
        'font-weight: bold;' +
        'color: #4CAF50;' +
        'text-shadow: 3px 3px 6px rgba(0,0,0,0.8);' +
        'animation: frog-buy-pop 1.2s ease-out forwards;' +
        'pointer-events: none;' +
        'z-index: 10003;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '@keyframes frog-buy-pop {' +
        '0% { transform: scale(0) rotate(0deg); opacity: 1; }' +
        '70% { transform: scale(1.8) rotate(360deg); opacity: 1; }' +
        '100% { transform: scale(2.5) rotate(720deg); opacity: 0; }' +
        '}' +
        '.frog-close-btn {' +
        'position: fixed;' +
        'top: 20px;' +
        'left: 20px;' +
        'padding: 10px 15px;' +
        'background: rgba(255, 255, 255, 0.9);' +
        'color: #333;' +
        'border: 2px solid #ddd;' +
        'border-radius: 25px;' +
        'cursor: pointer;' +
        'font-size: 16px;' +
        'font-weight: bold;' +
        'z-index: 10005;' +
        'transition: all 0.3s ease;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-close-btn:hover {' +
        'background: #ff4444;' +
        'color: white;' +
        'border-color: #ff4444;' +
        '}' +
        '.frog-game-over {' +
        'position: fixed;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'background: rgba(0, 0, 0, 0.95);' +
        'color: white;' +
        'padding: 40px;' +
        'border-radius: 20px;' +
        'text-align: center;' +
        'z-index: 10006;' +
        'box-shadow: 0 0 50px rgba(0,0,0,0.8);' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-game-over h1 {' +
        'font-size: 36px;' +
        'color: #FF6B6B;' +
        'margin-bottom: 20px;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-game-over p {' +
        'font-size: 20px;' +
        'margin-bottom: 20px;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-restart-btn {' +
        'padding: 15px 30px;' +
        'font-size: 18px;' +
        'background: #4CAF50;' +
        'color: white;' +
        'border: none;' +
        'border-radius: 25px;' +
        'cursor: pointer;' +
        'margin: 10px;' +
        'transition: all 0.3s ease;' +
        'font-family: "Fredoka", "Comic Sans MS", cursive, sans-serif;' +
        '}' +
        '.frog-restart-btn:hover {' +
        'background: #45a049;' +
        'transform: scale(1.05);' +
        '}';
    document.head.appendChild(gameStyles);

    // Game state
    var gameState = {
        running: false,
        score: 0,
        frogsOnLily: 0,
        spawnRate: 4000,
        frogs: [],
        spawnInterval: null,
        accelerationInterval: null,
        lilyCenter: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        accelerationCount: 0
    };

    // Create UI elements
    function createUI() {
        // Close button
        var closeBtn = document.createElement('button');
        closeBtn.className = 'frog-close-btn';
        closeBtn.innerHTML = '❌ Close';
        closeBtn.onclick = function() { endGame(true); };

        // UI container
        var ui = document.createElement('div');
        ui.className = 'frog-game-ui';
        
        var scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'frog-score';
        scoreDisplay.id = 'frog-animation-score-display';
        scoreDisplay.textContent = 'RIBBITS: 0';
        
        var lilyCounter = document.createElement('div');
        lilyCounter.className = 'frog-lily-counter';
        lilyCounter.id = 'frog-animation-lily-counter';
        lilyCounter.textContent = 'FROGS ON LILY: 0/10';
        lilyCounter.style.display = 'none';

        ui.appendChild(scoreDisplay);
        ui.appendChild(lilyCounter);

        // Lily pad
        var lilyPad = document.createElement('div');
        lilyPad.className = 'frog-lily-pad';
        lilyPad.id = 'frog-animation-lily-pad';

        gameOverlay.appendChild(closeBtn);
        gameOverlay.appendChild(ui);
        gameOverlay.appendChild(lilyPad);
    }

    // Start the game
    function startGame() {
        gameState.running = true;
        gameState.score = 0;
        gameState.frogsOnLily = 0;
        gameState.spawnRate = 4000;
        gameState.accelerationCount = 0;

        // Hide the original animation buttons when game starts
        var buttonContainer = document.querySelector('#frog-overlay > div');
        if (buttonContainer) {
            buttonContainer.style.display = 'none';
        }

        gameOverlay.style.display = 'block';
        
        // Ensure UI elements exist and are visible
        var lilyCounterElement = document.getElementById('frog-animation-lily-counter');
        var scoreElement = document.getElementById('frog-animation-score-display');
        
        console.log('🐸 Game starting - UI elements check:');
        console.log('🐸 Score element found:', !!scoreElement);
        console.log('🐸 Lily counter element found:', !!lilyCounterElement);
        
        if (lilyCounterElement) {
            lilyCounterElement.style.display = 'block';
            console.log('🐸 Lily counter shown');
        }
        
        updateUI();
        
        // Start spawning frogs
        gameState.spawnInterval = setInterval(spawnFrog, gameState.spawnRate);
        
        // Accelerate every 15 seconds
        gameState.accelerationInterval = setInterval(accelerateGame, 15000);
        
        playRibbitSound();
    }

    // Spawn a frog
    function spawnFrog() {
        if (!gameState.running) return;

        var frog = document.createElement('div');
        frog.className = 'game-frog';
        frog.innerHTML = '🐸';
        
        // Random spawn from edges (further out)
        var side = Math.floor(Math.random() * 4);
        var startX, startY;
        
        switch(side) {
            case 0: // Top
                startX = Math.random() * window.innerWidth;
                startY = -80;
                break;
            case 1: // Right
                startX = window.innerWidth + 80;
                startY = Math.random() * window.innerHeight;
                break;
            case 2: // Bottom
                startX = Math.random() * window.innerWidth;
                startY = window.innerHeight + 80;
                break;
            case 3: // Left
                startX = -80;
                startY = Math.random() * window.innerHeight;
                break;
        }
        
        frog.style.left = startX + 'px';
        frog.style.top = startY + 'px';
        
        // Click handler
        frog.onclick = function(e) { clickFrog(e, frog); };
        
        gameOverlay.appendChild(frog);
        gameState.frogs.push(frog);
        
        // Animate with jumping motion toward lily
        animateFrogToLily(frog, startX, startY);
    }

    // Animate frog with realistic jumping
    function animateFrogToLily(frog, startX, startY) {
        var targetX = gameState.lilyCenter.x;
        var targetY = gameState.lilyCenter.y;
        
        var deltaX = targetX - startX;
        var deltaY = targetY - startY;
        var totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Slower, more realistic movement
        var jumpDistance = 60; // Distance per jump
        var jumpDuration = 1200; // Time per jump (slower)
        var totalJumps = Math.ceil(totalDistance / jumpDistance);
        
        var currentJump = 0;
        var currentX = startX;
        var currentY = startY;
        
        function makeJump() {
            if (!gameState.running || !frog.parentNode) return;
            
            currentJump++;
            
            // Calculate next position
            var progress = currentJump / totalJumps;
            var nextX = startX + (deltaX * progress);
            var nextY = startY + (deltaY * progress);
            
            // Animate the jump
            var jumpAnimation = frog.animate([
                { 
                    left: currentX + 'px', 
                    top: currentY + 'px',
                    transform: 'scale(1) rotate(0deg)'
                },
                { 
                    left: (currentX + nextX) / 2 + 'px', 
                    top: (currentY + nextY) / 2 - 30 + 'px',
                    transform: 'scale(1.1) rotate(10deg)'
                },
                { 
                    left: nextX + 'px', 
                    top: nextY + 'px',
                    transform: 'scale(1) rotate(0deg)'
                }
            ], {
                duration: jumpDuration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });
            
            currentX = nextX;
            currentY = nextY;
            
            jumpAnimation.addEventListener('finish', function() {
                if (currentJump >= totalJumps) {
                    // Frog reached lily pad
                    if (frog.parentNode && gameState.running) {
                        frogReachesLily(frog);
                    }
                } else {
                    // Continue jumping
                    setTimeout(makeJump, 200); // Small pause between jumps
                }
            });
        }
        
        // Start the jumping sequence
        makeJump();
    }

    // Handle frog click
    function clickFrog(event, frog) {
        event.stopPropagation();
        if (!gameState.running) return;
        
        // Remove from frogs array
        var index = gameState.frogs.indexOf(frog);
        if (index > -1) {
            gameState.frogs.splice(index, 1);
        }
        
        // Get position for effects
        var rect = frog.getBoundingClientRect();
        
        // Explosion effect
        frog.style.animation = 'frog-explode 0.6s ease-out forwards';
        
        // Create "BUY" text
        var buyText = document.createElement('div');
        buyText.className = 'frog-buy-text';
        buyText.innerHTML = 'BUY';
        buyText.style.left = rect.left + rect.width/2 + 'px';
        buyText.style.top = rect.top + rect.height/2 + 'px';
        
        gameOverlay.appendChild(buyText);
        
        // Clean up after animations
        setTimeout(function() {
            if (frog.parentNode) frog.remove();
            if (buyText.parentNode) buyText.remove();
        }, 1200);
        
        // Increase score
        gameState.score++;
        updateUI();
        playRibbitSound();
    }

    // Frog reaches lily pad
    function frogReachesLily(frog) {
        gameState.frogsOnLily++;
        
        // Remove frog
        if (frog.parentNode) frog.remove();
        var index = gameState.frogs.indexOf(frog);
        if (index > -1) {
            gameState.frogs.splice(index, 1);
        }
        
        updateUI();
        
        // Check game over
        if (gameState.frogsOnLily >= 10) {
            endGame(false);
        }
    }

    // Accelerate game difficulty
    function accelerateGame() {
        if (!gameState.running) return;
        
        // Increase spawn rate (decrease interval)
        gameState.spawnRate = gameState.spawnRate * 0.75;
        
        // Increment acceleration counter
        gameState.accelerationCount++;
        
        // Every 3 accelerations, spawn double frogs
        if (gameState.accelerationCount % 3 === 0) {
            spawnFrog(); // Spawn an extra frog immediately
        }
        
        // Restart spawn timer with new rate
        clearInterval(gameState.spawnInterval);
        gameState.spawnInterval = setInterval(spawnFrog, gameState.spawnRate);
        
        // Visual feedback
        gameOverlay.style.animation = 'none';
        gameOverlay.offsetHeight; // Force reflow
        gameOverlay.style.background = 'rgba(255, 192, 203, 0.3)';
        setTimeout(function() {
            gameOverlay.style.background = 'rgba(135, 206, 235, 0.2)';
        }, 500);
        
        console.log('🐸 SPEED INCREASED! Frogs now spawn every ' + gameState.spawnRate + 'ms');
    }

    // Update UI displays
    function updateUI() {
        var scoreElement = document.getElementById('frog-animation-score-display');
        var lilyElement = document.getElementById('frog-animation-lily-counter');
        
        if (scoreElement) {
            scoreElement.textContent = 'RIBBITS: ' + gameState.score;
        }
        
        if (lilyElement) {
            lilyElement.textContent = 'FROGS ON LILY: ' + gameState.frogsOnLily + '/10';
        }
    }

    // End game
    function endGame(isQuit) {
        gameState.running = false;
        clearInterval(gameState.spawnInterval);
        clearInterval(gameState.accelerationInterval);
        
        // Remove all frogs
        for (var i = 0; i < gameState.frogs.length; i++) {
            if (gameState.frogs[i].parentNode) gameState.frogs[i].remove();
        }
        gameState.frogs = [];
        
        if (isQuit) {
            gameOverlay.style.display = 'none';
            // Show the original animation buttons again
            var buttonContainer = document.querySelector('#frog-overlay > div');
            if (buttonContainer) {
                buttonContainer.style.display = 'flex';
            }
            return;
        }
        
        // Show game over screen
        var gameOverScreen = document.createElement('div');
        gameOverScreen.className = 'frog-game-over';
        gameOverScreen.innerHTML = '<h1>🐸 GAME OVER! 🐸</h1>' +
            '<p>The lily pad is overrun with frogs!</p>' +
            '<p>Final Score: <strong>' + gameState.score + ' RIBBITS</strong></p>' +
            '<button class="frog-restart-btn" onclick="window.open(\\'https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0xb794ad95317f75c44090f64955954c3849315ffe\\', \\'_blank\\')">Buy Ribbit</button>' +
            '<button class="frog-restart-btn" onclick="this.parentNode.parentNode.remove()">Close Game</button>';
        
        gameOverlay.appendChild(gameOverScreen);
    }

    // Play ribbit sound
    function playRibbitSound() {
        try {
            var audioContext = new (window.AudioContext || window.webkitAudioContext)();
            var oscillator = audioContext.createOscillator();
            var gain = audioContext.createGain();
            
            oscillator.connect(gain);
            gain.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.1);
            oscillator.frequency.exponentialRampToValueAtTime(180, audioContext.currentTime + 0.2);
            
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch(e) {
            console.log('🐸 Audio not supported');
        }
    }

    // Initialize game
    document.body.appendChild(gameOverlay);
    createUI();
    
    // Make startGame function globally available for the play button
    window.startGame = startGame;
    
    console.log('🐸 RIBBIT CLICKER GAME LOADED! Click the start button to begin hunting frogs!');
    console.log('🎯 Goal: Click frogs before they reach the lily pad. Game ends when 10 frogs make it to the lily!');

    // ==================== ORIGINAL ANIMATION ====================
    
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

    // Create button container (moved to bottom right)
    var buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'position: fixed;' +
        'bottom: 20px;' +
        'right: 20px;' +
        'z-index: 10001;' +
        'display: flex;' +
        'flex-direction: column;' +
        'gap: 10px;' +
        'pointer-events: auto;';

    // Add close button (grey circle with red X)
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = 'width: 40px;' +
        'height: 40px;' +
        'border-radius: 50%;' +
        'background: rgba(128, 128, 128, 0.9);' +
        'color: #ff4444;' +
        'border: 2px solid #666;' +
        'cursor: pointer;' +
        'font-size: 18px;' +
        'font-weight: bold;' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: center;' +
        'transition: all 0.3s ease;' +
        'align-self: flex-end;';
    
    closeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
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
    };

    // Add buy ribbit button (removed the X since we have dedicated close button)
    var buyBtn = document.createElement('button');
    buyBtn.innerHTML = '💰 buy ribbit';
    buyBtn.style.cssText = 'padding: 12px 18px;' +
        'background: linear-gradient(135deg, #4CAF50, #45a049);' +
        'color: white;' +
        'border: none;' +
        'border-radius: 25px;' +
        'cursor: pointer;' +
        'font-size: 14px;' +
        'font-weight: bold;' +
        'box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);' +
        'transition: all 0.3s ease;' +
        'font-family: "Comic Sans MS", cursive, sans-serif;';
    
    buyBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // GTM Event for tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'frog_animation_buy_clicked', {
                'event_category': 'conversion',
                'event_label': 'buy_ribbit'
            });
        }
        
        // Trigger glitch effect
        triggerGlitchEffect();
        
        // Open Uniswap after glitch
        setTimeout(function() {
            window.open(config.uniswapUrl, '_blank');
        }, 1000);
    };

    // Add play game button
    var playBtn = document.createElement('button');
    playBtn.innerHTML = '🎮 play game';
    playBtn.style.cssText = 'padding: 12px 18px;' +
        'background: linear-gradient(135deg, #FF6B6B, #ff5252);' +
        'color: white;' +
        'border: none;' +
        'border-radius: 25px;' +
        'cursor: pointer;' +
        'font-size: 14px;' +
        'font-weight: bold;' +
        'box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);' +
        'transition: all 0.3s ease;' +
        'font-family: "Comic Sans MS", cursive, sans-serif;';
    
    // Add lick the toad button
    var lickBtn = document.createElement('button');
    lickBtn.innerHTML = '👅 lick the toad';
    lickBtn.style.cssText = 'padding: 12px 18px;' +
        'background: linear-gradient(135deg, #9C27B0, #7B1FA2);' +
        'color: white;' +
        'border: none;' +
        'border-radius: 25px;' +
        'cursor: pointer;' +
        'font-size: 14px;' +
        'font-weight: bold;' +
        'box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);' +
        'transition: all 0.3s ease;' +
        'font-family: "Comic Sans MS", cursive, sans-serif;';
    
    playBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // GTM Event for tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'frog_game_started', {
                'event_category': 'engagement',
                'event_label': 'play_game'
            });
        }
        
        // Start the game
        startGame();
    };
    
    lickBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // GTM Event for tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'frog_toad_licked', {
                'event_category': 'engagement',
                'event_label': 'lick_toad'
            });
        }
        
        // Trigger glitch effect
        triggerGlitchEffect();
        
        // Show YouTube feed after glitch
        setTimeout(function() {
            showYouTubeFeed();
        }, 1000);
    };

    buttonContainer.appendChild(closeBtn);
    buttonContainer.appendChild(buyBtn);
    buttonContainer.appendChild(playBtn);
    buttonContainer.appendChild(lickBtn);

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
    overlay.appendChild(buttonContainer);

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

    console.log('🐸 ' + config.numFrogs + ' frogs are now jumping across your screen! Click the buttons!');
    
    // Glitch effect function
    function triggerGlitchEffect() {
        console.log('🌀 Triggering glitch effect...');
        
        // Create glitch overlay
        var glitchOverlay = document.createElement('div');
        glitchOverlay.style.cssText = 'position: fixed;' +
            'top: 0;' +
            'left: 0;' +
            'width: 100vw;' +
            'height: 100vh;' +
            'background: rgba(0, 0, 0, 0.8);' +
            'z-index: 15000;' +
            'pointer-events: none;' +
            'animation: glitch-flash 1s ease-out forwards;';
        
        // Add glitch styles
        var glitchStyles = document.createElement('style');
        glitchStyles.textContent = '@keyframes glitch-flash {' +
            '0% { opacity: 0; filter: hue-rotate(0deg) saturate(1); }' +
            '10% { opacity: 1; filter: hue-rotate(90deg) saturate(2); background: rgba(255, 0, 255, 0.3); }' +
            '20% { opacity: 0.8; filter: hue-rotate(180deg) saturate(0.5); background: rgba(0, 255, 255, 0.3); }' +
            '30% { opacity: 1; filter: hue-rotate(270deg) saturate(3); background: rgba(255, 255, 0, 0.3); }' +
            '40% { opacity: 0.6; filter: hue-rotate(360deg) saturate(1); background: rgba(255, 0, 0, 0.3); }' +
            '50% { opacity: 1; filter: hue-rotate(45deg) saturate(2); background: rgba(0, 255, 0, 0.3); }' +
            '60% { opacity: 0.8; filter: hue-rotate(135deg) saturate(0.8); background: rgba(0, 0, 255, 0.3); }' +
            '70% { opacity: 1; filter: hue-rotate(225deg) saturate(1.5); background: rgba(255, 128, 0, 0.3); }' +
            '80% { opacity: 0.7; filter: hue-rotate(315deg) saturate(2.5); background: rgba(128, 0, 255, 0.3); }' +
            '90% { opacity: 1; filter: hue-rotate(0deg) saturate(1); background: rgba(0, 128, 255, 0.3); }' +
            '100% { opacity: 0; filter: hue-rotate(0deg) saturate(1); background: transparent; }' +
            '}';
        
        document.head.appendChild(glitchStyles);
        document.body.appendChild(glitchOverlay);
        
        // Make body glitch too
        document.body.style.animation = 'glitch-flash 1s ease-out forwards';
        
        // Clean up after effect
        setTimeout(function() {
            if (glitchOverlay.parentNode) {
                glitchOverlay.parentNode.removeChild(glitchOverlay);
            }
            if (glitchStyles.parentNode) {
                glitchStyles.parentNode.removeChild(glitchStyles);
            }
            document.body.style.animation = '';
        }, 1100);
    }
    
    // YouTube feed function
    function showYouTubeFeed() {
        console.log('📺 Creating YouTube feed...');
        
        // Create feed overlay
        var feedOverlay = document.createElement('div');
        feedOverlay.id = 'youtube-feed-overlay';
        feedOverlay.style.cssText = 'position: fixed;' +
            'top: 0;' +
            'left: 0;' +
            'width: 100vw;' +
            'height: 100vh;' +
            'background: rgba(0, 0, 0, 0.95);' +
            'z-index: 12000;' +
            'overflow-y: auto;' +
            'padding: 20px;' +
            'box-sizing: border-box;';
        
        // Create feed container
        var feedContainer = document.createElement('div');
        feedContainer.style.cssText = 'max-width: 400px;' +
            'margin: 0 auto;' +
            'background: #1a1a1a;' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'font-family: "Comic Sans MS", cursive, sans-serif;' +
            'border: 2px solid #333;' +
            'box-shadow: 0 0 30px rgba(156, 39, 176, 0.5);';
        
        // Feed header
        var feedHeader = document.createElement('div');
        feedHeader.innerHTML = '<h2 style="color: #9C27B0; text-align: center; margin: 0 0 20px 0; font-size: 24px;">🐸 TOAD VISION 👅</h2>';
        feedContainer.appendChild(feedHeader);
        
        // Close button for feed
        var feedCloseBtn = document.createElement('button');
        feedCloseBtn.innerHTML = '✕ Close Feed';
        feedCloseBtn.style.cssText = 'position: absolute;' +
            'top: 20px;' +
            'right: 20px;' +
            'padding: 10px 15px;' +
            'background: #ff4444;' +
            'color: white;' +
            'border: none;' +
            'border-radius: 20px;' +
            'cursor: pointer;' +
            'font-size: 14px;' +
            'font-weight: bold;';
        
        feedCloseBtn.onclick = function() {
            if (feedOverlay.parentNode) {
                feedOverlay.parentNode.removeChild(feedOverlay);
            }
        };
        
        // YouTube videos data
        var videos = [
            {
                id: 'XQPgbWPVjc',
                url: 'https://youtu.be/XQPgbWPVjc',
                title: '🎵 Toad Tune #1'
            },
            {
                id: 'O5DyT6VeRAc', 
                url: 'https://youtu.be/O5DyT6VeRAc',
                title: '🎵 Toad Tune #2'
            }
        ];
        
        // Create video posts
        videos.forEach(function(video, index) {
            var post = document.createElement('div');
            post.style.cssText = 'margin-bottom: 30px;' +
                'background: #2a2a2a;' +
                'border-radius: 10px;' +
                'padding: 15px;' +
                'border: 1px solid #444;' +
                'filter: pixelated;' +
                'image-rendering: pixelated;';
            
                         // Post header
             var postHeader = document.createElement('div');
             postHeader.innerHTML = '<div style="color: #ccc; font-size: 12px; margin-bottom: 15px;">🐸 Follow us <a href="https://x.com/RibbitCTO" target="_blank" style="color: #9C27B0; text-decoration: none; font-weight: bold;">@RibbitCTO</a></div>';
             post.appendChild(postHeader);
            
                         // YouTube iframe with better parameters
             var iframe = document.createElement('iframe');
             iframe.src = 'https://www.youtube.com/embed/' + video.id + '?autoplay=0&controls=1&modestbranding=1&rel=0&enablejsapi=1&origin=' + window.location.origin;
             iframe.style.cssText = 'width: 100%;' +
                 'height: 200px;' +
                 'border: none;' +
                 'border-radius: 8px;' +
                 'filter: contrast(1.2) saturate(1.3);' +
                 'image-rendering: pixelated;';
             iframe.allowFullscreen = true;
             iframe.setAttribute('frameborder', '0');
             iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
             
             // Add error handling and load timeout
             var hasLoaded = false;
             
             iframe.onload = function() {
                 hasLoaded = true;
                 console.log('✅ YouTube embed loaded successfully: ' + video.id);
             };
             
             iframe.onerror = function() {
                 console.log('🚫 YouTube embed failed for video: ' + video.id);
                 createFallbackLink();
             };
             
             // Timeout fallback for embedding restrictions
             setTimeout(function() {
                 if (!hasLoaded) {
                     console.log('⏰ YouTube embed timeout for video: ' + video.id);
                     createFallbackLink();
                 }
             }, 5000);
             
             function createFallbackLink() {
                 if (iframe.parentNode) {
                     var fallbackLink = document.createElement('a');
                     fallbackLink.href = 'https://www.youtube.com/watch?v=' + video.id;
                     fallbackLink.target = '_blank';
                     fallbackLink.innerHTML = '🎥 Watch on YouTube<br><small style="font-size: 10px;">(Embed Restricted)</small>';
                     fallbackLink.style.cssText = 'display: block; text-align: center; padding: 60px 20px; background: #333; color: #9C27B0; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s ease;';
                     
                     fallbackLink.onmouseover = function() {
                         this.style.background = '#444';
                         this.style.transform = 'scale(1.02)';
                     };
                     
                     fallbackLink.onmouseout = function() {
                         this.style.background = '#333';
                         this.style.transform = 'scale(1)';
                     };
                     
                     iframe.parentNode.replaceChild(fallbackLink, iframe);
                 }
             }
            
            post.appendChild(iframe);
            
                         // Post footer
             var postFooter = document.createElement('div');
             postFooter.innerHTML = '<div style="color: #666; font-size: 12px; margin-top: 10px; text-align: center; font-style: italic;">...fake frames feel real because real was fake first.</div>';
             post.appendChild(postFooter);
            
            feedContainer.appendChild(post);
        });
        
        feedOverlay.appendChild(feedCloseBtn);
        feedOverlay.appendChild(feedContainer);
        document.body.appendChild(feedOverlay);
        
        // GTM Event for tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'youtube_feed_opened', {
                'event_category': 'engagement',
                'event_label': 'toad_vision_feed'
            });
        }
    }
    
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

    // Copy to clipboard
    navigator.clipboard.writeText(fullCode).then(() => {
        // Show matrix-themed success message
        const button = document.querySelector('button[onclick="copyRibbitCode()"]');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '⚡ CODE DEPLOYED ⚡';
            button.style.background = 'linear-gradient(135deg, #00ff41, #00ff41)';
            button.style.color = '#000';
            button.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
            
            // Matrix-style console message
            console.log('%c🐸 RIBBIT GTM CODE EXTRACTED 🐸', 'color: #00ff41; font-size: 16px; font-weight: bold; background: #0d1117; padding: 5px;');
            console.log('%cDeploy this code in GTM. Any URL with #ribbit will trigger frog chaos!', 'color: #00ff41; background: #0d1117;');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'linear-gradient(135deg, #00ff41, #7c3aed)';
                button.style.boxShadow = '0 4px 15px rgba(0, 255, 65, 0.3)';
            }, 2500);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback: show text in a dialog for manual copying
        const textArea = document.createElement('textarea');
        textArea.value = fullCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('🐸 RIBBIT code uploaded to clipboard!');
    });
} 
