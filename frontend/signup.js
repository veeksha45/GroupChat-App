document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await res.json();

    if (res.status === 201) {
      alert('Successfully signed up!');
      window.location.href = 'login.html';
    } else if (res.status === 409) {
      alert('User already exists, Please Login');
    } else {
      alert(data.message || 'Signup failed');
    }
  } catch (err) {
    alert('Error connecting to server');
    console.error(err);
  }
});
