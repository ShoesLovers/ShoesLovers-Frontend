import * as React from "react";
import styled from "styled-components";

function LogIn() {
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
              <Div17>Your email</Div17>
              <Div18>Password</Div18>
              <Div19>Your password</Div19>
              <Div20>Log in</Div20>
              <Div21>Or</Div21>
              <Img9
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b2526eb8ee80ddf0a4458c7a6589710ef6c31e0ec1453802c90a8949fb2df2e?"
              />
              <Div22>
                <span>Don’t have acount ? </span>
                <span>Sign Up</span>
              </Div22>
            </Div11>
          </Column6>
        </Div3>
      </Div2>
    </Div>
  );
}

const Div = styled.div`
  disply: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  display: flex;
  min-height: 1024px;
  justify-content: center;
  padding: 50px 60px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Div2 = styled.div`
  position: relative;
  background-color: #f5f5f5;
  margin-top: 82px;
  width: 1213px;
  max-width: 100%;
  padding: 12px 12px 12px 12px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div3 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 60%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div4 = styled.div`
  position: relative;
  display: flex;
  margin-top: 13px;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 2.08;
  object-fit: auto;
  object-position: center;
  width: 100%;
  fill: url(<path-to-image>), lightgray 50% / cover no-repeat;
  backdrop-filter: blur(10px);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div5 = styled.div`
  margin-top: 9px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div6 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 32%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div7 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  @media (max-width: 991px) {
    margin-top: 11px;
  }
`;

const Img3 = styled.img`
  aspect-ratio: 0.95;
  object-fit: auto;
  object-position: center;
  width: 217px;
`;

const Img4 = styled.img`
  aspect-ratio: 1.32;
  object-fit: auto;
  object-position: center;
  width: 217px;
  margin-top: 7px;
`;

const Column3 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 68%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div8 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 11px;
  }
`;

const Img5 = styled.img`
  aspect-ratio: 1.69;
  object-fit: auto;
  object-position: center;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div9 = styled.div`
  margin-top: 8px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div10 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column4 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 64%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Img6 = styled.img`
  aspect-ratio: 2.38;
  object-fit: auto;
  object-position: center;
  width: 100%;
  flex-grow: 1;
  @media (max-width: 991px) {
    margin-top: 11px;
  }
`;

const Column5 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 36%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Img7 = styled.img`
  aspect-ratio: 1.33;
  object-fit: auto;
  object-position: center;
  width: 163px;
  max-width: 100%;
  flex-grow: 1;
  @media (max-width: 991px) {
    margin-top: 11px;
  }
`;

const Column6 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 40%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div11 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div12 = styled.div`
  padding: 0 1px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div13 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column7 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 70%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div14 = styled.div`
  color: #230f0f;
  text-align: center;
  margin-top: 91px;
  font: 700 40px Roboto, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Column8 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 30%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Img8 = styled.img`
  aspect-ratio: 0.81;
  object-fit: auto;
  object-position: center;
  width: 124px;
  max-width: 100%;
  flex-grow: 1;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div15 = styled.div`
  color: #0f1423;
  margin-top: 30px;
  font: 700 24px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div16 = styled.div`
  color: #0f1423;
  margin-top: 54px;
  font: 700 14px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div17 = styled.div`
  align-items: start;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.02);
  background-color: #fff;
  margin-top: 11px;
  justify-content: center;
  color: #d4d4d4;
  padding: 14px 60px 14px 16px;
  font: 400 16px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Div18 = styled.div`
  color: #0f1423;
  margin-top: 20px;
  font: 700 14px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div19 = styled.div`
  align-items: start;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.02);
  background-color: #fff;
  margin-top: 11px;
  justify-content: center;
  color: #d4d4d4;
  padding: 14px 60px 14px 16px;
  font: 400 16px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Div20 = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #0e0f10;
  margin-top: 48px;
  color: #fff;
  padding: 15px 60px;
  font: 700 14px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const Div21 = styled.div`
  color: #646464;
  align-self: center;
  margin-top: 24px;
  font: 400 14px Inter, sans-serif;
`;

const Img9 = styled.img`
  aspect-ratio: 2.63;
  object-fit: auto;
  object-position: center;
  width: 104px;
  align-self: center;
  margin-top: 19px;
  max-width: 100%;
`;

const Div22 = styled.div`
  color: #0f1423;
  text-align: right;
  align-self: center;
  margin-top: 27px;
  white-space: nowrap;
  font: 400 12px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
export default LogIn;
