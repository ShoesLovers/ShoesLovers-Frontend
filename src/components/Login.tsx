import { useEffect, useState } from 'react';
import {
  Column,
  Column2,
  Column3,
  Column4,
  Column5,
  Column6,
  Column7,
  Column8,
  Div,
  Div2,
  Div3,
  Div4,
  Div5,
  Div6,
  Div7,
  Div8,
  Div9,
  Div10,
  Div11,
  Div12,
  Div13,
  Div14,
  Div15,
  Div16,
  Div17,
  Div18,
  Div19,
  Div20,
  Div21,
  Div22,
  Img,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
} from '../styles/LoginStyle';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }

      console.log('Login successful');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Div>
      <Img loading="lazy" srcSet="src\assets\images\chess.jpg" />
      <Div2>
        <Div3>
          <Column>
            <Div4>
              <Img2
                loading="lazy"
                srcSet="src\assets\images\Login_image_Shoes.png"
              />
              <Div5>
                <Div6>
                  <Column2>
                    <Div7>
                      <Img3
                        loading="lazy"
                        srcSet="src\assets\images\Login_image_SB.png"
                      />
                      <Img4
                        loading="lazy"
                        srcSet="src\assets\images\Login_image_AM270.png"
                      />
                    </Div7>
                  </Column2>
                  <Column3>
                    <Div8>
                      <Img5
                        loading="lazy"
                        srcSet="src\assets\images\Login_image_Neymar.png"
                      />
                      <Div9>
                        <Div10>
                          <Column4>
                            <Img6
                              loading="lazy"
                              srcSet="src\assets\images\Login_image_AF.png"
                            />
                          </Column4>
                          <Column5>
                            <Img7
                              loading="lazy"
                              srcSet="src\assets\images\Login_image_AIR.png"
                            />
                          </Column5>
                        </Div10>
                      </Div9>
                    </Div8>
                  </Column3>
                </Div6>
              </Div5>
            </Div4>
          </Column>
          <Column6>
            <Div11>
              <Div12>
                <Div13>
                  <Column7>
                    <Div14>
                      <span>Shoes Lovers</span>
                    </Div14>
                  </Column7>
                  <Column8>
                    <Img8
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/19de55c5c70139b91fb61a984e684b7fea7513d162fe0d6ac3fca4372e0a4ab6?"
                    />
                  </Column8>
                </Div13>
              </Div12>
              <Div15>Welcome Back!</Div15>
              <Div16>Email</Div16>
              <Div17
                type="text"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <Div18>Password</Div18>
              <Div19
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />

              <Div20 onClick={handleLogin}>Log in</Div20>
              <Div21>Or</Div21>
              <Img9
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b2526eb8ee80ddf0a4458c7a6589710ef6c31e0ec1453802c90a8949fb2df2e?"
              />
              <Div22>
                <span>Don't have an account? </span>
                <span>Sign Up</span>
              </Div22>
            </Div11>
          </Column6>
        </Div3>
      </Div2>
    </Div>
  );
}

export default Login;
