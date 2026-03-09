/* ===================================
   CLIENTS SECTION JAVASCRIPT
   =================================== */

/**
 * CLIENT LOGOS MANAGEMENT
 * This script helps manage and duplicate logos for seamless scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeClientLogos();
});

/**
 * Initialize client logos section
 * Automatically handles logo duplication for seamless scroll
 */
function initializeClientLogos() {
    const scrollTrack = document.querySelector('.scroll-track');
    
    if (!scrollTrack) {
        console.warn('Scroll track not found');
        return;
    }

    // Get all unique logo cards (original ones, not duplicates)
    const logoCards = Array.from(scrollTrack.querySelectorAll('.logo-card'));
    const midPoint = logoCards.length / 2;
    
    // The duplicates start after midPoint
    const originalCards = logoCards.slice(0, midPoint);
    
    // Add hover tooltip with client name
    originalCards.forEach(card => {
        const img = card.querySelector('img');
        if (img && img.alt) {
            card.setAttribute('title', img.alt);
            card.setAttribute('data-client-name', img.alt);
        }
    });

    // Optional: Add click handler for future analytics or modal
    logoCards.forEach(card => {
        card.addEventListener('click', handleLogoClick);
    });

    console.log(`✓ ${originalCards.length} client logos initialized`);
}

/**
 * Handle logo card click
 * Can be extended for modal, analytics, or client details
 */
function handleLogoClick(event) {
    const clientName = event.currentTarget.querySelector('img').alt;
    console.log('Client clicked:', clientName);
    
    // You can add custom behavior here:
    // - Open a modal with client details
    // - Track analytics
    // - Show testimonials
    // - Navigate to client case study
}

/**
 * DYNAMIC LOGO ADDITION FUNCTION
 * Use this to add logos programmatically
 * 
 * Example usage:
 * addClientLogo('logo9.jpeg', 'New Client Name');
 */
function addClientLogo(logoPath, clientName) {
    const scrollTrack = document.querySelector('.scroll-track');
    
    if (!scrollTrack) {
        console.error('Scroll track not found');
        return false;
    }

    // Create new logo card
    const newLogoCard = document.createElement('div');
    newLogoCard.className = 'logo-card';
    newLogoCard.setAttribute('data-client-name', clientName);
    newLogoCard.setAttribute('title', clientName);

    // Create image element
    const img = document.createElement('img');
    img.src = logoPath;
    img.alt = clientName;
    
    // Append image to card
    newLogoCard.appendChild(img);

    // Add click handler
    newLogoCard.addEventListener('click', handleLogoClick);

    // Add card to scroll track
    scrollTrack.appendChild(newLogoCard);

    // Also add duplicate for seamless scrolling
    const duplicateCard = newLogoCard.cloneNode(true);
    duplicateCard.addEventListener('click', handleLogoClick);
    scrollTrack.appendChild(duplicateCard);

    console.log(`✓ Added client logo: ${clientName}`);
    return true;
}

/**
 * REMOVE CLIENT LOGO FUNCTION
 * Removes logo by client name
 * 
 * Example usage:
 * removeClientLogo('Old Client Name');
 */
function removeClientLogo(clientName) {
    const scrollTrack = document.querySelector('.scroll-track');
    
    if (!scrollTrack) {
        console.error('Scroll track not found');
        return false;
    }

    const cards = scrollTrack.querySelectorAll('.logo-card');
    let removed = false;

    cards.forEach(card => {
        if (card.getAttribute('data-client-name') === clientName) {
            card.remove();
            removed = true;
        }
    });

    if (removed) {
        console.log(`✓ Removed client logo: ${clientName}`);
    } else {
        console.warn(`Client not found: ${clientName}`);
    }

    return removed;
}

/**
 * GET ALL CLIENTS FUNCTION
 * Returns array of all current client names
 */
function getAllClients() {
    const scrollTrack = document.querySelector('.scroll-track');
    
    if (!scrollTrack) {
        console.error('Scroll track not found');
        return [];
    }

    const cards = scrollTrack.querySelectorAll('.logo-card[data-client-name]');
    const clients = [];
    const seen = new Set();

    cards.forEach(card => {
        const clientName = card.getAttribute('data-client-name');
        // Only add unique names (to avoid counting duplicates)
        if (clientName && !seen.has(clientName)) {
            clients.push(clientName);
            seen.add(clientName);
        }
    });

    return clients;
}

/**
 * PAUSE/RESUME SCROLL ANIMATION
 * Useful for accessibility or custom controls
 */
function pauseClientScroll() {
    const scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
        scrollTrack.style.animationPlayState = 'paused';
    }
}

function resumeClientScroll() {
    const scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
        scrollTrack.style.animationPlayState = 'running';
    }
}

/**
 * ADJUST SCROLL SPEED
 * Pass speed in seconds (default is 35s)
 * 
 * Example usage:
 * setClientScrollSpeed(50); // Slower
 * setClientScrollSpeed(20); // Faster
 */
function setClientScrollSpeed(seconds) {
    const scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
        scrollTrack.style.animationDuration = `${seconds}s`;
        console.log(`✓ Scroll speed set to ${seconds}s`);
    }
}

/**
 * UPDATE LOGO IMAGE
 * Replace existing logo with new image
 * 
 * Example usage:
 * updateClientLogo('Old Client Name', 'logos/new-logo.jpeg', 'Updated Client Name');
 */
function updateClientLogo(oldClientName, newLogoPath, newClientName = null) {
    const scrollTrack = document.querySelector('.scroll-track');
    
    if (!scrollTrack) {
        console.error('Scroll track not found');
        return false;
    }

    const cards = scrollTrack.querySelectorAll('.logo-card');
    let updated = false;

    cards.forEach(card => {
        if (card.getAttribute('data-client-name') === oldClientName) {
            const img = card.querySelector('img');
            if (img) {
                img.src = newLogoPath;
                
                const finalName = newClientName || oldClientName;
                img.alt = finalName;
                card.setAttribute('data-client-name', finalName);
                card.setAttribute('title', finalName);
                
                updated = true;
            }
        }
    });

    if (updated) {
        console.log(`✓ Updated client logo: ${oldClientName}`);
    }

    return updated;
}

/* ===================================
   EXAMPLE USAGE (Uncomment to test)
   =================================== */

/*
// Add a new client logo
// addClientLogo('logos/logo9.jpeg', 'New Company Name');

// Remove a client
// removeClientLogo('Client 1');

// Get all clients
// console.log('All clients:', getAllClients());

// Change scroll speed
// setClientScrollSpeed(25); // Faster

// Pause scroll
// pauseClientScroll();

// Resume after 3 seconds
// setTimeout(resumeClientScroll, 3000);

// Update existing logo
// updateClientLogo('Client 2', 'logos/new-logo.jpeg', 'Updated Client 2');
*/
