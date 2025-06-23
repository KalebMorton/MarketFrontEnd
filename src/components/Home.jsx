

export default function Home() {
  return (
    <div className='container'>
    <div className='duck-banner'>
        <div className='duck-wrapper duck1'>
          <img src="/src/assets/yellow-duck.png" className='duck-img' alt="duck" />
        </div>
        <div className='duck-wrapper duck2'>
          <img src="/src/assets/yellow-duck.png" className='duck-img' alt="duck" />
        </div>
        <div className='duck-wrapper duck3'>
          <img src="/src/assets/yellow-duck.png" className='duck-img' alt="duck" />
        </div>
      </div>
    <div className='home'>
      <h2>&lt; Dev Ducks / &gt;</h2>
      <p>Welcome to Dev Ducks!</p>
      <p>Your One-Stop Duck for Talking Out Code</p>
      </div>
      <div className='buttons'>
      <button className='register-btn'>Register</button>
      <button className='login-btn'>Login</button>
      </div>
    </div>
  );
}


//Display Name: Dev Ducks
//Links to register/login
//Animation of ducks floating along top of page?
