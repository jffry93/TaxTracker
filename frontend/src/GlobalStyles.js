import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box ;
}
:root {
  --vivid-pink: #E8998D;
  --misty-rose: #EED2CC;
  
  --error: #e7195a;
  --eggshell: #eae2ce;
  --light-text: white;
  --dark-text: black;
  --wave-color-3: #fa904a;// button

  ${(props) =>
		props.theme
			? `
      //light mode
      --off-white: #F1F1E6;
      --wave-text: #19271D;
      --wave-color-1: #00868C;//top outer, button, bottom inner //dark color with light text
      --wave-color-2:   #F1EDFF; // inner top and text ring
      --wave-color-3: #fa904a;// button
      --wave-color-4:#FFA17A ;//bottom outer
      --wave-color-5: #F1EDFF;//background //dark color with light text
      
      --settings-bg: #F1EDFF;
      --primary: #235C6F;
      --primary-accent: #007181;
      --secondary:#FFA17A;
      

  `
			: `  
      //dark mode
      --off-white: #b3b3b3;
      --wave-text: #dddddd;
      --wave-color-1: #404040;//top outer, button, bottom inner //dark color with light text
      --wave-color-2:   #181818; // inner top and text ring
      --wave-color-3: #37393A;// undefined
      --wave-color-4: #282828;//bottom outer
      --wave-color-5: #121212;//background //dark color with light text

      --settings-bg: #282828;
      --primary: #121212;
      --primary-accent: #404040;
      --secondary: #181818;
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
  padding: 12px 16px;
  font-size: 17px;
  font-weight: 500;
  border: none;
  /* background-color: #594334; */
  background-color: var(--primary-accent);
  color: #eeeeee;
  
  border-radius: 8px;
  cursor: pointer;
  &:hover{
    background-color: var(--wave-color-1);
  }
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
.MuiList-root{
  background-color:var(--wave-color-2);
  color: var(--wave-text);
  li:hover{
    background-color: rgba(150,150,150,0.1)
  }
}
`;

export default GlobalStyle;
