// Door and Chase Animation Controller
class DoorChaseAnimation {
    constructor() {
        this.container = null;
        this.isPlaying = false;
        this.animationTimeout = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createContainer();
        this.startAnimation();
        console.log('🚪🐿️🤖 Door chase animation initialized!');
    }

    createContainer() {
        // Remove any existing container
        const existing = document.querySelector('.door-chase-container');
        if (existing) {
            existing.remove();
        }

        this.container = document.createElement('div');
        this.container.className = 'door-chase-container';
        this.container.innerHTML = `
            <!-- Left Door -->
            <div class="door door-left">
                <div class="door-frame"></div>
                <div class="door-back"></div>
                <div class="door-panel"></div>
            </div>

            <!-- Right Door -->
            <div class="door door-right">
                <div class="door-frame"></div>
                <div class="door-back"></div>
                <div class="door-panel"></div>
            </div>

            <!-- Squirrel Character -->
            <div class="squirrel-character character">
                <div class="squirrel-body"></div>
                <div class="squirrel-belly"></div>
                <div class="squirrel-head"></div>
                <div class="squirrel-snout"></div>
                <div class="squirrel-nose"></div>
                <div class="squirrel-ears squirrel-ear-left"></div>
                <div class="squirrel-ears squirrel-ear-right"></div>
                <div class="squirrel-ear-inner-left"></div>
                <div class="squirrel-ear-inner-right"></div>
                <div class="squirrel-eyebrow-left"></div>
                <div class="squirrel-eyebrow-right"></div>
                <div class="squirrel-eyes squirrel-eye-left"></div>
                <div class="squirrel-eyes squirrel-eye-right"></div>
                <div class="squirrel-pupil-left"></div>
                <div class="squirrel-pupil-right"></div>
                <div class="squirrel-tail"></div>
                <div class="squirrel-tail-stripe1"></div>
                <div class="squirrel-tail-stripe2"></div>
                <div class="squirrel-legs squirrel-leg-front"></div>
                <div class="squirrel-legs squirrel-leg-back"></div>
            </div>

            <!-- Robot Character -->
            <div class="robot-character character">
                <div class="robot-body"></div>
                <div class="robot-head">
                    <div class="robot-eyes robot-eye-left"></div>
                    <div class="robot-eyes robot-eye-right"></div>
                </div>
                <div class="robot-antenna"></div>
                <div class="robot-antenna-tip"></div>
                <div class="robot-legs robot-leg-left"></div>
                <div class="robot-legs robot-leg-right"></div>
            </div>
        `;

        document.body.appendChild(this.container);
    }

    async startAnimation() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        const leftDoor = this.container.querySelector('.door-left');
        const rightDoor = this.container.querySelector('.door-right');
        const squirrel = this.container.querySelector('.squirrel-character');
        const robot = this.container.querySelector('.robot-character');

        const startTime = Date.now();
        const logTime = (msg) => console.log(`[${Date.now() - startTime}ms] ${msg}`);

        try {
            // Reset all elements
            this.resetAnimation();
            logTime('🔄 Animation reset complete');

            // Step 1: Show doors and open left door for characters to emerge
            logTime('🚪 Showing doors and opening left door');
            leftDoor.classList.add('show');
            rightDoor.classList.add('show');
            logTime('Left door show classes: ' + leftDoor.className);
            logTime('Right door show classes: ' + rightDoor.className);
            
            await this.delay(200); // Small delay to let doors appear
            leftDoor.classList.add('door-open');
            logTime('Left door open classes: ' + leftDoor.className);

            // Step 2: Squirrel emerges and runs to halfway point (2s)
            await this.delay(300); // Let door fully open first
            logTime('🐿️ Squirrel emerges and starts first run');
            squirrel.style.opacity = '1'; // Make squirrel visible
            squirrel.classList.add('squirrelRunFirst');

            // Step 3: Squirrel jumps and looks back (2s)
            await this.delay(2000);
            logTime('🐿️ Squirrel jumping and looking back');
            squirrel.classList.add('squirrelLookBack');

            // Step 4: Squirrel starts running toward right door first
            await this.delay(1500); // Robot appears while squirrel is jumping
            logTime('🐿️ Squirrel starts final run to door');
            squirrel.classList.remove('squirrelLookBack');
            squirrel.classList.add('squirrelRunFinal');
            
            // Step 5: Open right door early for squirrel to escape through
            await this.delay(600); // Open right door earlier for squirrel (at 1.2s of 1.8s animation)
            logTime('🚪 Opening right door for squirrel escape');
            rightDoor.classList.add('door-open');
            logTime('Right door classes: ' + rightDoor.className);
            
            // Step 6: Squirrel reaches door and disappears (fade out manually)
            await this.delay(1000); // Wait for squirrel to reach door (1.8s total - 600ms = 1200ms remaining, so wait 1000ms)
            logTime('🐿️ Squirrel disappearing through door');
            squirrel.style.transition = 'opacity 0.3s ease-out';
            squirrel.style.opacity = '0';
            
            // Step 7: Robot emerges and starts chasing after squirrel has already escaped
            await this.delay(400); // Delay after squirrel disappears
            logTime('🤖 Robot emerges and starts chasing');
            robot.style.opacity = '1'; // Make robot visible
            robot.classList.add('robotChase');

            // Step 8: Close left door since characters have emerged (keep it open longer)
            await this.delay(2300); // Extended from 300ms to 2300ms (2 seconds longer)
            logTime('🚪 Closing left door');
            leftDoor.classList.remove('door-open');

            // Step 9: Robot reaches door and disappears (fade out manually)
            await this.delay(3000); // Wait for robot to reach door (3.5s total - 500ms delays = 3000ms)
            logTime('🤖 Robot disappearing through door');
            robot.style.transition = 'opacity 0.3s ease-out';
            robot.style.opacity = '0';

            // Step 10: Close right door after robot passes through
            await this.delay(400); // Wait for robot to fully disappear
            logTime('🚪 Closing right door after robot passes through');
            rightDoor.classList.remove('door-open');

            // Step 8: Hide doors and clean up and prepare for next cycle
            await this.delay(500); // Wait for doors to close
            logTime('🚪 Hiding doors and cleaning up');
            leftDoor.classList.remove('show');
            rightDoor.classList.remove('show');
            await this.delay(500);
            this.resetAnimation();
            this.isPlaying = false;
            logTime('🔄 Animation cycle complete, starting next in 5s');

            // Start next cycle after delay
            this.animationTimeout = setTimeout(() => {
                this.startAnimation();
            }, 5000); // 5 second pause between animations

        } catch (error) {
            console.error('Animation error:', error);
            this.isPlaying = false;
        }
    }

    resetAnimation() {
        const squirrel = this.container?.querySelector('.squirrel-character');
        const robot = this.container?.querySelector('.robot-character');
        const leftDoor = this.container?.querySelector('.door-left');
        const rightDoor = this.container?.querySelector('.door-right');

        if (squirrel) {
            squirrel.classList.remove('squirrelRunFirst', 'squirrelLookBack', 'squirrelRunFinal');
            squirrel.style.opacity = '0';
            squirrel.style.left = '70px';
            squirrel.style.transition = ''; // Clear any manual transitions
            // Remove clip-path completely
            squirrel.style.clipPath = '';
            squirrel.style.zIndex = '1';
        }
        if (robot) {
            robot.classList.remove('robotChase');
            robot.style.opacity = '0';
            robot.style.left = '70px';
            robot.style.transition = ''; // Clear any manual transitions
            // Remove clip-path completely
            robot.style.clipPath = '';
            robot.style.zIndex = '1';
        }
        if (leftDoor) {
            leftDoor.classList.remove('door-open', 'show');
        }
        if (rightDoor) {
            rightDoor.classList.remove('door-open', 'show');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    destroy() {
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
        if (this.container) {
            this.container.remove();
        }
    }
}

// Initialize the animation when the page loads
let doorChaseAnimation;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        doorChaseAnimation = new DoorChaseAnimation();
    });
} else {
    doorChaseAnimation = new DoorChaseAnimation();
}

// Export for potential manual control
window.DoorChaseAnimation = DoorChaseAnimation;