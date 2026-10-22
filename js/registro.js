/* Registro de la demo de Barkarum Project: envía el formulario a Formspree sin recargar la página.
   La dirección del formulario está en data-endpoint (y en action, para cuando no hay JavaScript). */
(function () {
  var form = document.getElementById('regForm');
  if (!form) return;
  var done = document.getElementById('regDone');
  var invalid = document.getElementById('regInvalid');
  var fail = document.getElementById('regFail');
  var submit = form.querySelector('.reg-submit');
  var endpoint = form.getAttribute('data-endpoint');

  // El aviso de datos incompletos desaparece en cuanto el correo y el consentimiento son válidos.
  form.addEventListener('change', function () {
    var email = form.elements.email;
    if (email.value.trim() !== '' && email.checkValidity() && form.elements.consentimiento.checked) invalid.hidden = true;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    invalid.hidden = true;
    fail.hidden = true;
    var email = form.elements.email;
    var consent = form.elements.consentimiento;
    var emailOk = email.value.trim() !== '' && email.checkValidity();
    if (!emailOk || !consent.checked) {
      invalid.hidden = false;
      (emailOk ? consent : email).focus();
      return;
    }
    if (form.elements._gotcha.value) return; // un bot llenó la trampa
    form.elements.idioma.value = document.documentElement.lang || 'es';
    if (!/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint)) {
      fail.hidden = false; // el formulario todavía no está conectado
      return;
    }
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function () {
        document.getElementById('regDoneEmail').textContent = email.value.trim();
        form.hidden = true;
        done.hidden = false;
        done.focus();
      })
      .catch(function () { fail.hidden = false; })
      .then(function () { submit.disabled = false; form.removeAttribute('aria-busy'); });
  });
})();
