function Log() {
  return (
    <div className="Cover">
      <div className="Box_Details">
        <div className="shoes_image">
          <img src="src\assets\images\pic.png" className="shoes_image_style" />
        </div>
        <div className="form">
          <h2 className="title">Shoes Lovers</h2>
          <h3 className="welcome">Welcome Back!</h3>
          <span className="email_span">Email</span>
          <input type="email" name="email" className="email_input" />
          <span className="password_span">Password</span>
          <input type="password" name="password" className="password_input" />
          <button className="logIn">Log in</button>
          <h5 className="or">Or</h5>
          <h5 className="SignUp">Don’t have acount ? </h5>
          <button className="SignUp">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
export default Log;
