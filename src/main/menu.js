import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';
import { handleDrawRandomCard, handleShuffleDeck52 } from './ipc';

export default class MenuBuilder {
  mainWindow;

  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    const template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: () => {
              this.mainWindow.webContents.reload();
            },
          },
          // {
          //   label: "Toggle &Full Screen",
          //   accelerator: "F11",
          //   click: () => {
          //     this.mainWindow.setFullScreen(
          //       !this.mainWindow.isFullScreen()
          //     );
          //   },
          // },
          // {
          //   label: 'Toggle &Developer Tools',
          //   accelerator: 'Alt+Ctrl+I',
          //   click: () => {
          //     this.mainWindow.webContents.toggleDevTools();
          //   },
          // },
        ],
      },
      // {
      //   label: "Commands",
      //   submenu: [
      //     {
      //       label: "Draw Random Card",
      //       accelerator: "Enter",
      //       click: () => {
      //         console.log("Send card:random to renderer")
      //        handleDrawRandomCard()
      //       }
      //     },
      //     {
      //       label: "Random Card",
      //       accelerator: "Space",
      //       visible: false,
      //       acceleratorWorksWhenHidden: true,
      //       click: () => {
      //         console.log("Send card:random to renderer")
      //         handleDrawRandomCard()
      //       }
      //     },
      //     {
      //       label: "Shuffle",
      //       accelerator: "Escape",
      //       click: () => {
      //         console.log("Send card:shuffle to renderer")
      //         handleShuffleDeck52()
      //       }
      //     },
      //     {
      //       label: "CA",
      //       accelerator: "c+a",
      //       visible: false,
      //       acceleratorWorksWhenHidden: true,
      //       click: () => {
      //         console.log("Send card:ca to renderer")
      //       }
      //     },
      //   ],
      // }
      // {
      //   label: "Help",
      //   submenu: [
      //     {
      //       label: "Learn More",
      //       click() {
      //         shell.openExternal("https://electronjs.org");
      //       },
      //     },
      //     {
      //       label: "Documentation",
      //       click() {
      //         shell.openExternal(
      //           "https://github.com/electron/electron/tree/main/docs#readme"
      //         );
      //       },
      //     },
      //     {
      //       label: "Community Discussions",
      //       click() {
      //         shell.openExternal("https://www.electronjs.org/community");
      //       },
      //     },
      //     {
      //       label: "Search Issues",
      //       click() {
      //         shell.openExternal("https://github.com/electron/electron/issues");
      //       },
      //     },
      //   ],
      // },
    ];

    return templateDefault;
  }
}
