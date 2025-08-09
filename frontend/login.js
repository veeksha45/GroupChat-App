document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
      alert('Login successful!');
      // Save user token/id for authenticated requests
      localStorage.setItem('token', data.token);
      window.location.href = 'expense.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Error connecting to server');
  }
});
