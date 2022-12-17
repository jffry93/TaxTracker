import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box ;
}
:root {
  --primary: #6C9A8B;
  --secondary: #A1683A;
  --vivid-pink: #E8998D;
  --misty-rose: #EED2CC;
  --off-white: #1e1e1e;
  --error: #e7195a;
  --eggshell: #eae2ce;
  --light-text: white;
  --dark-text: black;

  ${(props) =>
		props.theme
			? `
      //dark mode

      --wave-primary: #C7D3dd;
      --wave-text: #37393a;
      --wave-color-1: #AAAAAA;//top outer, button, bottom inner //dark color with light text
      --wave-color-2:   #BBBBBB; // inner top and text ring
      --wave-color-6:   #FFFFFF; // inner top and text ring
      --wave-color-3: #eeeeee;// button
      --wave-color-4: #DDDDDD;//bottom outer
      --wave-color-5: #CCCCCC;//background //dark color with light text
  `
			: `  
      //light mode

      --wave-primary: #C7D3dd;
      --wave-text: #eeeeee;
      --wave-color-1: #433633;//top outer, button, bottom inner //dark color with light text
      --wave-color-2:   #F7F0F5; // inner top and text ring
      --wave-color-3: #DECBB7;// undefined
      --wave-color-4: #8F857D;//bottom outer
      --wave-color-5: #5C5552;//background //dark color with light text
      --wave-color-6:   #FFFFFF; // inner top and text ring
  `}


}

h1{
  /* font-size: clamp(3.125rem, 4vw, 4rem); */
  line-height: 1.07143;
  letter-spacing: -.005em;
}
h2{
  /* font-size: clamp(32px, 4vw, 48px); */
  line-height: 1.07143;
  letter-spacing: -.005em;
}
h3{
  /* font-size: clamp(21px, 4vw, 28px); */
  line-height: 1.14286;
  letter-spacing: .007em;
}
h4{
  /* font-size: clamp(17px, 3vw, 20px); */
  line-height: 1.14286;
  letter-spacing: .007em;
}
h5{
  /* font-size: clamp(.9rem, .5vw, 1rem); */
  font-weight: 300;
  letter-spacing: 0px;
  line-height: 1.381;
}
p{
  /* font-size: clamp(16px, 1.2vw, 17px); */
  font-weight: lighter;
  line-height: clamp(25.000032424926758px, .5vw, 001001358032227px);
  letter-spacing:  clamp(.011em, .5vw, .022em);
}

body{
  font-family: 'Poppins';
  /* background-color:var(--primary) ; */
  color: var(--wave-text);
}
a{
  text-decoration: none ;
}

button{
  padding: 8px 12px;
  font-size: 17px;
  font-weight: 500;
  border: none;
  /* background-color: #594334; */
  background-color: var(--wave-color-3);
  color: var(--wave-color-1);

  border-radius: 8px;
}
input {
  border-radius: 4px;
  padding: 6px 4px;
  margin: 0 0 12px 0;
  outline: none;
}
.container{
  max-width: 1200px ;
  margin: 0 auto;
  padding: 0px 32px ;
}
`;

export default GlobalStyle;
