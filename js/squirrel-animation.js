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

        try {
            // Reset all elements
            this.resetAnimation();

            // Step 1: Show doors and open left door (0.5s)
            leftDoor.classList.add('show');
            rightDoor.classList.add('show');
            leftDoor.classList.add('door-open');

            // Step 2: Squirrel runs to halfway point (2s)
            await this.delay(200); // Short delay to let door start opening
            squirrel.style.opacity = '1'; // Make squirrel visible
            // Remove manual clip-path - let CSS animation handle it
            await this.delay(300);
            squirrel.classList.add('squirrelRunFirst');

            // Step 3: Squirrel looks back (2s)
            await this.delay(2000);
            squirrel.classList.add('squirrelLookBack');

            // Step 4: Robot emerges and both run to exit (3s)
            await this.delay(1500); // Shorter delay so robot appears while squirrel is still looking back
            squirrel.classList.remove('squirrelLookBack');
            squirrel.classList.add('squirrelRunFinal');
            await this.delay(300); // Small delay so robot appears slightly after squirrel starts running
            robot.style.opacity = '1'; // Make robot visible
            // Remove manual clip-path - let CSS animation handle it
            robot.classList.add('robotChase');
            rightDoor.classList.add('door-open');

            // Step 5: Close doors, hide them, and reset (after 2.8s to account for faster robot)
            await this.delay(2800);
            leftDoor.classList.remove('door-open');
            rightDoor.classList.remove('door-open');

            // Step 6: Hide doors and clean up and prepare for next cycle
            await this.delay(500); // Wait for doors to close
            leftDoor.classList.remove('show');
            rightDoor.classList.remove('show');
            await this.delay(500);
            this.resetAnimation();
            this.isPlaying = false;

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
            // Remove clip-path completely
            squirrel.style.clipPath = '';
            squirrel.style.zIndex = '1';
        }
        if (robot) {
            robot.classList.remove('robotChase');
            robot.style.opacity = '0';
            robot.style.left = '70px';
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