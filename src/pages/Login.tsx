
// Replace the Input components with error prop to use className for error styling instead
<Input
  id="username"
  type="text"
  placeholder="Username or Email"
  className={`${errorUsername ? 'border-red-500' : ''}`}
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<Input
  id="password"
  type={showPassword ? 'text' : 'password'}
  placeholder="Password"
  className={`${errorPassword ? 'border-red-500' : ''}`}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
