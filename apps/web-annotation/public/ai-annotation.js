/**
 * ai-annotation Client-Side Script
 *
 * This script finds elements with the 'data-ai-annotation' attribute
 * and displays their content in a tooltip on hover.
 * It supports Markdown formatting using marked.js and code highlighting with highlight.js.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Load required libraries if they're not already loaded
  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function loadStylesheet(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  // Load marked.js for Markdown parsing
  if (typeof marked === 'undefined') {
    loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', () => {
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        langPrefix: 'language-' // 言語クラスを正しく設定
      });
    });
  }

  // Load highlight.js for code syntax highlighting
  if (typeof hljs === 'undefined') {
    loadScript('https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/lib/highlight.min.js', () => {
      // Configure highlight.js to automatically detect language
      for (const el of document.querySelectorAll('pre code')) {
        hljs.highlightElement(el);
      }
    });
    // Load highlight.js styles
    loadStylesheet('https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css');
  }

  const annotatedElements = document.querySelectorAll('[data-ai-annotation]');
  let tooltipElement = null;
  let isTooltipVisible = false;
  
  // 修飾キーの状態を追跡
  let modifierKeyPressed = false;
  
  // キーボードイベントリスナー
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.shiftKey) {
      modifierKeyPressed = true;
    }
  });
  
  document.addEventListener('keyup', (event) => {
    // すべての修飾キーが離されたかチェック
    if (!(event.altKey || event.ctrlKey || event.shiftKey)) {
      modifierKeyPressed = false;
      // ポップアップが表示中で、マウスがポップアップ上にない場合は閉じる
      if (isTooltipVisible && tooltipElement && !isMouseOverTooltip) {
        hideTooltip();
      }
    }
  });

  // Create a reusable tooltip element (initially hidden)
  function createTooltip() {
    if (!tooltipElement) {
      tooltipElement = document.createElement('div');
      tooltipElement.style.position = 'absolute';
      tooltipElement.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      tooltipElement.style.color = '#333';
      tooltipElement.style.padding = '10px 15px';
      tooltipElement.style.borderRadius = '6px';
      tooltipElement.style.fontSize = '14px';
      tooltipElement.style.zIndex = '10000'; // Ensure it's on top
      tooltipElement.style.pointerEvents = 'auto'; // ポップアップ内での選択やスクロールを可能にする
      tooltipElement.style.display = 'none'; // Hidden by default
      tooltipElement.style.maxWidth = '500px'; // Increased width for better markdown display
      tooltipElement.style.maxHeight = '400px'; // Limit height
      tooltipElement.style.overflow = 'auto'; // Add scrolling for large content
      tooltipElement.style.wordWrap = 'break-word'; // Wrap long words
      tooltipElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      tooltipElement.style.border = '1px solid #ddd';
      document.body.appendChild(tooltipElement);
      
      // ポップアップ自体にマウスイベントリスナーを追加
      let isMouseOverTooltip = false;
      
      tooltipElement.addEventListener('mouseover', () => {
        isMouseOverTooltip = true;
      });
      
      tooltipElement.addEventListener('mouseout', () => {
        isMouseOverTooltip = false;
        // 修飾キーが押されていない場合のみ閉じる
        if (!modifierKeyPressed) {
          hideTooltip();
        }
      });
    }
  }

  // Show tooltip with content
  function showTooltip(event, content) {
    createTooltip(); // Ensure tooltip exists
    isTooltipVisible = true;

    // First try parsing as JSON for potentially structured content
    let displayContent = content;
    let isJson = false;
    
    try {
      const parsed = JSON.parse(content);
      // If JSON, format it nicely
      displayContent = JSON.stringify(parsed, null, 2);
      isJson = true;
    } catch (e) {
      // If not JSON, treat as potential markdown
      isJson = false;
    }

    if (isJson) {
      // For JSON content, use pre-formatted text
      tooltipElement.innerHTML = `<pre style="margin: 0;">${displayContent}</pre>`;
    } else {
      // For non-JSON content, try to render as Markdown if marked is available
      if (typeof marked !== 'undefined') {
        tooltipElement.innerHTML = marked.parse(displayContent);
        
        // Apply syntax highlighting to code blocks if highlight.js is available
        if (typeof hljs !== 'undefined') {
          for (const block of tooltipElement.querySelectorAll('pre code')) {
            hljs.highlightElement(block);
          }
          
          // すべてのコードブロックをチェックし、diff構文を検出して色付け
          for (const block of tooltipElement.querySelectorAll('pre code')) {
            // diffの言語クラスを持つか、または+/-で始まる行を含むコードブロックを処理
            if (block.classList.contains('language-diff') || block.textContent.match(/^[+-]/m)) {
              block.innerHTML = block.innerHTML
                .replace(/^(\+.*)$/gm, '<span style="color: #22863a; background-color: #f0fff4;">$1</span>')
                .replace(/^(-.*)/gm, '<span style="color: #cb2431; background-color: #ffeef0;">$1</span>');
            }
          }
        }
      } else {
        // Fallback if marked.js isn't loaded yet
        tooltipElement.textContent = displayContent;
      }
    }

    tooltipElement.style.display = 'block';
    positionTooltip(event); // 初回表示時のみ位置を設定（以降は固定）
  }

  // Hide tooltip
  function hideTooltip() {
    if (tooltipElement) {
      tooltipElement.style.display = 'none';
      isTooltipVisible = false;
    }
  }

  // Position tooltip near the mouse cursor (初回表示時のみ呼び出される)
  function positionTooltip(event) {
    if (!tooltipElement) return;

    const PADDING = 15; // Space from cursor
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
        // 修飾キーが押されていない場合のみ閉じる
        if (!modifierKeyPressed) {
          hideTooltip();
        }
      });
      
      // mousemoveイベントリスナーは削除（ポップアップ位置を固定するため）
    }
  }

  // Hide tooltip if mouse leaves the window (修飾キーが押されていない場合のみ)
  document.addEventListener('mouseleave', () => {
    if (!modifierKeyPressed) {
      hideTooltip();
    }
  });
});