/**
 * ai-annotation Client-Side Script
 *
 * This script finds elements with the 'data-ai-annotation' attribute
 * and displays their content in a tooltip on hover.
 */
document.addEventListener('DOMContentLoaded', () => {
  const annotatedElements = document.querySelectorAll('[data-ai-annotation]');
  let tooltipElement = null;

  // Create a reusable tooltip element (initially hidden)
  function createTooltip() {
    if (!tooltipElement) {
      tooltipElement = document.createElement('div');
      tooltipElement.style.position = 'absolute';
      tooltipElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      tooltipElement.style.color = 'white';
      tooltipElement.style.padding = '5px 10px';
      tooltipElement.style.borderRadius = '4px';
      tooltipElement.style.fontSize = '12px';
      tooltipElement.style.whiteSpace = 'pre-wrap'; // Preserve formatting
      tooltipElement.style.zIndex = '10000'; // Ensure it's on top
      tooltipElement.style.pointerEvents = 'none'; // Prevent tooltip from blocking mouse events
      tooltipElement.style.display = 'none'; // Hidden by default
      tooltipElement.style.maxWidth = '300px'; // Limit width
      tooltipElement.style.wordWrap = 'break-word'; // Wrap long words
      document.body.appendChild(tooltipElement);
    }
  }

  // Show tooltip with content
  function showTooltip(event, content) {
    createTooltip(); // Ensure tooltip exists

    // Try parsing as JSON for potentially structured content
    let displayContent = content;
    try {
      const parsed = JSON.parse(content);
      // If JSON, format it nicely
      displayContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
      // If not JSON, use the raw string
      displayContent = content;
    }

    tooltipElement.textContent = displayContent;
    tooltipElement.style.display = 'block';
    positionTooltip(event);
  }

  // Hide tooltip
  function hideTooltip() {
    if (tooltipElement) {
      tooltipElement.style.display = 'none';
    }
  }

  // Position tooltip near the mouse cursor
  function positionTooltip(event) {
    if (!tooltipElement) return;

    const PADDING = 10; // Space from cursor
    let x = event.clientX + PADDING;
    let y = event.clientY + PADDING;

    // Adjust if tooltip goes off-screen horizontally
    if (x + tooltipElement.offsetWidth > window.innerWidth) {
      x = event.clientX - tooltipElement.offsetWidth - PADDING;
    }

    // Adjust if tooltip goes off-screen vertically
    if (y + tooltipElement.offsetHeight > window.innerHeight) {
      y = event.clientY - tooltipElement.offsetHeight - PADDING;
    }

    // Ensure tooltip doesn't go off the top or left edge
    x = Math.max(PADDING, x);
    y = Math.max(PADDING, y);


    tooltipElement.style.left = `${x}px`;
    tooltipElement.style.top = `${y}px`;
  }

  for (const element of annotatedElements) {
    const annotationContent = element.getAttribute('data-ai-annotation');

    if (annotationContent) {
      element.addEventListener('mouseover', (event) => {
        // Stop propagation to prevent parent elements with annotations from showing their tooltips simultaneously
        event.stopPropagation();
        showTooltip(event, annotationContent);
      });

      element.addEventListener('mouseout', (event) => {
        event.stopPropagation();
        hideTooltip();
      });

      // Also update position on mouse move while hovering
      element.addEventListener('mousemove', (event) => {
        if (tooltipElement && tooltipElement.style.display === 'block') {
          positionTooltip(event);
        }
      });
    }
  }

  // Hide tooltip if mouse leaves the window
  document.addEventListener('mouseleave', hideTooltip);
});