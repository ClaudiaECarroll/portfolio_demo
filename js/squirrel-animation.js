// Squirrel and Robot Animation Controller
class SquirrelAnimation {
    constructor() {
        this.container = null;
        this.animationTriggered = false;
        this.animationInterval = null;
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
        this.createAnimationContainer();
        this.startRandomAnimations();
    }

    createAnimationContainer() {
        // Remove existing container if it exists
        const existing = document.querySelector('.squirrel-animation-container');
        if (existing) {
            existing.remove();
        }

        // Create the main container
        this.container = document.createElement('div');
        this.container.className = 'squirrel-animation-container animation-hidden';
        
        // Create doors
        const leftDoor = this.createDoor('door-left');
        const rightDoor = this.createDoor('door-right');
        
        // Create squirrel
        const squirrel = this.createSquirrel();
        
        // Create robot
        const robot = this.createRobot();
        
        // Add all elements to container
        this.container.appendChild(leftDoor);
        this.container.appendChild(rightDoor);
        this.container.appendChild(squirrel);
        this.container.appendChild(robot);
        
        // Add to body
        document.body.appendChild(this.container);
    }

    createDoor(className) {
        const door = document.createElement('div');
        door.className = `door ${className}`;
        
        const frame = document.createElement('div');
        frame.className = 'door-frame';
        
        const back = document.createElement('div');
        back.className = 'door-back';
        
        const panel = document.createElement('div');
        panel.className = 'door-panel';
        
        door.appendChild(frame);
        door.appendChild(back);
        door.appendChild(panel);
        
        return door;
    }

    createSquirrel() {
        const squirrel = document.createElement('div');
        squirrel.className = 'squirrel';
        
        const body = document.createElement('div');
        body.className = 'squirrel-body';
        
        const head = document.createElement('div');
        head.className = 'squirrel-head';
        
        const ears = document.createElement('div');
        ears.className = 'squirrel-ears';
        
        const tail = document.createElement('div');
        tail.className = 'squirrel-tail';
        
        const legs = document.createElement('div');
        legs.className = 'squirrel-legs';
        
        head.appendChild(ears);
        body.appendChild(head);
        body.appendChild(tail);
        body.appendChild(legs);
        squirrel.appendChild(body);
        
        return squirrel;
    }

    createRobot() {
        const robot = document.createElement('div');
        robot.className = 'robot';
        
        const body = document.createElement('div');
        body.className = 'robot-body';
        
        const head = document.createElement('div');
        head.className = 'robot-head';
        
        const eyes = document.createElement('div');
        eyes.className = 'robot-eyes';
        
        const antenna = document.createElement('div');
        antenna.className = 'robot-antenna';
        
        const arms = document.createElement('div');
        arms.className = 'robot-arms';
        
        const legs = document.createElement('div');
        legs.className = 'robot-legs';
        
        head.appendChild(eyes);
        head.appendChild(antenna);
        body.appendChild(head);
        body.appendChild(arms);
        body.appendChild(legs);
        robot.appendChild(body);
        
        return robot;
    }

    async playAnimation() {
        if (this.animationTriggered) return;
        this.animationTriggered = true;

        const leftDoor = this.container.querySelector('.door-left');
        const rightDoor = this.container.querySelector('.door-right');
        const squirrel = this.container.querySelector('.squirrel');
        const robot = this.container.querySelector('.robot');

        // Show container
        this.container.classList.remove('animation-hidden');
        this.container.classList.add('animation-visible');

        // Step 1: Left door appears and opens (0-1s)
        setTimeout(() => {
            leftDoor.classList.add('door-opening');
        }, 0);

        // Step 2: Squirrel runs out halfway (1s)
        setTimeout(() => {
            squirrel.classList.add('squirrel-running-first');
        }, 1000);

        // Step 3: Squirrel stops and looks back (4s)
        setTimeout(() => {
            squirrel.classList.remove('squirrel-running-first');
            squirrel.classList.add('squirrel-looking-back');
        }, 4000);

        // Step 4: Robot comes out (4.5s)
        setTimeout(() => {
            robot.classList.add('robot-chasing');
        }, 4500);

        // Step 5: Right door appears and opens (5s)
        setTimeout(() => {
            rightDoor.classList.add('door-opening');
        }, 5000);

        // Step 6: Squirrel continues running to exit (5.5s)
        setTimeout(() => {
            squirrel.classList.remove('squirrel-looking-back');
            squirrel.classList.add('squirrel-running-final');
        }, 5500);

        // Step 7: Close both doors (8.5s)
        setTimeout(() => {
            leftDoor.classList.remove('door-opening');
            leftDoor.classList.add('door-closing');
            rightDoor.classList.remove('door-opening');
            rightDoor.classList.add('door-closing');
        }, 8500);

        // Step 8: Hide doors and reset (10s)
        setTimeout(() => {
            this.resetAnimation();
        }, 10000);
    }

    resetAnimation() {
        const leftDoor = this.container.querySelector('.door-left');
        const rightDoor = this.container.querySelector('.door-right');
        const squirrel = this.container.querySelector('.squirrel');
        const robot = this.container.querySelector('.robot');

        // Remove all animation classes
        leftDoor.classList.remove('door-opening', 'door-closing');
        rightDoor.classList.remove('door-opening', 'door-closing');
        squirrel.classList.remove('squirrel-running-first', 'squirrel-looking-back', 'squirrel-running-final');
        robot.classList.remove('robot-chasing');

        // Hide container
        this.container.classList.remove('animation-visible');
        this.container.classList.add('animation-hidden');

        // Reset trigger
        this.animationTriggered = false;
    }

    startRandomAnimations() {
        // Play animation every 30-60 seconds randomly
        const scheduleNext = () => {
            const delay = Math.random() * 30000 + 30000; // 30-60 seconds
            setTimeout(() => {
                this.playAnimation();
                scheduleNext();
            }, delay);
        };

        // Initial delay of 10-20 seconds
        const initialDelay = Math.random() * 10000 + 10000;
        setTimeout(() => {
            this.playAnimation();
            scheduleNext();
        }, initialDelay);
    }

    // Manual trigger method (can be called from console or other scripts)
    trigger() {
        this.playAnimation();
    }
}

// Initialize the animation when the script loads
const squirrelAnimation = new SquirrelAnimation();

// Make it globally accessible for manual triggering
window.squirrelAnimation = squirrelAnimation;
