import { injectGlobal } from '@emotion/css';

import RobotoRegularW2 from './assets/fonts/Roboto-Regular.woff2';
import InterUINormal from './assets/fonts/Inter-UI-Regular.woff2';

injectGlobal`
    * {
        
        box-sizing: border-box;
        list-style: none;
        -webkit-tap-highlight-color:transparent;
    }
    
    @font-face {
        font-family: Roboto;
        src: url(${RobotoRegularW2})  format('woff2');
    }

    @font-face {
        font-family: 'Inter UI';
        font-style: normal;
        font-weight: 400;
        src: url(${InterUINormal}) format('woff2');
}

    html,body,#root,#app{
      margin: 0 0;
      width:100%;
      height:100%;
      font-family: sans-serif;
      letter-spacing: -.09px;
      touch-action:manipulation;
    //   background-color:var(--chakra-colors-yellow-100, #ff0);
      color: '#23765c';

      &.desktop-body{
          position:relative;
          display:flex;
          align-items:center;
          justify-content:center;
      }
      
      &.desktop-app{
          width:1152px;
          height:648px;
          flex:none;
          flex-shrink:0;
          transform-origin:center;
        }
    }
    
    #root{
        background:transparent;

    }
    
    #app{
        overflow:hidden;
    }
     
`;
