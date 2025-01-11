import { net } from 'electron';
import { store, actions } from '../store';
import pretty from '../pretty-logger';

export const handleServerChange = (args) => {
  store.dispatch(actions.shoe.shoeServerUpdate({ ...args }));
};

export const handleShuffleDeck52 = () => {
  store.dispatch(actions.shoe.shuffleDeck52());
};

export const handleCardDrawn = (suit, rank) => {
  const state = store.getState();
  store.dispatch(actions.shoe.drawnCard({ suit, rank }));

  let body = JSON.stringify({ card: `${suit}${rank}` });
  const request = net.request({
    method: 'POST',
    protocol: 'http:',
    hostname: state.server.hostname,
    port: state.server.port,
    path: state.server.path,
    redirect: 'follow',
  });
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
  });
  request.on('finish', () => {
    // console.log('Request is Finished')
    store.dispatch(actions.shoe.cardDeliverySuccess());
  });
  request.on('abort', () => {
    console.log('Request is Aborted');
  });
  request.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`);
    store.dispatch(actions.shoe.cardDeliveryError());
  });
  request.on('close', (error) => {
    // console.log('Last Transaction has occurred')
  });
  request.setHeader('Content-Type', 'application/json');
  request.write(body, 'utf-8');
  request.end();
};

export const handleDrawRandomCard = () => {
  const state = store.getState();
  if (state.deck52.length > 0) {
    const item = state.deck52[Math.floor(Math.random() * state.deck52.length)];
    const [suit, rank] = item;

    handleCardDrawn(suit, rank);
  }
};

export const handleAttendantCardInsert = (attendant) => {
  store.dispatch(actions.attendant.AttendantCardInsert({ ...attendant }));
};

export const handleAttendantCardRemove = () => {};

export const handleMifareCardInsert = (uid) => {
  pretty.debug(`handleMifareCardInsert Begin:${uid} `);
  const { config } = store.getState();
  if (config.players?.findIndex((card) => card.uid == uid) != -1) {
    const findIndex = config.players?.findIndex((card) => card.uid == uid);
    const player = config.players[findIndex];

    pretty.debug(
      `handleMifareCardInsert:Player Card ${JSON.stringify(player)}`
    );
  }
  if (config.attendants?.findIndex((card) => card.uid == uid) != -1) {
    const findIndex = config.attendants?.findIndex((card) => card.uid == uid);
    const attendant = config.attendants[findIndex];
    pretty.debug(
      `handleMifareCardInsert:Attendant Card ${JSON.stringify(attendant)}`
    );
    handleAttendantCardInsert(attendant);
  }
  if (config.managers?.findIndex((card) => card.uid == uid) != -1) {
    const findIndex = config.managers?.findIndex((card) => card.uid == uid);
    console.log(`Card Match - Manager`);
  }
  if (config.admins?.findIndex((card) => card.uid == uid) != -1) {
    const findIndex = config.admins?.findIndex((card) => card.uid == uid);

    console.log(`Card Match - Admin`);
  }
  if (config.developers?.findIndex((card) => card.uid == uid) != -1) {
    const findIndex = config.developers?.findIndex((card) => card.uid == uid);

    console.log(`Card Match - Developer`);
  }
};
