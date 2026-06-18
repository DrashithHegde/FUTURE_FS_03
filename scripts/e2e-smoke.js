(async () => {
  const API = 'http://127.0.0.1:5000/api';
  const log = (tag, msg) => console.log(new Date().toISOString(), tag, msg);

  const fetchJSON = async (path, opts = {}) => {
    const res = await fetch(API + path, opts);
    const text = await res.text();
    try { return { status: res.status, data: JSON.parse(text) }; } catch (e) { return { status: res.status, data: text }; }
  };

  try {
    log('STEP', 'Login as admin');
    let r = await fetchJSON('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'admin@crm.com', password: 'admin123' }) });
    if (r.status !== 200) throw new Error(`Login failed ${r.status} ${JSON.stringify(r.data)}`);
    const token = r.data.data.token;
    log('OK', 'Login success');

    const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };

    log('STEP', 'Fetch dashboard data (leads list)');
    r = await fetchJSON('/leads?page=1&limit=5', { headers });
    if (r.status !== 200) throw new Error('Fetch leads failed');
    log('OK', `Leads count=${r.data.data.length}`);

    log('STEP', 'Create a lead');
    r = await fetchJSON('/leads', { method: 'POST', headers, body: JSON.stringify({ name: 'Smoke Test Lead', email: `smoke+${Date.now()}@example.com`, phone: '555-1234', source: 'website_form', status: 'new' }) });
    if (![200, 201].includes(r.status)) throw new Error('Create lead failed ' + r.status);
    const lead = r.data.data;
    log('OK', `Lead created id=${lead.id}`);

    log('STEP', 'Update lead status to contacted');
    r = await fetchJSON(`/leads/${lead.id}/status`, { method: 'PUT', headers, body: JSON.stringify({ status: 'contacted' }) });
    if (r.status !== 200) throw new Error('Update status failed');
    log('OK', 'Status updated');

    log('STEP', 'Add note to lead');
    r = await fetchJSON(`/leads/${lead.id}/notes`, { method: 'POST', headers, body: JSON.stringify({ content: 'Smoke test note', createdBy: 'smoke-test' }) });
    if (r.status !== 200) throw new Error('Add note failed');
    log('OK', 'Note added');

    log('STEP', 'Delete lead');
    r = await fetchJSON(`/leads/${lead.id}`, { method: 'DELETE', headers });
    if (r.status !== 200) throw new Error('Delete lead failed');
    log('OK', 'Lead deleted');

    
    log('STEP', 'Create test user');
    const userPayload = { username: `smoke_user_${Date.now()}`, email: `smoke_user_${Date.now()}@example.com`, password: 'Test1234!', role: 'viewer' };
    r = await fetchJSON('/users', { method: 'POST', headers, body: JSON.stringify(userPayload) });
    if (![200, 201].includes(r.status)) throw new Error('Create user failed ' + r.status + ' ' + JSON.stringify(r.data));
    const newUser = r.data.data;
    log('OK', `User created id=${newUser.id}`);

    log('STEP', 'Update test user role');
    r = await fetchJSON(`/users/${newUser.id}`, { method: 'PUT', headers, body: JSON.stringify({ username: userPayload.username, email: userPayload.email, role: 'manager' }) });
    if (r.status !== 200) throw new Error('Update user failed');
    log('OK', 'User updated');

    log('STEP', 'Delete test user');
    r = await fetchJSON(`/users/${newUser.id}`, { method: 'DELETE', headers });
    if (r.status !== 200) throw new Error('Delete user failed');
    log('OK', 'User deleted');

    log('RESULT', 'Smoke tests completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('ERROR', err.message || err);
    process.exit(2);
  }
})();
