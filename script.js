/* =========================================
   Lerp-Smoothed Mouse Follower Logic
   ========================================= */
const follower = document.querySelector('.cursor-follower');

if (follower) {
    // Current target position (mouse)
    let mouseX = 0;
    let mouseY = 0;

    // Current follower position
    let followerX = 0;
    let followerY = 0;

    // Interpolation factor (0.1 = 10% distance covered per frame).
    // Lower = smoother/slower delay, Higher = tighter/snappier response.
    const ease = 0.12; 

    // Update target mouse coordinates on move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Continuous render loop for smooth trailing
    const render = () => {
        // Calculate lerp distance
        followerX += (mouseX - followerX) * ease;
        followerY += (mouseY - followerY) * ease;

        // Apply smoothed coordinates
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

        // Request next frame continuously
        requestAnimationFrame(render);
    };

    // Kick off animation loop
    render();

    // Hover state management using event delegation
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .panel')) {
            follower.classList.add('hover-active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .panel')) {
            follower.classList.remove('hover-active');
        }
    });
}