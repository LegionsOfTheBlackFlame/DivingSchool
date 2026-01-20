import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
 <nav>
  <div >
    <h1 className='brand-logo'>DiveSchool</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</nav>
  )
}
 