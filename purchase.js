// purchase.js — handles the purchase form file-drop UI and submission
(function () {
  // Initialize when DOM is ready
  function init() {
    const form = document.getElementById('purchase-form');
    if (!form) return; // nothing to do on other pages

    const drop = document.getElementById('file-drop');
    const fileInput = document.getElementById('photo-screenshot');
    const fileNameEl = document.getElementById('file-name');
    const submitBtn = form.querySelector('.submit-btn');

    // Helpers
    const setFileName = (file) => {
      fileNameEl.textContent = file ? file.name : '';
    };

    const setLoading = (isLoading) => {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      submitBtn.style.opacity = isLoading ? '0.6' : '';
      submitBtn.textContent = isLoading ? 'SENDING…' : 'SUBMIT';
    };

    // Open file picker on click or keyboard activation
    drop.addEventListener('click', () => fileInput.click());
    drop.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    // When user picks a file via the file input
    fileInput.addEventListener('change', () => {
      const f = fileInput.files && fileInput.files[0];
      setFileName(f);
    });

    // Drag & drop UI handlers
    ['dragenter', 'dragover'].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        drop.classList.add('dragover');
      })
    );
    ['dragleave', 'dragend', 'drop'].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        drop.classList.remove('dragover');
      })
    );

    drop.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (!dt || !dt.files || dt.files.length === 0) return;
      const file = dt.files[0];

      // Try to assign dropped files to the file input (works in modern browsers)
      try {
        fileInput.files = dt.files;
      } catch (err) {
        // fallback: we still show the filename and keep file reference via formData on submit
      }
      setFileName(file);
    });

    // Basic client-side validation and submit handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fd = new FormData(form);

      // Required fields: first-name, last-name, size
      const first = (fd.get('first-name') || '').toString().trim();
      const last = (fd.get('last-name') || '').toString().trim();
      const size = (fd.get('size') || '').toString().trim();

      if (!first || !last || !size) {
        alert('Please fill First Name, Last Name, and Size fields before submitting.');
        return;
      }

      // If the drag/drop assigned the file to the file input, it's already in FormData.
      // If not, try to pull from a saved DataTransfer (not required here).
      // Replace the URL below with your real endpoint that accepts multipart/form-data.
      const endpoint = 'https://example.com/api/purchase-request'; // <-- REPLACE THIS

      setLoading(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: fd,
        });

        if (res.ok) {
          alert('Thanks — your request was sent. I will reply shortly.');
          form.reset();
          setFileName(null);
        } else {
          // Try to extract error message from JSON if provided
          let errText = 'There was an error submitting the form. Please try again later.';
          try {
            const json = await res.json();
            if (json && json.error) errText = json.error;
          } catch (_) {}
          alert(errText);
        }
      } catch (err) {
        console.error('Form submission error:', err);
        alert('Network error submitting form. Please try again later.');
      } finally {
        setLoading(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
